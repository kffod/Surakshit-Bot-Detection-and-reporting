Surakshit - Fake Social Media Bot Detection and Reporting
==========================================================

Surakshit is a full-stack fake profile and bot detection platform built to combat social media manipulation.  
Using machine learning and real-time Reddit data, it detects suspicious accounts and enables users to report them easily.  
Built with a modern React UI and Flask backend, powered by MongoDB for scalable data storage.

LIVE DEMO
----------------------------------------------------------
Frontend (React):     https://surakshit-bot-detection-and-reporti.vercel.app/
Backend (Flask API):  https://surakshit-bot-detection-and-reporting.onrender.com

----------------------------------------------------------
FEATURES
----------------------------------------------------------
✓ Machine learning-based bot detection  
✓ Real-time Reddit data analysis via PRAW  
✓ Sentiment analysis of Reddit posts and comments  
✓ MongoDB for storing profiles and logs  
✓ Clean, responsive React UI  
✓ Flask REST API for classification and reporting  
✓ Deployment via Vercel (frontend) and Render (backend)  
✓ Docker-ready for local and cloud deployment

----------------------------------------------------------
TECH STACK
----------------------------------------------------------
Frontend:     React.js + Vercel  
Backend:      Flask (Python) + Render  
ML:           scikit-learn, pandas, NumPy  
Database:     MongoDB (Cloud or Local)  
API:          Reddit (via PRAW)  
Deployment:   Render (Flask API), Vercel (React UI), Docker

----------------------------------------------------------
PROJECT STRUCTURE
----------------------------------------------------------
Surakshit-Bot-Detection-and-reporting/
│
├── backend/                   # Flask API and ML logic
│   ├── app.py
│   ├── model/
│   ├── utils/
│   ├── db/                    # MongoDB operations
│   ├── .env                   # Environment secrets
│   └── requirements.txt
│
├── frontend/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   ├── .env
│   └── package.json
│
├── Dockerfile
└── README.txt

----------------------------------------------------------
SETUP INSTRUCTIONS
----------------------------------------------------------

1. Clone the repository
--------------------------
git clone https://github.com/kffod/Surakshit-Bot-Detection-and-reporting.git
cd Surakshit-Bot-Detection-and-reporting

2. Backend (Flask API)
--------------------------
cd backend
python -m venv venv
source venv/bin/activate     (Windows: venv\Scripts\activate)
pip install -r requirements.txt
python app.py

Flask app runs on http://127.0.0.1:5000

3. Frontend (React)
--------------------------
cd ../frontend
npm install
npm start

React app runs on http://localhost:3000 and communicates with Flask via REST API.

----------------------------------------------------------
ENVIRONMENT VARIABLES
----------------------------------------------------------

Backend (`backend/.env`)
--------------------------
REDDIT_CLIENT_ID=your_id  
REDDIT_CLIENT_SECRET=your_secret  
REDDIT_USER_AGENT=your_bot_agent  
MONGO_URI=your_mongodb_connection_string  
SECRET_KEY=your_flask_secret_key

Frontend (`frontend/.env`)
--------------------------
REACT_APP_API_BASE_URL=https://surakshit-backend.onrender.com

----------------------------------------------------------
MODEL + DATA INFO
----------------------------------------------------------
- Pre-trained model is stored in `backend/model/`  
- To retrain:
    python utils/train_model.py
- CSV/JSON should include: 
    - username, post text, karma, upvotes, account age, etc.

----------------------------------------------------------
DEPLOYMENT
----------------------------------------------------------
✔ Flask backend deployed to Render  
✔ React frontend deployed to Vercel  
✔ MongoDB hosted on MongoDB Atlas or local instance

----------------------------------------------------------
FUTURE ROADMAP
----------------------------------------------------------
[ ] User auth (JWT)  
[ ] Reddit bot to auto-flag in threads  
[ ] Chrome extension for in-browser bot check  
[ ] Admin analytics dashboard  
[ ] Scheduled re-scanning of flagged users

----------------------------------------------------------
CONTRIBUTING
----------------------------------------------------------
✓ Fork this repo  
✓ Create a new branch: `git checkout -b feature/xyz`  
✓ Push changes: `git push origin feature/xyz`  
✓ Open a Pull Request ✅

----------------------------------------------------------
LICENSE
----------------------------------------------------------
MIT License © 2025 Sachin Jadhav

----------------------------------------------------------
CONTACT
----------------------------------------------------------
👨‍💻 Made by: Sachin Jadhav  
GitHub:    https://github.com/kffod  
