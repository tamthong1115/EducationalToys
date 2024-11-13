import axiosInstance from './AxiosInstance';


export const validateToken =  async (token) => {
        try {
            const response = await axiosInstance.post('/user/validate-token', { token });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Token validation failed');
        }
    }





