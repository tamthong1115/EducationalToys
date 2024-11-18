import {Routes, Route} from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home/Home';
import SearchList from './components/SearchList/SearchList';
import AboutUs from './components/AboutUs/AboutUs';
import ToysDetailsPage from './components/ToysDetail/ToysDetailsPage';
import UserChat from './components/ChatFunction/UserChat';
import AdminChat from './components/ChatFunction/AdminChat';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import CancelPayment from './components/CancelPayment/CancelPayment';
import CartPage from './pages/Cart';
import { UserPages } from './components/UserPages/UserPages';
import { Profile } from './components/Profile/Profile';

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout>
                        <Home/>
                        <UserChat/>
                    </Layout>
                }
            />
            <Route
                path="/Admin"
                element={
                    <Layout>
                        <AdminChat/>
                    </Layout>
                }
            />
            <Route
                path="/payment-success"
                element={
                    <Layout>
                        <PaymentSuccess/>
                    </Layout>
                }
            />
            <Route
                path="/cancel-payment"
                element={
                    <Layout>
                        <CancelPayment/>
                    </Layout>
                }
            />
            <Route
                path="/aboutUs"
                element={
                    <Layout>
                        <AboutUs/>
                    </Layout>
                }
            />
            <Route
                path="/toydetail/:id"
                element={
                    <Layout>
                        <ToysDetailsPage/>
                    </Layout>
                }
            />
            <Route
                path="/search"
                element={
                    <Layout>
                        <SearchList/>
                    </Layout>
                }
            />
            <Route
                path="/cart"
                element={
                    <Layout>
                        <CartPage/>
                    </Layout>
                }
            />

            <Route
                path="/user"
                element={
                    <Layout>
                        <UserPages/>
                    </Layout>
                }
            />

            <Route
                path="/user/profile"
                element={
                    <Layout>
                        <Profile/>
                    </Layout>
                }
            />
        </Routes>
    );
}

export default App;