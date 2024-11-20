/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

const EditStaffModal = ({ isOpen, onClose, onEdit, staff }) => {
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [imageFile, setImageFile] = useState(null)

    useEffect(() => {
        if (staff) {
            setName(staff.name)
            setRole(staff.role)
            setEmail(staff.email)
            setImage(staff.image)
        }
    }, [staff])

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
                setImageFile(file)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedStaff = {
            ...staff,
            name,
            role,
            email,
            image,
        }
        onEdit(updatedStaff)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                    Edit Staff Member
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-2 py-1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-2 py-1"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded px-2 py-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 rounded px-2 py-1"
                            onChange={handleImageUpload}
                        />
                        {image && (
                            <img
                                src={image}
                                alt="Profile Preview"
                                className="mt-2 w-32 h-32 object-cover rounded-md mx-auto"
                            />
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStaffModal
