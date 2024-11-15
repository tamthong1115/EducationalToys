import { Bell, Search } from 'lucide-react'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import HeaderDashBoard from '../Header/HeaderDashBoard.jsx'
import SideBarAdmin from '../SideBar/SideBarAdmin'
import AddProductModal from '../Modal/AddProductModal'
import EditProductModal from '../Modal/EditProductModal'

const products = [
    {
        id: 1,
        name: 'LEGO Classic Set',
        price: 45000,
        stock: 12,
        image: 'https://i.pinimg.com/564x/cc/13/de/cc13de4f5caecaf8c7bc6a4334453eaf.jpg',
    },
    {
        id: 2,
        name: 'Barbie Dreamhouse',
        price: 75000,
        stock: 8,
        image: 'https://i.pinimg.com/736x/12/54/67/125467f657e969c036c841c636bc125f.jpg',
    },
    {
        id: 3,
        name: 'Nintendo Switch',
        price: 100000,
        stock: 5,
        image: 'https://i.pinimg.com/564x/4e/00/0a/4e000af426cea9e3f5c375141aeb81cf.jpg',
    },
    {
        id: 4,
        name: 'Hot Wheels Track Set',
        price: 50000,
        stock: 10,
        image: 'https://i.pinimg.com/564x/57/e1/83/57e183a9fb4dae66cc1e84b196c2d7af.jpg',
    },
]

const ManageProduct = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const itemsPerPage = 1

    const handleSearch = () => {
        setCurrentPage(0)
    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage)
    const displayedProducts = filteredProducts.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handleAddProduct = (newProduct) => {
        products.push(newProduct)
    }

    const openEditModal = (product) => {
        setSelectedProduct(product)
        setIsEditModalOpen(true)
    }

    const handleEditProduct = (updatedProduct) => {
        const index = products.findIndex((p) => p.id === updatedProduct.id)
        if (index !== -1) {
            products[index] = updatedProduct
        }
        setIsEditModalOpen(false)
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <SideBarAdmin />
            <div className="flex-1 overflow-y-auto">
                <HeaderDashBoard Search={Search} Bell={Bell} />
                <main className="max-w-7xl mx-auto py-6 px-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Manage Products
                        </h2>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Add New Product
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="mb-4 flex items-center">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className="ml-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                                onClick={handleSearch}
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Image
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Product Name
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Price
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Stock
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedProducts.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="py-3 px-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-10 h-10 rounded-md object-cover"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">
                                            {product.name}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">
                                            ${product.price.toLocaleString()}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">
                                            {product.stock}
                                        </td>
                                        <td className="py-3 px-4 flex items-center space-x-2">
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                                                onClick={() =>
                                                    openEditModal(product)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(selected) =>
                                setCurrentPage(selected.selected)
                            }
                            containerClassName={
                                'flex justify-center items-center mt-4'
                            }
                            pageClassName={'mx-2'}
                            activeClassName={
                                'rounded bg-blue-300 text-white px-4 py-2'
                            }
                            previousClassName={'mr-2'}
                            nextClassName={'ml-2'}
                        />
                    </div>
                </main>
            </div>
            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddProduct}
            />
            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onEdit={handleEditProduct}
                product={selectedProduct}
            />
        </div>
    )
}

export default ManageProduct
