import axiosInstance from './AxiosInstance';

export const register = async (registerRequestDTO) => {
    try {
        const response = await axiosInstance.post('/auth/register', registerRequestDTO);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
}

export const login = async (loginRequestDTO) => {
    try {
        const response = await axiosInstance.post('/auth/login', loginRequestDTO);
        await localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
}


export const logout = async () => {
    try {
        await axiosInstance.post('/auth/logout');
        localStorage.removeItem('token');
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Logout failed');
    }
}

