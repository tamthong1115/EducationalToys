import { useDispatch, useSelector } from 'react-redux'
import {
    removeCart,
    incrementQuantity,
    decrementQuantity,
} from '../redux/cartSlice'
import { Link } from 'react-router-dom'

function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart)

    const totalPrice = cart.reduce((total, product) => {
        return total + product.price * product.quantity
    }, 0)

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

            {cart.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    Giỏ hàng hiện tại đang rỗng
                </p>
            ) : (
                <div className="flex flex-col gap-6">
                    {cart.map((product) => (
                        <div
                            key={product.id}
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
                                                dispatch(
                                                    decrementQuantity(
                                                        product.id
                                                    )
                                                )
                                            } else {
                                                alert(
                                                    'Số lượng không thể dưới 1'
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
                                            dispatch(
                                                incrementQuantity(product.id)
                                            )
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
                                        dispatch(removeCart(product.id))
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
        </div>
    )
}

export default Cart
