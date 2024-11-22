import axiosInstance from './AxiosInstance'

export const register = async (registerRequestDTO) => {
    try {
        const response = await axiosInstance.post(
            '/auth/register',
            registerRequestDTO
        )

        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed')
    }
}

export const login = async (loginRequestDTO) => {
    try {
        const response = await axiosInstance.post(
            '/auth/login',
            loginRequestDTO
        )

        if (response.status >= 200 && response.status < 300) {
            await localStorage.setItem('token', response.data.token)
            return response.data
        } else {
            throw new Error('Login failed')
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed')
    }
}

export const logout = async () => {
    try {
        await axiosInstance.post('/auth/logout')
        localStorage.removeItem('token')
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Logout failed')
    }
}

export const confirmToken = async (token) => {
    try {
        // Remove the double quotes from the token
        const response = await axiosInstance.post('/auth/confirm-token', {
            token,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Token confirmation failed');
    }
};