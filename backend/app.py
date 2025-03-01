from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Load the trained model
with open("Housing_Price.pkl", "rb") as file:
    model = pickle.load(file)

@app.route("/")
def test():
    return "<h1>Flask App is running</h1>"

@app.route("/prediction", methods=["POST"])
def predict():
    try:
        # Get input data from request
        data = request.get_json()

        # Ensure all inputs are converted correctly
        features = np.array([
            data["MedInc"] / 10,  # Convert back to original scale ($10,000 units)
            data["HouseAge"],   
            data["AveRooms"],   
            data["AveBedrms"],  
            data["Population"], 
            data["AveOccup"],   
            data["Latitude"],   
            data["Longitude"]   
        ]).reshape(1, -1)

        # Make prediction
        prediction = model.predict(features)[0] * 100000  # Convert back to dollar units

        # Return response
        return jsonify({"predicted_price": round(float(prediction), 2)})

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
