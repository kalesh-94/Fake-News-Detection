# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

# Load model
model = joblib.load("model/fake_news_detector.pkl")

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

# Optional root route to avoid 404s
@app.route('/')
def index():
    return "Fake News Detector API is running!"

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
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)  # Disable debug for production
