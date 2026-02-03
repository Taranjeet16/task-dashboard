Task Dashboard – Auth & CRUD App

A full-stack task management application built as part of the Frontend Developer Intern shortlisting assignment.
The project focuses on clean UI, secure authentication, protected routes, and seamless frontend–backend integration.

🔗 Live Links

Frontend (Vercel)
https://task-dashboard-lac.vercel.app

Backend API (Render)
https://task-dashboard-backend-ptjo.onrender.com

GitHub Repository
https://github.com/Taranjeet16/task-dashboard.git

🧱 Tech Stack
Frontend
React + TypeScript
Vite
Tailwind CSS
shadcn/ui
React Router
Axios
React Query

Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT Authentication
bcrypt (password hashing)

Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas

✨ Features
Authentication
Signup & Login with validation
Password hashing (bcrypt)
JWT-based authentication
Protected routes (Dashboard accessible only after login)
Logout flow
Dashboard

User profile display
Create, read, update, delete tasks
Search tasks by title
Mark tasks as completed
Data persistence with MongoDB
Fully responsive UI

UX & Security
Loading & error states
Clear server-side error messages
401 handling for unauthorized access
Input validation on both frontend and backend

📂 Project Structure
task-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── server.js
│   ├── package.json
│   └── .env

⚙️ Environment Variables
Backend (backend/.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret

Frontend
VITE_API_BASE_URL=https://task-dashboard-backend-ptjo.onrender.com/api/v1

🚀 Run Locally
Backend
cd backend
npm install
npm run dev

Runs on: http://localhost:5000

Frontend
cd frontend
npm install
npm run dev

Runs on: http://localhost:8080

🔌 API Endpoints
Auth
POST /api/v1/auth/signup
POST /api/v1/auth/login

Profile
GET /api/v1/me
PUT /api/v1/me

Tasks
GET /api/v1/tasks
POST /api/v1/tasks
GET /api/v1/tasks/:id
PUT /api/v1/tasks/:id
DELETE /api/v1/tasks/:id

🧪 Testing Checklist
✅ Signup with a new account
✅ Login with valid credentials
✅ Dashboard blocked without authentication
✅ Create, edit, and delete tasks
✅ Tasks persist after page refresh
✅ Logout redirects to login
✅ 401 errors displayed clearly in UI

👤 Author

Taranjeet Singh
FullStack Developer Intern Candidate
📧 Email: taranjeets123@gmail.com
🔗 GitHub: https://github.com/Taranjeet16
