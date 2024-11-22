import PropTypes from 'prop-types';

const OrderModal = ({isOpen, onClose, order}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                <div className="space-y-4">
                    <div>
                        <strong>ID:</strong> {order.id}
                    </div>
                    <div>
                        <strong>User Name:</strong> {order.userName}
                    </div>
                    <div>
                        <strong>Status:</strong> {order.status}
                    </div>
                    <div>
                        <strong>Total Price:</strong> {order.totalPrice}
                    </div>
                    <div>
                        <strong>Order Type:</strong> {order.orderType}
                    </div>
                    <div>
                        <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
                    </div>
                    <div>
                        <strong>Order Items:</strong>
                        <ul className="space-y-2">
                            {order.orderItems.map((item) => (
                                <li key={item.id} className="border p-2 rounded-md">
                                    <div>Quantity: {item.quantity}</div>
                                    <div>Price: {item.price}</div>
                                    <div className="flex space-x-2 mt-2">
                                        {item.imageUrls.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`Toy ${item.toyId} Image ${index + 1}`}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

OrderModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
};

export default OrderModal;