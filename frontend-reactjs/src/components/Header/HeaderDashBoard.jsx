import {useLocation} from 'react-router-dom'
import AccountMenu from "./AccountMenu.jsx";

// eslint-disable-next-line react/prop-types
const HeaderDashBoard = ({Bell, Search}) => {
    const location = useLocation()
    const getTitle = () => {
        switch (location.pathname) {
            case '/dashboard':
                return 'Dashboard'
            case '/manage-product':
                return 'Manage Product'
            case '/manage-orders':
                return 'Manage Orders'
            case '/revenue':
                return 'Revenue Summary'
            case '/settings':
            default:
                return 'Page'
        }
    }
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {getTitle()}
                </h1>
                <div className="flex items-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-8 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400"/>
                    </div>
                    <button className="ml-4 p-2 text-gray-400 hover:text-gray-500">
                        <Bell className="h-6 w-6"/>
                    </button>
                    <AccountMenu/>
                </div>
            </div>
        </header>
    )
}
export default HeaderDashBoard
