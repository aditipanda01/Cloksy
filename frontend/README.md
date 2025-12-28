# 🎯 ProMinder - Professional Internship Reminder System

**ProMinder** is a full-stack web application designed to help students and professionals track internship applications, manage deadlines, and receive timely reminders. Built with the MERN stack and featuring a Chrome extension for quick internship saving.

🌐 **Live Application**: [https://cloksy-ochre.vercel.app](https://cloksy-ochre.vercel.app)  
🔗 **Backend API**: [https://prominder.onrender.com](https://prominder.onrender.com)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Chrome Extension](#-chrome-extension)
- [Publishing Chrome Extension](#-publishing-chrome-extension-to-chrome-web-store)
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

3. **Update API base URL** (if needed for local development)
   - Edit `frontend/src/api.js`
   - For production, it's already set to: `https://prominder.onrender.com/api`

4. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

### Chrome Extension Setup

1. **Update extension URLs for production** (already configured in your manifest.json)
   - Backend API: `https://prominder.onrender.com`
   - Frontend: `https://cloksy-ochre.vercel.app`

2. **Open Chrome and navigate to**
   ```
   chrome://extensions/
   ```

3. **Enable "Developer mode"** (toggle in top-right corner)

4. **Click "Load unpacked"**

5. **Select the `extension/` folder**

6. **Extension is now installed!**

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/prominder

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
   - Login on the web app at [https://cloksy-ochre.vercel.app/login](https://cloksy-ochre.vercel.app/login)
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

## 🌐 Publishing Chrome Extension to Chrome Web Store

### Prerequisites
- Google account
- One-time developer registration fee ($5)
- Prepared extension files

### Step-by-Step Guide

#### 1. **Prepare Your Extension**

Before publishing, make sure your extension is production-ready:

- ✅ Update `manifest.json` with production URLs (already done)
- ✅ Test the extension thoroughly
- ✅ Create promotional images and screenshots

**Required Assets:**
- **Icon**: 128x128px PNG (main extension icon)
- **Screenshots**: At least 1, max 5 (1280x800 or 640x400)
- **Promotional tile**: 440x280px (optional but recommended)
- **Small tile**: 220x140px (optional)

#### 2. **Create a ZIP Package**

```bash
# Navigate to your extension directory
cd extension/

# Create a ZIP file (exclude unnecessary files)
zip -r prominder-extension.zip . -x "*.DS_Store" -x "*.git*"
```

Or manually:
- Select all files in the `extension/` folder
- Right-click → "Compress" (Mac) or "Send to → Compressed folder" (Windows)

#### 3. **Register as Chrome Web Store Developer**

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Pay the one-time $5 registration fee
4. Accept the Developer Agreement

#### 4. **Upload Your Extension**

1. Click **"New Item"** button
2. Upload your `prominder-extension.zip` file
3. Click **"Upload"**

#### 5. **Fill Out the Store Listing**

**Product details:**
- **Name**: ProMinder - Internship Reminder
- **Summary** (132 chars max):
  ```
  Save internships from any website and get timely reminders. Never miss a deadline again!
  ```
- **Description** (detailed, max 16,000 chars):
  ```
  ProMinder Chrome Extension - Your Professional Internship Reminder Assistant

  Never miss an internship application deadline again! ProMinder helps you save internships from LinkedIn, YouTube, Instagram, WhatsApp, and any other website directly to your dashboard.

  KEY FEATURES:
  ✅ Quick Save - One-click saving of internship postings
  ✅ Auto-Fill - Automatically captures job title and URL
  ✅ Smart Reminders - Set custom deadline and reminder dates
  ✅ Secure Login - Syncs seamlessly with your ProMinder account
  ✅ Multi-Platform - Works on all major job posting sites

  HOW TO USE:
  1. Install the extension
  2. Login with your ProMinder account
  3. Browse internship postings on any website
  4. Click the extension icon to save
  5. Fill in deadline and reminder date
  6. View all saved internships in your dashboard

  PRIVACY & SECURITY:
  - Your data is encrypted and secure
  - We only access pages when you click the extension
  - No tracking or data collection
  - Open-source and transparent

  SUPPORTED PLATFORMS:
  • LinkedIn Jobs
  • YouTube
  • Instagram
  • WhatsApp Web
  • Any website with job postings

  Get started today and streamline your internship application process!
  ```

**Category**: Productivity

**Language**: English

#### 6. **Upload Graphics**

Upload the required images:

1. **Store icon** (128x128px):
   - Use your ProMinder logo
   - Should be clear and recognizable

2. **Screenshots** (at least 1):
   - Take screenshots of:
     - Extension popup interface
     - Saving an internship from LinkedIn
     - Dashboard showing saved internships
   - Recommended size: 1280x800 or 640x400

3. **Promotional images** (optional but recommended):
   - Small tile: 220x140px
   - Marquee: 1400x560px

#### 7. **Privacy Practices**

Fill out the privacy section:

- **Permissions justification**:
  ```
  - "tabs": To detect the current page URL and title for auto-filling
  - "scripting": To scrape job information from web pages
  - "storage": To securely store authentication tokens locally
  - "host_permissions": To interact with LinkedIn, YouTube, Instagram, and WhatsApp for saving internships
  ```

- **Privacy Policy URL**:
  ```
  https://cloksy-ochre.vercel.app/privacy-policy
  ```
  (You'll need to create this page on your website)

- **Data usage disclosure**:
  - ✅ We do not collect any user data
  - ✅ Authentication tokens are stored locally only
  - ✅ No analytics or tracking

#### 8. **Pricing & Distribution**

- **Pricing**: Free
- **Visibility**: Public
- **Distribution**: All countries/regions

#### 9. **Submit for Review**

1. Review all information
2. Click **"Submit for Review"**
3. Wait for Google's review (typically 1-3 business days)

#### 10. **After Approval**

Once approved, your extension will be live at:
```
https://chrome.google.com/webstore/detail/[your-extension-id]
```

Share this link in your:
- GitHub README
- Website
- Social media

### Updating Your Extension

When you need to update:

1. Make changes to your extension code
2. Increment the version number in `manifest.json`
3. Create a new ZIP file
4. Go to Developer Dashboard
5. Click your extension → "Package" → "Upload new package"
6. Submit for review

### Common Rejection Reasons to Avoid

- ❌ Using overly broad permissions
- ❌ Missing or unclear privacy policy
- ❌ Poor quality screenshots
- ❌ Misleading description
- ❌ Violating Chrome Web Store policies

### Tips for Success

✅ **Clear description** - Explain what your extension does
✅ **Quality screenshots** - Show the extension in action
✅ **Proper permissions** - Only request what you need
✅ **Privacy policy** - Be transparent about data usage
✅ **Good support** - Provide email or support link

---

## 🎨 Screenshots

### Landing Page
Beautiful hero section with gradient animations and feature highlights.

### Dashboard
Clean, organized view of all saved internships with deadline tracking.

### Chrome Extension
Quick-save interface with auto-filled data from current page.

### Login/Register
Secure authentication with elegant dark theme design.

---

## 🌐 Deployment

### Backend Deployment (Render)

**Already deployed at**: [https://prominder.onrender.com](https://prominder.onrender.com)

To redeploy or update:

1. Push changes to GitHub
2. Render will automatically rebuild (if auto-deploy is enabled)
3. Or manually deploy from Render dashboard

### Frontend Deployment (Vercel)

**Already deployed at**: [https://cloksy-ochre.vercel.app](https://cloksy-ochre.vercel.app)

To redeploy or update:

1. **Push changes to GitHub**
   ```bash
   git add .
   git commit -m "Update frontend"
   git push
   ```

2. **Vercel will auto-deploy** (if connected to GitHub)

Or manually:
```bash
cd frontend
vercel --prod
```

### MongoDB Atlas Setup

1. **Create account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create a new cluster**
3. **Get connection string**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/prominder
   ```
4. **Add to backend `.env` and Render environment variables**
5. **Whitelist IP addresses** (or allow all: `0.0.0.0/0`)

---

## 🔧 Common Issues & Solutions

### CORS Error
- Ensure backend has `cors` middleware enabled
- Check frontend API URL matches backend URL: `https://prominder.onrender.com/api`
- Verify backend is running

### Authentication Not Working
- Check JWT_SECRET is set in backend environment variables
- Verify token is being stored in localStorage
- Check Authorization header format: `Bearer <token>`

### Extension Not Saving
- Ensure extension has correct backend URL: `https://prominder.onrender.com`
- Check Chrome storage permissions in `manifest.json`
- Verify user is logged in (token stored)

### Database Connection Failed
- Check MONGO_URI in Render environment variables
- Verify MongoDB Atlas service is running
- Check network connectivity and IP whitelist

### Render Backend Sleeping (Free Tier)
- Free tier apps sleep after 15 minutes of inactivity
- First request may take 30-60 seconds to wake up
- Consider upgrading to paid tier for always-on service

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
- Render free tier may cause initial load delay (backend sleeping)

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
- [ ] Publish extension to Chrome Web Store
- [ ] Add Firefox and Edge browser support

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

- **Aditi Panda** - Creator & Developer

---

## 📞 Support

For issues, questions, or suggestions:
- 📧 Email: support@prominder.app (update with your email)
- 🐛 GitHub Issues: [Create an issue](https://github.com/your-username/prominder/issues)
- 💬 Discussions: [Join discussions](https://github.com/your-username/prominder/discussions)

---

## 🌟 Show Your Support

If this project helped you, please give it a ⭐️ on GitHub!

---

## 🔗 Links

- **Live Application**: [https://cloksy-ochre.vercel.app](https://cloksy-ochre.vercel.app)
- **Backend API**: [https://prominder.onrender.com](https://prominder.onrender.com)
- **Chrome Extension**: Coming to Chrome Web Store soon!
- **GitHub Repository**: [Add your GitHub link]

---

**Made with ❤️ by Aditi Panda**