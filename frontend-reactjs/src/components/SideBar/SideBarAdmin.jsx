import {useNavigate, useLocation, Link} from 'react-router-dom'

const SideBarAdmin = () => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4">
                <Link to={"/"} className="text-2xl font-bold text-blue-600">ToyRent</Link>
            </div>
            <nav className="mt-6">
                <a
                    onClick={() => navigate('/dashboard')}
                    className={`block py-2 px-4 text-sm ${
                        location.pathname === '/dashboard'
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                    } cursor-pointer`}
                >
                    Dashboard
                </a>
                <a
                    onClick={() => navigate('/manage-product')}
                    className={`block py-2 px-4 text-sm ${
                        location.pathname === '/manage-product'
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                    } cursor-pointer`}
                >
                    Manage Product
                </a>
                <a
                    onClick={() => navigate('/manage-staff')}
                    className={`block py-2 px-4 text-sm ${
                        location.pathname === '/manage-staff'
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                    } cursor-pointer`}
                >
                    Manage Staff
                </a>
                <a
                    onClick={() => navigate('/revenue')}
                    className={`block py-2 px-4 text-sm ${
                        location.pathname === '/revenue'
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                    } cursor-pointer`}
                >
                    Revenue Summary
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
