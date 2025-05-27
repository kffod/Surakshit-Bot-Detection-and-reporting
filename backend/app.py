from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import logging
from utils.reddit_api import get_reddit_user_details
from utils.preprocessing import preprocess_data
from utils.gemini import generate_report
import joblib
from datetime import datetime
import pymongo

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# MongoDB connection
mongodb_available = False
try:
    client = MongoClient(os.getenv(
        'MONGODB_URI', 'mongodb://localhost:27017/'), serverSelectionTimeoutMS=5000)
    client.admin.command('ping')  # Test connection
    db = client.bot_detector
    mongodb_available = True
    logger.info("MongoDB connection successful")
except pymongo.errors.ServerSelectionTimeoutError:
    logger.warning("MongoDB connection failed - running in offline mode")
    client = None
    db = None

# Load pre-trained model
try:
    model_path = os.path.join(os.path.dirname(
        __file__), "models/reddit_bot_detection_model.pkl")
    model = joblib.load(model_path)
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        username = data.get("screen_name")

        if not username:
            return jsonify({"error": "Missing username"}), 400

        # Fetch Reddit user details
        user_data = get_reddit_user_details(username)
        if not user_data:
            return jsonify({"error": "User not found"}), 404

        # Predict bot status
        features = preprocess_data(user_data)
        prediction = model.predict([features])[0]

        # Store prediction in MongoDB if available
        if mongodb_available:
            try:
                prediction_data = {
                    "username": username,
                    "prediction": bool(prediction),
                    "timestamp": datetime.utcnow(),
                    "user_data": user_data
                }
                db.predictions.insert_one(prediction_data)
            except Exception as e:
                logger.warning(
                    f"Could not store prediction in MongoDB: {str(e)}")

        response_data = {
            **user_data,
            "is_bot": bool(prediction)
        }
        return jsonify(response_data)

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/feedback", methods=["POST"])
def submit_feedback():
    try:
        data = request.get_json()
        feedback_data = {
            'username': data.get('username'),
            'feedback': data.get('feedback'),
            'comment': data.get('comment'),
            'prediction': data.get('prediction'),
            'timestamp': datetime.utcnow()
        }

        if mongodb_available:
            try:
                db.feedback.insert_one(feedback_data)
                return jsonify({'message': 'Feedback submitted successfully'}), 200
            except Exception as e:
                logger.warning(
                    f"Could not store feedback in MongoDB: {str(e)}")
                return jsonify({'message': 'Feedback received but not stored (MongoDB unavailable)'}), 200
        else:
            logger.info(
                "Feedback received but not stored (MongoDB unavailable)")
            return jsonify({'message': 'Feedback received but not stored (MongoDB unavailable)'}), 200

    except Exception as e:
        logger.error(f"Feedback error: {str(e)}")
        return jsonify({'error': str(e)}), 400


@app.route("/api/generate-report", methods=["POST"])
def generate_report_endpoint():
    try:
        data = request.get_json()
        user_data = data.get('userData')

        if not user_data:
            return jsonify({'error': 'No user data provided'}), 400

        report_text = generate_report(user_data)

        # Store report in MongoDB if available
        if mongodb_available:
            try:
                report_data = {
                    'username': user_data.get('screen_name'),
                    'report': report_text,
                    'timestamp': datetime.utcnow()
                }
                db.reports.insert_one(report_data)
            except Exception as e:
                logger.warning(f"Could not store report in MongoDB: {str(e)}")

        return jsonify({
            'message': 'Report generated successfully',
            'report': report_text
        }), 200
    except Exception as e:
        logger.error(f"Report generation error: {str(e)}")
        return jsonify({'error': str(e)}), 400


@app.route('/health')
def health_check():
    health_status = {
        'status': 'healthy',
        'mongodb': 'connected' if mongodb_available else 'disconnected',
        'model': 'loaded' if model is not None else 'not loaded',
        'timestamp': datetime.utcnow().isoformat()
    }

    # Status is only unhealthy if model is not loaded
    status_code = 200 if model is not None else 500

    return jsonify(health_status), status_code


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
