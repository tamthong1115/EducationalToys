import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import {AboutUs} from "./components/AboutUs/AboutUs.jsx";
import ToysDetailsPage from "./components/ToysDetail/ToysDetailsPage.jsx";
import SearchList from "./components/SearchList/SearchList.jsx";

function App() {

    return (
        <>
        <Routes>

            <Route
                path="/"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />
            <Route
                path="/aboutUs"
                element={
                    <Layout>
                        <AboutUs />
                    </Layout>
                }
            />
            <Route path="/toydetail/1" element={
                <ToysDetailsPage/>}/>

            <Route
                path="/search"
                element={
                    <Layout>
                        <SearchList />
                    </Layout>
                }
            />
        </Routes>

        </>


    );

}

export default App
