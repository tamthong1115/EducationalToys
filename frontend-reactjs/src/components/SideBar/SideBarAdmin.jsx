
import React from "react"
const SideBarAdmin = () =>{
    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-blue-600">ToyRent</h1>
            </div>
            <nav className="mt-6">
                <a
                    href="#"
                    className="block py-2 px-4 text-sm bg-blue-100 text-blue-600"
                >
                    Dashboard
                </a>
                <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100"
                >
                    Toy Rentals
                </a>
                <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100"
                >
                    Manage Inventory
                </a>
                <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100"
                >
                    Customer Reviews
                </a>
            </nav>
            <div className="mt-6 px-4">
                <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Others
                </h2>
                <nav className="mt-2">
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100"
                    >
                        Settings
                    </a>
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100"
                    >
                        Payment
                    </a>
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100"
                    >
                        Accounts
                    </a>
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100"
                    >
                        Help
                    </a>
                </nav>
            </div>
        </div>
    )
}
export default SideBarAdmin