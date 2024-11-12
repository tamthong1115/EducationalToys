import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../API/UserAPI.js';
import { logout } from '../API/AuthAPI.js';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {toast} from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();


    const token = localStorage.getItem('token');
    const { isError, data, isLoading } = useQuery({
        queryKey: ['validateToken'],
        queryFn: () => validateToken(token),
        retry: false,
        enabled: !!token,
    });

    useEffect(() => {
        if (!isLoading) {
            if (data && !isError) {
                setUser(data);
                setIsAuthenticated(true);
            } else if (isError) {
                setUser(null);
                setIsAuthenticated(false);
                navigate('/');
            }
            setLoading(false);
        }
    }, [data, isError, isLoading, navigate]);

    // console.log(`isAuthenticated: ${isAuthenticated}, data: ${data}, loading: ${loading}, isError: ${isError}`);

    const logoutUser = async () => {
        try {
            await logout();
            setUser(null);
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
            toast.success('Logout successfully');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated : isAuthenticated && !loading && !isError,
            logout: logoutUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};