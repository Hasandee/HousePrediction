import React, { useState } from "react";

const PredictionForm = () => {
    const [formData, setFormData] = useState({
        MedInc: "",
        HouseAge: "",
        AveRooms: "",
        AveBedrms: "",
        Population: "",
        AveOccup: "",
        Latitude: "",
        Longitude: ""
    });

    const [prediction, setPrediction] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/prediction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    MedInc: parseFloat(formData.MedInc) * 10,  // Convert to $10,000 units
                    HouseAge: parseFloat(formData.HouseAge),
                    AveRooms: parseFloat(formData.AveRooms),
                    AveBedrms: parseFloat(formData.AveBedrms),
                    Population: parseFloat(formData.Population),
                    AveOccup: parseFloat(formData.AveOccup),
                    Latitude: parseFloat(formData.Latitude),
                    Longitude: parseFloat(formData.Longitude)
                }),
            });

            const result = await response.json();
            if (result.predicted_price !== undefined) {
                setPrediction(`Predicted Price: $${result.predicted_price.toLocaleString()}`);
            } else {
                setPrediction("Error: Unable to get prediction.");
            }
        } catch (error) {
            setPrediction("Error: Server not responding.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.header}>House Price Prediction</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    {Object.keys(formData).map((key) => (
                        <div key={key} style={styles.inputContainer}>
                            <label style={styles.label}>{key.replace(/([A-Z])/g, " $1")}: </label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </div>
                    ))}
                    <button type="submit" style={styles.button}>
                        Predict
                    </button>
                </form>
                {prediction && <h3 style={styles.prediction}>{prediction}</h3>}
            </div>
        </div>
    );
};

// Fresh, elegant styling
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
        padding: "80px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "600px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    },
    header: {
        color: "#ecf0f1",
        fontSize: "30px",
        fontWeight: "600",
        marginBottom: "40px",
        textAlign: "center",
        fontFamily: "'Montserrat', sans-serif",
    },
   
    form: {
        display: "grid",
        gridTemplateColumns: "2fr 2fr", // Two equal columns
        gap: "20px 40px", // Increased gap (Row: 20px, Column: 40px)
        alignItems: "center",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    label: {
        fontSize: "14px",
        color: "#ddd",
        marginBottom: "5px",
        fontWeight: "600",
    },
    input: {
        padding: "12px",
        fontSize: "16px",
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #ccc",
        outline: "none",
        transition: "all 0.3s ease-in-out",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    
    buttonContainer: {
        gridColumn: "span 2", // Span both columns
        display: "flex",
        justifyContent: "flex-end", // Align button to the right
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
    prediction: {
        gridColumn: "span 2", // Prediction spans both columns
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "600",
        color: "#333",
        background: "#E3F2FD",
        padding: "15px",
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
};


export default PredictionForm;
