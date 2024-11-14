import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

const stripePromise = loadStripe(
    'pk_test_51QIuZsCY44542ryJS0GhH3bMisIGLWdHkC6xttdAbadZr0sMn4H6Ey3IY1HxWXeuJis4yZ1Bza4YxP2p59ZeyXx1004Dc6S4Ue'
)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
})
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router>
                <AuthProvider>
                    <Elements stripe={stripePromise}>
                        <App />
                        <Toaster position="top-right" reverseOrder={false} />
                    </Elements>
                </AuthProvider>
            </Router>
        </QueryClientProvider>
    </StrictMode>
)
