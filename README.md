# 🧒 Voices Unheard Project 🎨📣

An empowering full-stack platform that highlights the untold stories of children facing adversity. Through digital storytelling, art, and community support, we aim to give visibility to voices that often go unheard.
## 🌍 Live Application

🔗 [Unheard Voices — Deployed on Vercel](https://unheardvoices-project.vercel.app)

## 🔗 Live Project Links

- 🎨 Frontend: [https://unheardvoices-project.vercel.app](https://unheardvoices-project.vercel.app)  
- ⚙️ Backend API: [https://unheardvoices-project.onrender.com/api](https://unheardvoices-project.onrender.com/api)


## 👥 Team & Roles

- **Backend Developer**: [Rency Boreh](https://github.com/RencyBoreh) — built the REST API, managed database schemas, and implemented authentication, donations, and CORS protection.
- **Frontend Developer**: [Joseph Muchiri](https://github.com/JosephMuchiri) — designed the UI with React, integrated Axios calls, and built the story browser, submission forms, and donation interface.

## ✨ Features

- 🎒 **Story Submission** — Anyone can submit stories of children needing help, with optional photos and location.
- 💬 **Story Viewer** — Public gallery of published stories told in children's own words.
- 🤝 **Donations API** — Backend support for handling donation records.
- 🎨 **Image Hosting** — Integrated with Cloudinary for scalable image uploads.
- 🔒 **Admin Panel** — Secure routes for verifying, publishing, or archiving stories.
- 📈 **Views & Analytics** — Tracks the number of views per story.
- 🔗 **Contact Form** — Allows direct messages from users or volunteers.

---

## 🖼️ Screenshots

### 🏠 Homepage
![Homepage](https://github.com/RencyBoreh/UNHEARDVOICES-PROJECT/blob/99e3ccb85703df8fd3c4fcedf45d3c16c4359328/homepage.JPG)

### 📝 Submit Story
![Submit Story](https://github.com/RencyBoreh/UNHEARDVOICES-PROJECT/blob/8e036d30e3d7a3958b79586847571552bd7e2210/submit%20story.JPG)

### 🛠️ Admin Dashboard
![Admin Dashboard](https://github.com/RencyBoreh/UNHEARDVOICES-PROJECT/blob/52f503b0d7a7c2ce7dbebdd8470a5bc931ab8200/admindashboard.JPG)

### 💝 Donate Page
![Donate Page](https://github.com/RencyBoreh/UNHEARDVOICES-PROJECT/blob/403331b559e82856232a69926c19917617c34000/donatepage.JPG)


---

## 🧱 Tech Stack

### Frontend 🖥️
- React
- Axios
- Tailwind CSS / Custom styling
- Vite
- Hosted on [Vercel](https://vercel.com)

### Backend 🔧
- Node.js & Express
- MongoDB (via Atlas)
- Mongoose ORM
- Cloudinary (image upload)
- dotenv for configuration
- Hosted on [Render](https://render.com)

---

## 🔐 API Overview

- **GET /api/stories** — View published stories
- **POST /api/stories** — Submit a new story
- **POST /api/upload** — Upload an image (Cloudinary)
- **POST /api/donations** — Record donation info
- **Admin routes** — (protected, for verification and moderation)

📌 CORS configured to allow communication between:
- `https://unheardvoices-project.vercel.app`

## ⚙️ Setup Instructions (Local Dev)

### Backend
```bash
git clone https://github.com/RencyBoreh/UNHEARDVOICES-PROJECT
cd server
npm install
# Create .env and configure MONGO_URI, PORT, FRONTEND_URL
npm run dev
Frontend
bash
cd client
npm install
# Set VITE_API_URL in .env to http://localhost:5000/api
npm run dev
