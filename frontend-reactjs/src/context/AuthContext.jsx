import {createContext, useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
import {getRoles, validateToken} from '../API/UserAPI.js'
import {logout} from '../API/AuthAPI.js'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'
import {loadStripe} from '@stripe/stripe-js'

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const queryClient = useQueryClient()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const {isError, data, isLoading, isSuccess} = useQuery({
        queryKey: ['validateToken'],
        queryFn: () => validateToken(token),
        retry: false,
        enabled: !!token,
        refetchOnWindowFocus: false,
    })

    const {data: roles, isLoading: roleLoading} = useQuery({
        queryKey: ['roles'],
        queryFn: getRoles
    })


    useEffect(() => {
        if (!isLoading && roles) {
            if (data && !isError) {
                setUser(data)
                setIsAuthenticated(true)
            } else if (isError || !data || !isSuccess) {
                setUser(null)
                setIsAuthenticated(false)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
            setLoading(false)
        }
    }, [data, isError, isLoading, navigate, roles])

    // console.log(`isAuthenticated: ${isAuthenticated}, data: ${data}, loading: ${loading}, isError: ${isError}`);

    const logoutUser = async () => {
        try {
            await logout()
            setUser(null)
            localStorage.removeItem('token')
            setIsAuthenticated(false)
            await queryClient.invalidateQueries({queryKey: ['validateToken']})
            toast.success('Logout successfully')
            navigate('/')
        } catch (error) {
            toast.error(error.message || 'Logout failed')
        }
    }

    const isAdmin = () => {
        if (roles && !roleLoading) {
            return roles.includes('ADMIN');
        }
        return false;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                authLoading: loading || isLoading || roleLoading,
                isAuthenticated: isAuthenticated && !loading && !isError,
                stripePromise,
                logout: logoutUser,
                isAdmin
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
