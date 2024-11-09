import React, { useState } from 'react'
import toydetailpage from '../../assets/images/Toyimg/toydetailpage.jpg'
import { Button, Input, notification } from 'antd'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const ToysDetailsPage = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const toggleDescription = () => {
        setIsExpanded(!isExpanded)
    }

    const handleCheckout = async () => {
        try {
            const response = await fetch(
                'http://localhost:3000/create-checkout-session',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            const { url } = await response.json()

            window.location.href = url
        } catch (error) {
            console.error('Lỗi khi tạo phiên thanh toán:', error)
        }
        // const response = await fetch(
        //     'http://localhost:3000/create-payment-intent',
        //     {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ amount: 1000 }),
        //     }
        // )
        // const { clientSecret } = await response.json()

        // if (!stripe || !elements) {
        //     setLoading(false)
        //     return
        // }

        // const cardElement = elements.getElement(CardElement)

        // const { error, paymentIntent } = await stripe.confirmCardPayment(
        //     clientSecret,
        //     {
        //         payment_method: { card: cardElement },
        //     }
        // )

        // if (error) {
        //     console.log(error.message)
        //     notification.error({ message: error.message })
        // } else if (paymentIntent.status === 'succeeded') {
        //     notification.success({ message: 'Thanh toán thành công!' })
        // }
    }

    const fullDescription = `The multi-award winning Bilibo is widely regarded as one of the most innovative and versatile open-ended toys. Deceptively simple and magically attractive, Bilibo's iconic shell shape and bright colours immediately appeal to children. Bilibo arouses curiosity, engages the imagination and playfully trains basic motor skills and balance. Both boys and girls find unlimited ways to play with Bilibo – using it to rock and spin in, hide under, sit on, tote with and peek through. Bilibo provides hours of fun, indoors and outdoors - all year round.`

    const limitedDescription = isExpanded
        ? fullDescription
        : `${fullDescription.slice(0, 150)}...`

    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                <div className="w-1/2">
                    <img
                        alt="Blue Bilibo sensory toy"
                        className="w-full"
                        src={toydetailpage}
                    />
                </div>
                <div className="w-1/2 pl-8">
                    <h1 className="text-2xl font-bold mb-2 text-left">
                        Bilibo - the Ultimate Sensory Toy
                    </h1>
                    <div className="flex items-center mb-4 text-left">
                        <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                            Save 17%
                        </span>
                        <span className="line-through text-gray-500 ml-2">
                            £29.99
                        </span>
                        <span className="text-red-500 text-xl font-bold ml-2">
                            £24.99
                        </span>
                    </div>
                    <div className="text-gray-700 text-left">
                        <p className="font-bold mb-2">Description</p>
                        <p className="mb-2">
                            {limitedDescription}
                            <button
                                className="text--400 underline "
                                onClick={toggleDescription}
                            >
                                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        </p>
                        <p className="font-bold mb-2">Age Range</p>
                        <p className="mb-2">
                            Recommended Ages: 2 years &amp; up
                        </p>
                        <p className="font-bold mb-2">Price</p>
                        <p className="mb-2">£24.99</p>
                        <p className="font-bold mb-2">Score</p>
                        <div className="flex items-center mb-2">
                            <span className="text-green-500">
                                <i className="fas fa-star"></i>
                            </span>
                            <span className="text-green-500">
                                <i className="fas fa-star"></i>
                            </span>
                            <span className="text-green-500">
                                <i className="fas fa-star"></i>
                            </span>
                            <span className="text-green-500">
                                <i className="fas fa-star"></i>
                            </span>
                            <span className="text-green-500">
                                <i className="fas fa-star-half-alt"></i>
                            </span>
                        </div>
                        <p className="font-bold mb-2">Weight</p>
                        <p className="mb-2">0.5 kg</p>
                        <p className="font-bold mb-2">Category</p>
                        <p className="mb-2">Sensory Toys</p>

                        <div className="mt-4">
                            <span className="font-semibold">Quantity:</span>{' '}
                            <Input
                                className="w-20 h-10"
                                type="number"
                                defaultValue={1}
                                min={1}
                            />
                            <div className="mb-4 mt-4">
                                Please fill in your card number and make payment
                            </div>{' '}
                      
                            <Button className="mt-4" onClick={handleCheckout}>
                                check out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToysDetailsPage
