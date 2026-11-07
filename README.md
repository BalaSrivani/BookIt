# 📚 BookIt – Experience Booking Platform

BookIt is a **full-stack MERN application** designed for booking unique experiences and activities online.  
Users can browse, view details, and book experiences with date and time slots in a clean, user-friendly interface.

---
App is AVailable on https://book-it-5c3w.vercel.app/
## 🚀 Tech Stack

### 🖥️ Frontend
- **React + TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for modern styling
- **React Router DOM** for navigation

### ⚙️ Backend
- **Node.js** + **Express.js**
- **MongoDB Atlas** (Cloud Database)
- **Mongoose** for schema modeling
- **CORS** + **dotenv** for security and environment management

---


---

## 🛠️ Setup Instructions (Local Development)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/BalaSrivani/BookIt.git
cd BookIt
```
### 2️⃣ Setup Backend
```bash
cd backend
npm inatall
```
Create a .env file inside the backend folder:
```ini
PORT=5000
MONGO_URI=your_mongodb_atlas_url
```
Run the backend server
```bash
npm run dev
```
Backend runs by default on  http://localhost:5000

### 3️⃣ Setup Frontend
In axios.ts change baseURL to http://localhost:5000/api
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs by default on  http://localhost:5173


### 💡 Features

- ✅ Browse a list of experiences
- ✅ View detailed information about each experience
- ✅ Select available dates and time slots
- ✅ Booking summary with quantity, tax, and total
- ✅ Smooth navigation between pages
- ✅ Responsive and mobile-friendly design


### Example API end points
| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| `GET`  | `/experiences`     | Fetch all experiences     |
| `GET`  | `/experiences/:id` | Fetch a single experience |
| `POST` | `/bookings`        | Create a booking          |
| `GET`  | `/bookings/:id`    | View booking details      |
