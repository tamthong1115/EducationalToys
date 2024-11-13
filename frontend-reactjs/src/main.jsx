import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
    'pk_test_51QIuZsCY44542ryJS0GhH3bMisIGLWdHkC6xttdAbadZr0sMn4H6Ey3IY1HxWXeuJis4yZ1Bza4YxP2p59ZeyXx1004Dc6S4Ue'
)
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Elements stripe={stripePromise}>
            <App />
        </Elements>
    </StrictMode>
)
