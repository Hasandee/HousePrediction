import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.header}>Welcome to House Price Predictor</h1>
                <p style={styles.description}>
                    Enter details about a house, and our AI model will predict its price.
                    Click the button below to get started!
                </p>
                <button style={styles.button} onClick={() => navigate("/predictform")}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        fontFamily: "'Lato', sans-serif",
    },
    card: {
        backgroundColor: "#0B1354",
        padding: "50px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        maxWidth: "500px",
    },
    header: {
        color: "#ecf0f1",
        fontSize: "28px",
        fontWeight: "600",
        marginBottom: "20px",
    },
    description: {
        color: "#ddd",
        fontSize: "16px",
        marginBottom: "30px",
    },
    button: {
        padding: "14px 30px",
        backgroundColor: "#00A0B0",
        color: "#ffffff",
        fontSize: "16px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
        fontWeight: "600",
    },
};

export default StartPage;
