import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import {confirmPayment} from '../../API/CartAPI.js'
import {toast} from 'react-hot-toast'
import {useMutation} from '@tanstack/react-query'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({paymentIntentData, cartItemIds, user}) => {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    // console.log(user)

    const {mutate: confirmPaymentMutation, isLoading} = useMutation({
        mutationKey: 'confirmPayment',
        mutationFn: ({paymentIntentId, userId, totalPrice, cartItemIds}) =>
            confirmPayment(paymentIntentId, userId, totalPrice, cartItemIds),
        onSuccess: () => {
            toast.success('Payment successful!')
            navigate('/orders')
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to confirm payment')
        },
    })

    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: user.email,
            phone: user.phone,
            address: user.address,
        }
    })

    const handleCheckout = async () => {

        if (!stripe || !elements) {
            toast.error('Stripe is not ready')
            return
        }


        const cardElement = elements.getElement(CardElement)

        const {error, paymentIntent} = await stripe.confirmCardPayment(paymentIntentData.clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: user.name,
                    email: user.email,
                },
            },
        })

        if (error) {
            toast.error(error.message)
        } else if (paymentIntent.status === 'succeeded') {
            confirmPaymentMutation({
                paymentIntentId: paymentIntent.id,
                userId: user.id,
                totalPrice: paymentIntent.amount,
                cartItemIds,
            })
        }
    }


    return (
        <form onSubmit={handleSubmit(handleCheckout)}
              className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-3">
            <span className="text-3xl font-bold">Confirm Your Details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="flex-1 text-sm font-bold text-gray-700">
                    Email
                    <input
                        className="mt-1 w-full rounded border bg-gray-200 px-3 py-2 font-normal text-gray-700"
                        type="text"
                        readOnly
                        disabled
                        {...register("email")}
                    />
                </label>

                <label className="flex-1 text-sm font-bold text-gray-700">
                    Phone
                    <input
                        className="mt-1 w-full rounded border bg-gray-200 px-3 py-2 font-normal text-gray-700"
                        type="text"
                        readOnly
                        disabled
                        {...register("phone")}
                    />
                </label>

                <label className="flex-1 text-sm font-bold text-gray-700">
                    Address
                    <input
                        className="mt-1 w-full rounded border bg-gray-200 px-3 py-2 font-normal text-gray-700"
                        type="text"
                        readOnly
                        disabled
                        {...register("address")}
                    />
                </label>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <CardElement id="payment-element" className="rounded-md border p-2 text-sm"/>
            </div>
            <button
                disabled={isLoading}
                type="submit"
                className="text-md h-full rounded bg-blue-600 p-2 font-bold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isLoading ? "Saving..." : `Pay $${paymentIntentData?.totalPrice}`}
            </button>
        </form>
    )
}

export default CheckoutForm