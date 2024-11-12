import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "./context/AuthContext.jsx";
import {BrowserRouter as Router} from "react-router-dom";

const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
            },
        },
    }
);
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router>
            <AuthProvider>
                    <App/>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
            </AuthProvider>
            </Router>
        </QueryClientProvider>
    </StrictMode>,
)
