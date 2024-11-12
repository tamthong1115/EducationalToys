import React from 'react'
import { useNavigate } from 'react-router-dom' // Nếu bạn sử dụng react-router để điều hướng

const CancelPayment = () => {
    const navigate = useNavigate()

    const handleBackToHome = () => {
        navigate('/') // Điều hướng về trang chủ
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Payment Canceled</h1>
            <p style={styles.message}>
                You have canceled the payment process. If you have any
                questions, please contact our support.
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
        backgroundColor: '#fff0f0',
    },
    heading: {
        fontSize: '2rem',
        color: '#ff4d4d',
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
        backgroundColor: '#ff4d4d',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
}

export default CancelPayment
