# Task Dashboard Application

A full-stack task management application with authentication, protected routes, and CRUD functionality.  
Built as part of a Frontend Developer Intern assignment.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)

---

## ✨ Features

- User authentication (Signup / Login)
- JWT-based protected routes
- User profile (view & update)
- Task management (Create, Read, Update, Delete)
- Task completion status + filtering
- Search tasks by title
- Responsive UI (mobile + desktop)
- Loading states and error handling

---

## 📂 Project Structure

root/
├─ frontend/
│ ├─ src/
│ │ ├─ components/
│ │ ├─ pages/
│ │ ├─ context/
│ │ ├─ services/
│ │ └─ utils/
│ └─ package.json
│
├─ backend/
│ ├─ src/
│ │ ├─ controllers/
│ │ ├─ routes/
│ │ ├─ models/
│ │ ├─ middleware/
│ │ └─ config/
│ └─ package.json
│
└─ README.md

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

---

### 1️⃣ Clone the Repository
```sh
git clone <YOUR_GITHUB_REPO_URL>
cd <PROJECT_NAME>

2️⃣ Backend Setup
cd backend
npm install

Create a .env file in backend/:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run backend:
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend will run at:
http://localhost:5173

Backend will run at:
http://localhost:5000

🔐 Demo Credentials
Email: john@example.com
Password: password123

📬 API Documentation
Auth: /api/v1/auth/signup, /api/v1/auth/login
Profile: /api/v1/me
Tasks: /api/v1/tasks
A Postman collection / Swagger documentation is included in the backend.

📈 How Would You Scale This for Production?
Use environment-based configuration and secret management
Enable CORS with proper origin restrictions
Add rate limiting and request validation
Use database indexing for frequently queried fields
Introduce caching (Redis) for read-heavy endpoints
Deploy frontend on CDN and backend on cloud services (AWS/GCP)
Add logging, monitoring, and CI/CD pipelines

👤 Author
Taranjeet Singh
Frontend Developer Intern Candidate
