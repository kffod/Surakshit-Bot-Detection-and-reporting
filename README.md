# Surakshit - Fake Social Media Bot Detection and Reporting

**Surakshit** is a full-stack fake profile and bot detection platform built to combat social media manipulation.  
Using machine learning and real-time Reddit data, it detects suspicious accounts and enables users to report them easily.  
Built with a modern React UI and Flask backend, powered by MongoDB for scalable data storage.

---

## 🔗 Live Demo

- **Frontend (React)**: [https://surakshit-bot-detection-and-reporti.vercel.app/](https://surakshit-bot-detection-and-reporti.vercel.app/)
- **Backend (Flask API)**: [https://surakshit-bot-detection-and-reporting.onrender.com](https://surakshit-bot-detection-and-reporting.onrender.com)

---

## ✨ Features

- ✅ Machine learning-based bot detection  
- ✅ Real-time Reddit data analysis via PRAW  
- ✅ Sentiment analysis of Reddit posts and comments  
- ✅ MongoDB for storing profiles and logs  
- ✅ Clean, responsive React UI  
- ✅ Flask REST API for classification and reporting  
- ✅ Deployment via Vercel (frontend) and Render (backend)  
- ✅ Docker-ready for local and cloud deployment

---

## 🛠️ Tech Stack

| Layer       | Tech Used                        |
|------------|----------------------------------|
| Frontend   | React.js, Vercel                 |
| Backend    | Flask (Python), Render           |
| ML         | scikit-learn, pandas, NumPy      |
| Database   | MongoDB (local or Atlas)         |
| API        | Reddit (via PRAW)                |
| DevOps     | Render, Vercel, Docker           |

---

## 📁 Project Structure

```plaintext
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
└── README.md
## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kffod/Surakshit-Bot-Detection-and-reporting.git
cd Surakshit-Bot-Detection-and-reporting
```

### 2. Backend (Flask API)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

> Flask app runs at: `http://127.0.0.1:5000`

### 3. Frontend (React)

```bash
cd ../frontend
npm install
npm run dev
```

> React app runs at: `http://localhost:3000`
