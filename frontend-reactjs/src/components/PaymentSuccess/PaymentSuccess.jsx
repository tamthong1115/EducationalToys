import React from 'react'
import { useNavigate } from 'react-router-dom' // Nếu bạn sử dụng react-router để điều hướng

const PaymentSuccess = () => {
    const navigate = useNavigate()

    const handleBackToHome = () => {
        navigate('/') // Điều hướng về trang chủ
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Payment Successful!</h1>
            <p style={styles.message}>
                Thank you for your purchase. Your payment was successful.
            </p>
            <button style={styles.button} onClick={handleBackToHome}>
                Go to Homepage
            </button>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f8ff',
    },
    heading: {
        fontSize: '2rem',
        color: '#4caf50',
    },
    message: {
        fontSize: '1.2rem',
        color: '#333',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#4caf50',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
}

export default PaymentSuccess
