import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const axiosInstance = axios.create({
    baseURL: BASE_URL + '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
