// src/components/Manage/ManageOrders.jsx
import {Bell, Search} from 'lucide-react';
import {useState} from 'react';
import ReactPaginate from 'react-paginate';
import HeaderDashBoard from '../Header/HeaderDashBoard';
import SideBarAdmin from '../SideBar/SideBarAdmin';
import {useQuery} from '@tanstack/react-query';
import {getAllOrders} from '../../API/OrderAPI.js';
import OrderModal from '../Modal/OrderModal';

const ManageOrders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const itemsPerPage = 10;

    const {data: orders = [], isLoading, isError, error} = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrders,
    });

    const handleSearch = () => {
        setCurrentPage(0);
    };

    const filteredOrders = orders.filter((order) =>
        order.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
    const displayedOrders = filteredOrders.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <div className="flex h-screen bg-gray-100">
            <SideBarAdmin/>
            <div className="flex-1 overflow-y-auto">
                <HeaderDashBoard Search={Search} Bell={Bell}/>
                <main className="max-w-7xl mx-auto py-6 px-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Manage Orders
                        </h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="mb-4 flex items-center">
                            <input
                                type="text"
                                placeholder="Search for orders..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className="ml-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                                onClick={handleSearch}
                            >
                                <Search className="w-5 h-5"/>
                            </button>
                        </div>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : isError ? (
                            <div>Error: {error.message}</div>
                        ) : (
                            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        ID
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        User Name
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Status
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Total Price
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Order Type
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Created At
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {displayedOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-700">{order.id}</td>
                                        <td className="py-3 px-4 text-gray-700">{order.userName}</td>
                                        <td className="py-3 px-4 text-gray-700">{order.status}</td>
                                        <td className="py-3 px-4 text-gray-700">{order.totalPrice}</td>
                                        <td className="py-3 px-4 text-gray-700">{order.orderType}</td>
                                        <td className="py-3 px-4 text-gray-700">{new Date(order.createdAt).toLocaleString()}</td>
                                        <td className="py-3 px-4 text-gray-700">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(selected) => setCurrentPage(selected.selected)}
                            containerClassName={'flex justify-center items-center mt-4'}
                            pageClassName={'mx-2'}
                            activeClassName={'rounded bg-blue-300 text-white px-4 py-2'}
                            previousClassName={'mr-2'}
                            nextClassName={'ml-2'}
                        />
                    </div>
                </main>
            </div>
            <OrderModal
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                order={selectedOrder}
            />
        </div>
    );
};

export default ManageOrders;