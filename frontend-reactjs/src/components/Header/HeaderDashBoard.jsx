import React from 'react';

const HeaderDashBoard = ({ Bell, Search }) =>{
    return(
          <header className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Dashboard
                        </h1>
                        <div className="flex items-center">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-8 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            <button className="ml-4 p-2 text-gray-400 hover:text-gray-500">
                                <Bell className="h-6 w-6" />
                            </button>
                            <button className="ml-4 flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                <span>Happy Toys</span>
                                <svg
                                    className="ml-1 h-5 w-5 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>
    )
}
export default HeaderDashBoard