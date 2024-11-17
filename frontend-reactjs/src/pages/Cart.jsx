// import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    getCartItems,
    increaseCartItemQuantity,
    decrementCartQuantity,
    removeCartItem,
} from '../API/CartAPI.js'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'
import { Modal, Button } from 'antd'
import Login from '../components/Header/Login.jsx'

function Cart() {
    const { isAuthenticated, authLoading } = useAuth()
    const [cart, setCart] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoginVisible, setIsLoginVisible] = useState(false)
    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: getCartItems,
    })

    useEffect(() => {
        if (!isAuthenticated && !authLoading) {
            setIsModalVisible(true)
        } else if (data) {
            setCart(data)
            // toast.success('Cart items fetched successfully')
        }
    }, [data, isAuthenticated, authLoading])

    const increaseItemQuantityMutation = useMutation({
        mutationFn: ({ cartItemId, quantity }) =>
            increaseCartItemQuantity(cartItemId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries('cart')
            toast.success('Cart item quantity updated successfully')
        },
        onError: (error) => {
            toast.error(
                error.message || 'Failed to increase cart item quantity'
            )
        },
    })

    const decrementItemQuantityMutation = useMutation({
        mutationFn: ({ cartItemId, quantity }) =>
            decrementCartQuantity(cartItemId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries('cart')
            toast.success('Cart item quantity updated successfully')
        },
        onError: (error) => {
            toast.error(
                error.message || 'Failed to decrease cart item quantity'
            )
        },
    })

    const removeItemMutation = useMutation({
        mutationFn: removeCartItem,
        onSuccess: () => {
            toast.success('Cart item removed successfully')
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to remove cart item')
        },
    })

    const handleAddClick = (cartItemId, quantity) => {
        increaseItemQuantityMutation.mutate({ cartItemId, quantity })
    }

    const handleDecreaseClick = (cartItemId, quantity) => {
        decrementItemQuantityMutation.mutate({ cartItemId, quantity })
    }

    const handleRemoveClick = (cartItemId) => {
        removeItemMutation.mutate(cartItemId)
    }

    const totalPrice = cart.reduce((total, product) => {
        return total + product.price * product.quantity
    }, 0)

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        toast.error(error.message || 'Failed to fetch cart items')
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-center relative mb-6">
                <Link
                    to="/"
                    className="absolute left-0 text-blue-600 hover:underline text-lg font-semibold"
                >
                    Home
                </Link>
                <p className="text-3xl font-semibold">Giỏ hàng của bạn</p>
            </div>

            {!cart.length ? (
                <p className="text-center text-gray-500 text-lg">
                    Giỏ hàng hiện tại đang rỗng
                </p>
            ) : (
                <div className="flex flex-col gap-6">
                    {cart.map((product) => (
                        <div
                            key={product.toyId}
                            className="border p-4 rounded-lg flex items-center justify-between shadow-sm"
                        >
                            <div className="flex items-center gap-6">
                                <img
                                    src={product.imageUrls[0]}
                                    alt={product.name}
                                    className="w-24 h-24 object-cover rounded-md shadow-md"
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold text-lg">
                                        {product.name}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        £{product.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <p className="text-sm font-semibold ">
                                    Quantity
                                </p>
                                <div className="flex items-center gap-2 border rounded-lg">
                                    <button
                                        onClick={() => {
                                            if (product.quantity > 1) {
                                                handleDecreaseClick(
                                                    product.id,
                                                    1
                                                )
                                            } else {
                                                toast.error(
                                                    'Quantity cannot be less than 1'
                                                )
                                            }
                                        }}
                                        className="text-lg text-gray-700 hover:text-gray-500 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-semibold">
                                        {product.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleAddClick(product.id, 1)
                                        }
                                        className="text-lg text-gray-700 hover:text-gray-500 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <p className="text-black-600 text-lg font-bold">
                                    £
                                    {(product.price * product.quantity).toFixed(
                                        2
                                    )}
                                </p>
                                <button
                                    onClick={() =>
                                        handleRemoveClick(product.id)
                                    }
                                    className="text-black-600 hover:text-red-800 transition-colors"
                                >
                                    <span className="text-xl">x</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mt-6 border-t pt-4">
                        <p className="text-xl font-semibold">Tổng tiền:</p>
                        <p className="text-2xl font-bold text-green-600">
                            £{totalPrice.toFixed(2)}
                        </p>
                    </div>

                    {/* Checkout */}
                    <div className="flex justify-center mt-6">
                        <button className="bg-green-600 text-white px-8 py-3 rounded-md flex items-center gap-3 font-semibold hover:bg-green-700 transition-colors">
                            <span>Checkout Security</span>
                        </button>
                    </div>
                </div>
            )}

            <Modal
                title="Sign In Required"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {isLoginVisible ? (
                    <Login handleLogin={() => setIsModalVisible(false)} />
                ) : (
                    <Button
                        type="primary"
                        onClick={() => setIsLoginVisible(true)}
                    >
                        Sign In
                    </Button>
                )}
            </Modal>
        </div>
    )
}

export default Cart
