import {
  Routes,
  BrowserRouter as Router,
  Route,
  // Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
// pages
import Home from "./pages/Home/Home";
import Home1 from "./pages/Home/Home1";
import '@fortawesome/fontawesome-free/css/all.min.css';


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
        <Route path="/toydetail/1" element={
          <Home1/>}>


        </Route>
        




      </Routes>
    </Router>
  );
}

export default App;
