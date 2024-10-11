import {
  Routes,
  BrowserRouter as Router,
  Route,
  // Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
// pages
import Home from "./pages/Home/Home";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Dashboard from "./components/Dashboard/Dashboard";


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
        <Route
          path="/dashboard"
          element={
              <Dashboard/>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
