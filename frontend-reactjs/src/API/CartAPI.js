import axiosInstance from './AxiosInstance.js'

export const createCartItem = async (toyId, quantity) => {
    try {
        const response = await axiosInstance.post('/user/cart/add', {
            toyId,
            quantity,
        })
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Failed to create cart item'
        )
    }
}

export const getCartItems = async () => {
    try {
        const response = await axiosInstance.get('/user/cart/all')
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Failed to fetch cart items'
        )
    }
}

export const increaseCartItemQuantity = async (cartItemId, quantity) => {
    try {
        // params
        const response = await axiosInstance.patch(
            `/user/cart/increase`,
            null,
            {
                params: {
                    cartItemId,
                    quantity,
                },
            }
        )
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                'Failed to increase cart item quantity'
        )
    }
}

export const decrementCartQuantity = async (cartItemId, quantity) => {
    try {
        const response = await axiosInstance.patch(
            `/user/cart/decrease`,
            null,
            {
                params: {
                    cartItemId,
                    quantity,
                },
            }
        )
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                'Failed to decrease cart item quantity'
        )
    }
}

export const removeCartItem = async (cartItemId) => {
    try {
        const response = await axiosInstance.delete(
            `/user/cart/remove/${cartItemId}`
        )
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 'Failed to remove cart item'
        )
    }
}
