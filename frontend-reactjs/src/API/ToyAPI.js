import axiosInstance from './AxiosInstance.js'

export const getToyById = async (id) => {
    try {
        const response = await axiosInstance.get(`/toy`, {
            params: { id },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch toy by ID')
        }
        
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Failed to fetch toy by ID'
        )
    }
}

export const getAllToys = async () => {
    try {
        const response = await axiosInstance.get(`/toy/all`)

        if (!response.ok) {
            throw new Error('Failed to fetch all toys')
        }

        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Failed to fetch all toys'
        )
    }
}

export const searchToys = async (q, page) => {
    try {
        const response = await axiosInstance.get(`/toy/search`, {
            params: { q, page },
        })

        if (!response.ok) {
            throw new Error('Failed to search toys')
        }

        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Failed to search toys'
        )
    }
}
