// import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {
    getCartItems,
    increaseCartItemQuantity,
    decrementCartQuantity,
    removeCartItem,
} from '../API/CartAPI.js'
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {toast} from 'react-hot-toast'
import {useAuth} from '../context/AuthContext.jsx'
import {Modal, Button} from 'antd'
import Login from '../components/Header/Login.jsx'
import LoadingComponent from '../components/Loading/LoadingComponent.jsx'
import {useNavigate} from 'react-router-dom';
import {getUserProfile} from "../API/UserAPI.js";

function Cart() {
    const {isAuthenticated, authLoading} = useAuth()
    const [cart, setCart] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoginVisible, setIsLoginVisible] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const {
        data: cartData,
        isSuccess,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['cart'],
        queryFn: getCartItems,
        enabled: isAuthenticated
    })

    const {data: user} = useQuery({
        queryKey: ['user'],
        queryFn: getUserProfile,
    });


    // console.log(`cart`, cart, `cartData`, cartData)

    useEffect(() => {
        if (!isAuthenticated && !authLoading) {
            setIsModalVisible(true)
        } else if (isSuccess) {
            setCart(cartData.sort((a, b) => a.id - b.id));
        }
    }, [isSuccess, cartData, isAuthenticated, authLoading])

    const increaseItemQuantityMutation = useMutation({
        mutationFn: ({cartItemId, quantity}) =>
            increaseCartItemQuantity(cartItemId, quantity),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['cart']})
            // toast.success('Cart item quantity updated successfully')
        }, onSettled: () => {
            if (cartData) {
                setCart(cartData.sort((a, b) => a.id - b.id))
            }
        },
        onError: (error) => {
            toast.error(
                error.message || 'Failed to increase cart item quantity'
            )
        },
    })

    const decrementItemQuantityMutation = useMutation({
        mutationFn: ({cartItemId, quantity}) =>
            decrementCartQuantity(cartItemId, quantity),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['cart']})
            // toast.success('Cart item quantity updated successfully')
        }, onSettled: () => {
            if (cartData) {
                setCart(cartData.sort((a, b) => a.id - b.id))
            }
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
            queryClient.invalidateQueries({queryKey: ['cart']})
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to remove cart item')
        },
    })

    const handleAddClick = (cartItemId, quantity) => {
        increaseItemQuantityMutation.mutate({cartItemId, quantity})
    }

    const handleDecreaseClick = (cartItemId, quantity) => {
        decrementItemQuantityMutation.mutate({cartItemId, quantity})
    }

    const handleRemoveClick = (cartItemId) => {
        removeItemMutation.mutate(cartItemId)
    }

    const selectedTotalPrice = cart
        .filter(product => selectedItems.includes(product.id))
        .reduce((total, product) => total + product.price * product.quantity, 0);

    const handleCheckboxChange = (cartItemId) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(cartItemId)
                ? prevSelectedItems.filter((id) => id !== cartItemId)
                : [...prevSelectedItems, cartItemId]
        )
    }

    const handleCheckout = () => {
        if (!user.phone || !user.address) {
            toast.error('Please update your profile with a valid phone number and address before proceeding to checkout.');
            return;
        }

        if (selectedItems.length) {
            navigate('/checkout', {state: {cartItemIds: selectedItems}});
        } else {
            toast.error('Please select at least one item to checkout');
        }
    };
    if (isLoading || authLoading || !cart) {
        return LoadingComponent()
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
                <p className="text-3xl font-semibold">Your Cart</p>
            </div>

            {!cart.length ? (
                <p className="text-center text-gray-500 text-lg">
                    Your cart is empty
                </p>
            ) : (
                <div className="flex flex-col gap-6">
                    {cart.map((product) => (
                        <div
                            key={product.toyId}
                            className="border p-4 rounded-lg flex items-center justify-between shadow-sm"
                        >
                            <div className="flex items-center gap-6 w-[40%] truncate">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(product.id)}
                                    onChange={() =>
                                        handleCheckboxChange(product.id)
                                    }
                                />
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

                            <div className="flex flex-col items-center gap-4 w-[20%]">
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
                                    <span className="text-lg font-semibold text-gray-700">
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

                            <div className="flex items-center justify-end gap-6 w-[20%]">
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
                        <p className="text-xl font-semibold">Total Price:</p>
                        <p className="text-2xl font-bold text-green-600">
                            £{selectedTotalPrice.toFixed(2) || 0}
                        </p>
                    </div>

                    {/* Checkout */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleCheckout}
                            className="bg-green-600 text-white px-8 py-3 rounded-md flex items-center gap-3 font-semibold hover:bg-green-700 transition-colors"
                        >
                            <span>Proceed to Checkout</span>
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
                    <Login handleLogin={() => setIsModalVisible(false)}/>
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
