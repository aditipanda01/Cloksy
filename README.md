# 🎯 ProMinder - Professional Internship Reminder System

**ProMinder** is a full-stack web application designed to help students and professionals track internship applications, manage deadlines, and receive timely reminders. Built with the MERN stack and featuring a Chrome extension for quick internship saving.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Chrome Extension](#-chrome-extension)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Secure JWT-based registration and login
- 📝 **Internship Management** - Create, read, update, and delete internship entries
- 📅 **Deadline Tracking** - Set and track application deadlines
- ⏰ **Smart Reminders** - Automated daily cron job for reminder notifications
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔔 **Chrome Extension** - Quick-save internships from LinkedIn, YouTube, Instagram, WhatsApp

### Additional Features
- User dashboard with all saved internships
- Date-based sorting and filtering
- Responsive design for mobile and desktop
- Secure password hashing with bcryptjs
- Protected API routes with middleware authentication

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP requests
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **node-cron** - Scheduled tasks
- **CORS** - Cross-origin resource sharing

### Browser Extension
- **Chrome Extension API** - Manifest V3
- **Content Scripts** - Page scraping
- **Background Service Worker** - Message passing
- **Chrome Storage API** - Token persistence

---

## 📁 Project Structure

```
ProMinder/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection
│   │   ├── cron/
│   │   │   └── reminderCron.js       # Daily reminder scheduler
│   │   ├── middleware/
│   │   │   └── auth.js               # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── User.js               # User schema
│   │   │   └── Internship.js         # Internship schema
│   │   ├── routes/
│   │   │   ├── auth.js               # Authentication routes
│   │   │   └── internships.js        # Internship CRUD routes
│   │   ├── utils/
│   │   │   └── twilio.js             # SMS utility (optional)
│   │   ├── app.js                    # Express app configuration
│   │   └── server.js                 # Server entry point
│   ├── package.json
│   └── .env                          # Environment variables
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── InternshipForm.jsx    # Internship creation form
│   │   ├── pages/
│   │   │   ├── Landing.jsx           # Landing/home page
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Register.jsx          # Registration page
│   │   │   └── Dashboard.jsx         # User dashboard
│   │   ├── api.js                    # Axios API configuration
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Tailwind imports
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json                   # Vercel deployment config
│
└── extension/
    ├── manifest.json                 # Extension configuration
    ├── background.js                 # Service worker
    ├── content.js                    # Content script for scraping
    ├── content-script-injector.js    # Token sync script
    ├── popup.html                    # Extension popup UI
    ├── popup.js                      # Popup logic
    ├── auth-helper.html              # Login helper page
    ├── auth-helper.js                # Auth helper logic
    └── styles.css                    # Popup styles
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   touch .env
   ```

4. **Add environment variables** (see [Environment Variables](#-environment-variables))

5. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update API base URL** (if needed)
   - Edit `frontend/src/api.js`
   - Change `baseURL` to your backend URL

4. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

### Chrome Extension Setup

1. **Open Chrome and navigate to**
   ```
   chrome://extensions/
   ```

2. **Enable "Developer mode"** (toggle in top-right corner)

3. **Click "Load unpacked"**

4. **Select the `extension/` folder**

5. **Extension is now installed!**

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/prominder
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/prominder

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Twilio SMS (Optional - currently disabled)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_PHONE=+1234567890
ADMIN_SMS_TO=+1234567890
```

### Important Notes:
- **JWT_SECRET**: Use a strong, random string in production
- **MONGO_URI**: Use MongoDB Atlas for production deployment
- **Twilio**: SMS functionality is currently disabled in the codebase

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |

**Register Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "msg": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Internship Routes (`/api/internships`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/internships` | Create internship | ✅ |
| GET | `/api/internships` | Get all user internships | ✅ |
| GET | `/api/internships/:id` | Get single internship | ✅ |
| PUT | `/api/internships/:id` | Update internship | ✅ |
| DELETE | `/api/internships/:id` | Delete internship | ✅ |

**Create Internship Request Body:**
```json
{
  "title": "Software Engineering Intern",
  "description": "Full-stack development role at Tech Corp",
  "link": "https://example.com/apply",
  "deadline": "2025-12-31",
  "reminderDate": "2025-12-20"
}
```

**Authorization Header:**
```
Authorization: Bearer <your_jwt_token>
```

---

## 🧩 Chrome Extension

### Features
- Quick-save internships from any webpage
- Automatic scraping of page title and URL
- Inline login functionality
- Token synchronization with web app
- Works on LinkedIn, YouTube, Instagram, WhatsApp

### How to Use

1. **Login via Extension**
   - Click extension icon
   - Click "Open Login Page" button
   - Login on the web app
   - Token automatically syncs to extension

2. **Save an Internship**
   - Navigate to internship posting
   - Click extension icon
   - Fill in deadline and reminder date
   - Click "Save"

3. **Supported Platforms**
   - LinkedIn Jobs
   - YouTube (for video-based postings)
   - Instagram
   - WhatsApp Web
   - Any website (manual entry)

### Extension Files Explained

- **manifest.json** - Extension configuration and permissions
- **background.js** - Service worker for message passing
- **content.js** - Scrapes page data
- **popup.html/js** - Extension popup interface
- **content-script-injector.js** - Syncs auth tokens from website

---



---

## 🌐 Deployment

### Backend Deployment (Render/Heroku)

1. **Create account on Render.com**

2. **Create new Web Service**

3. **Connect your GitHub repository**

4. **Configure settings:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables

5. **Deploy!**

   Your backend will be available at:
   ```
https://prominder.onrender.com
   ```

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Update API URL in `src/api.js`**
   ```javascript
   baseURL: "https://your-backend-url.onrender.com/api"
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

5. **Your frontend is live!**
   ```
 https://cloksy-ochre.vercel.app/
   ```

### MongoDB Atlas Setup

1. **Create account at mongodb.com/cloud/atlas**

2. **Create a new cluster**

3. **Get connection string:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/prominder
   ```

4. **Add to your backend `.env`**

5. **Whitelist your IP address** (or allow all: `0.0.0.0/0`)

---

## 🔧 Common Issues & Solutions

### CORS Error
- Ensure backend has `cors` middleware enabled
- Check frontend API URL matches backend URL
- Verify backend is running

### Authentication Not Working
- Check JWT_SECRET is set in backend `.env`
- Verify token is being stored in localStorage
- Check Authorization header format: `Bearer <token>`

### Extension Not Saving
- Ensure extension has correct backend URL in `popup.js`
- Check Chrome storage permissions in `manifest.json`
- Verify user is logged in (token stored)

### Database Connection Failed
- Check MONGO_URI in `.env`
- Verify MongoDB service is running
- Check network connectivity for Atlas

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Code Style Guidelines
- Use ES6+ syntax
- Follow existing code formatting
- Add comments for complex logic
- Test before submitting PR

---

## 🐛 Known Issues

- SMS reminder functionality is currently disabled
- Extension may need permission refresh on some sites
- Date picker UI varies across browsers

---

## 📝 Future Enhancements

- [ ] Email notifications for reminders
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Export internships to CSV/PDF
- [ ] Mobile app (React Native)
- [ ] AI-powered application tracking
- [ ] Resume builder integration
- [ ] Company research assistant
- [ ] Interview preparation resources
- [ ] Application status tracking (Applied, Interview, Offer, etc.)
- [ ] Analytics dashboard (success rate, response time)

---

## 📄 License

This project is licensed under the **ISC License**.

```
Copyright (c) 2025 ProMinder

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 👨‍💻 Authors

- Aditi Panda

---


---

## 🌟 Show Your Support

If this project helped you, please give it a ⭐️!

---

**Made with ❤️ **
