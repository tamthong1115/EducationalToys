import axiosInstance from "./AxiosInstance.js";


export const getToyById = async (id) => {
    try {
        const response = await axiosInstance.get(`/toy`, {
            params: { id }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch toy by ID');
    }
};

export const getAllToys = async () => {
    try {
        const response = await axiosInstance.get(`/toy/all`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch all toys');
    }
};