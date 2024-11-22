import axiosInstance from './AxiosInstance'

export const validateToken = async (token) => {
    try {
        const response = await axiosInstance.post('/user/validate-token', {
            token,
        })
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Token validation failed'
        )
    }
}

export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/user/me')
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Failed to fetch user profile'
        )
    }
}


export const getRoles = async () => {
    try {
        const response = await axiosInstance.get('/user/roles')
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Failed to fetch roles'
        )
    }
}