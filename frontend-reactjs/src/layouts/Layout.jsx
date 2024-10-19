import PropTypes from "prop-types";

import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner"; 
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";
import { AboutUs } from "../components/AboutUs/AboutUs";

const Layout = ({ children }) => { //cái child này là sao ok để thêm
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-white">
        <div className="container mx-auto py-4">
          <Header />
        </div>

      </div>
      <div className="container mx-auto flex-1">{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
