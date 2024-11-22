import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';
import PropTypes from "prop-types";
import LoadingComponent from "./Loading/LoadingComponent.jsx";

const AdminRoute = ({element}) => {
    const {isAdmin, authLoading} = useAuth();
    // console.log(`isAdmin: ${isAdmin()}`);

    if (authLoading) {
        return LoadingComponent();
    }

    return isAdmin() ? element : <Navigate to="/"/>;
};

// validate props
AdminRoute.propTypes = {
    element: PropTypes.node.isRequired,
};

export default AdminRoute;