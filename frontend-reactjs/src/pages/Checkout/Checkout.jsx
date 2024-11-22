import {useAuth} from '../../context/AuthContext.jsx'
import {createPaymentIntent} from '../../API/CartAPI.js'
import {Elements} from "@stripe/react-stripe-js";
import {useQuery} from "@tanstack/react-query";
import {useLocation} from 'react-router-dom';
import CheckoutForm from "./CheckoutForm.jsx";
import {getUserProfile} from "../../API/UserAPI.js";
import LoadingComponent from "../../components/Loading/LoadingComponent.jsx";

const Checkout = () => {
    const {stripePromise} = useAuth();

    const {data: user, isLoading: userLoading} = useQuery({
        queryKey: ['user'],
        queryFn: getUserProfile,
    })


    const location = useLocation();
    const {cartItemIds} = location.state || {};

    const {data: paymentIntentData, isLoading} = useQuery({
        queryKey: ['paymentIntent'],
        queryFn: () => createPaymentIntent(cartItemIds),
    })

    if (isLoading || userLoading) {
        return LoadingComponent()
    }

    return (
        <div>
            <Elements stripe={stripePromise} options={{clientSecret: paymentIntentData.clientSecret}}>
                <CheckoutForm paymentIntentData={paymentIntentData} cartItemIds={cartItemIds} user={user}/>
            </Elements>
        </div>
    )

}

export default Checkout
