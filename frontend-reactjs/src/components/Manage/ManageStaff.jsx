import { Bell, Search } from 'lucide-react'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import HeaderDashBoard from '../Header/HeaderDashBoard'
import AddStaffModal from '../Modal/AddStaffModal'
import EditStaffModal from '../Modal/EditStaffModal'
import SideBarAdmin from '../SideBar/SideBarAdmin'

const staffMembers = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Manager',
        email: 'john.doe@example.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'Sales Associate',
        email: 'jane.smith@example.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        role: 'Cashier',
        email: 'bob.johnson@example.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 4,
        name: 'Alice Brown',
        role: 'Stock Manager',
        email: 'alice.brown@example.com',
        image: 'https://via.placeholder.com/150',
    },
]

const ManageStaff = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 1
    const [staff, setStaff] = useState(staffMembers)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingStaff, setEditingStaff] = useState(null)

    const handleSearch = () => {
        setCurrentPage(0)
    }

    const filteredStaff = staff.filter((staff) =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const pageCount = Math.ceil(filteredStaff.length / itemsPerPage)
    const displayedStaff = filteredStaff.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handleAddStaff = (newStaff) => {
        setStaff([...staff, newStaff])
        setIsAddModalOpen(false)
    }

    const handleEditStaff = (updatedStaff) => {
        setStaff(
            staff.map((s) => (s.id === updatedStaff.id ? updatedStaff : s))
        )
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
                            Manage Staff
                        </h2>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Add New Staff
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="mb-4 flex items-center">
                            <input
                                type="text"
                                placeholder="Search for staff members..."
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
                                        Name
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Role
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Email
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedStaff.map((staff) => (
                                    <tr
                                        key={staff.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="py-3 px-4">
                                            <img
                                                src={staff.image}
                                                alt={staff.name}
                                                className="w-10 h-10 rounded-md object-cover"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">
                                            {staff.name}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">
                                            {staff.role}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">
                                            {staff.email}
                                        </td>
                                        <td className="py-3 px-4 flex items-center space-x-2">
                                            <button
                                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                                                onClick={() => {
                                                    setEditingStaff(staff)
                                                    setIsEditModalOpen(true)
                                                }}
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
                                ' rounded bg-blue-300 text-white px-4 py-2'
                            }
                            previousClassName={'mr-2'}
                            nextClassName={'ml-2'}
                        />
                    </div>
                </main>
            </div>
            <AddStaffModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddStaff}
            />
            <EditStaffModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onEdit={handleEditStaff}
                staff={editingStaff}
            />
        </div>
    )
}

export default ManageStaff
