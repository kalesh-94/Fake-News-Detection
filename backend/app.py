# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# Load model
model = joblib.load("model/fake_news_detector.pkl")

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = [data['text']]
    prediction = model.predict(text)[0]
    result = "Fake" if prediction == 1 else "Real"
    return jsonify({'prediction': result})

if __name__ == '__main__':
    # Run on all interfaces so other devices can connect
    app.run(host='0.0.0.0', port=5000, debug=True)
