import PropTypes from 'prop-types'

import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Footer from '../components/Footer/Footer'

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="bg-indigo-400 pb-12">
                <div className=" mx-auto ">
                    <Header />
                </div>
                <div className="container mx-auto">
                    <Hero />
                </div>
            </div>
            <div className="container mx-auto flex-1 py-10">{children}</div>
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
