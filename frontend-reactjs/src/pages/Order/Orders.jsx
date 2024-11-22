import {useQuery} from '@tanstack/react-query';
import {getOrderByUser} from '../../API/OrderAPI.js';
import LoadingComponent from '../../components/Loading/LoadingComponent.jsx';

const Orders = () => {
    const {data: orders, isLoading, error} = useQuery({
        queryKey: ['orders'],
        queryFn: getOrderByUser,
    });

    if (isLoading) {
        return <LoadingComponent/>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">My Orders</h1>
            {orders.length === 0 ? (
                <div className="text-center text-gray-600 text-lg">
                    You have no orders yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white shadow-lg rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                                        order.status === 'PAID'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}
                                >
                                {order.status}
                            </span>
                            </div>
                            {/*<div className="text-sm text-gray-600 mb-2">*/}
                            {/*    <span className="font-semibold">User:</span> {order.userName}*/}
                            {/*</div>*/}
                            <div className="text-sm text-gray-600 mb-2">
                                <span className="font-semibold">Total Price:</span> ${order.totalPrice.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                                <span className="font-semibold">Order Type:</span> {order.orderType}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                                <span className="font-semibold">Created At:</span>{' '}
                                {new Date(order.createdAt).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600 mb-4">
                                <span className="font-semibold">Updated At:</span>{' '}
                                {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'N/A'}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Order Items:</h3>
                                <div className="space-y-4">
                                    {order.orderItems.map(item => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                                        >
                                            <img
                                                src={item.imageUrls[0]}
                                                alt={item.productName}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex flex-col space-y-1">
                                                <div className="text-gray-800 font-semibold">{item.productName}</div>
                                                <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                                                <div className="text-sm text-gray-600">Price:
                                                    ${item.price.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default Orders;