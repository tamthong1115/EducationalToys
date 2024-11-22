import axiosInstance from './AxiosInstance'


export const getOrderByUser = async () => {
    try {
        const response = await axiosInstance.get('user/order/get-orders-by-user')

        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Failed to fetch order by user'
        )
    }
}