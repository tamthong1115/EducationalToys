import {
    Routes,
    BrowserRouter as Router,
    Route,
    // Navigate,
} from 'react-router-dom'
import Layout from './layouts/Layout'

import Home from './pages/Home/Home'
import '@fortawesome/fontawesome-free/css/all.min.css'

import SearchList from './components/SearchList/SearchList'

import { AboutUs } from './components/AboutUs/AboutUs'
import ToysDetailsPage from './components/ToysDetail/ToysDetailsPage'
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess'
import CancelPayment from './components/CancelPayment/CancelPayment'
import ManageProduct from './components/Manage/ManageProduct'
import ManageStaff from './components/Manage/ManageStaff'
import RevenueSummary from './components/Manage/RevenueSummary'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />

                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/cancel-payment" element={<CancelPayment />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/aboutUs"
                    element={
                        <Layout>
                            <AboutUs />
                        </Layout>
                    }
                />
                <Route path="/toydetail/1" element={<ToysDetailsPage />} />

                <Route
                    path="/search"
                    element={
                        <Layout>
                            <SearchList />
                        </Layout>
                    }
                />

                <Route path="/manage-product" element={<ManageProduct />} />
                <Route path="/manage-staff" element={<ManageStaff />} />
                <Route path="/revenue" element={<RevenueSummary />} />
            </Routes>
        </Router>
    )
}

export default App
