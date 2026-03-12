<div align="center">

# Mirror - The Reflective Journaling Platform

A reflective journaling platform with guided prompts where users can securely track thoughts, emotions, and personal growth through customizable interfaces.

[![JavaScript](https://img.shields.io/badge/JavaScript-96.8%25-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Express](https://img.shields.io/badge/Express-Framework-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat&logo=json-web-tokens&logoColor=white)](https://jwt.io)
[![CSS3](https://img.shields.io/badge/CSS3-2.0%25-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![HTML5](https://img.shields.io/badge/HTML5-1.2%25-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)

</div>

## 📝 About The Project

Mirror is a modern web application designed to provide users with a dedicated space for reflective journaling and personal growth. In our fast-paced world, taking time for self-reflection is crucial for mental well-being and personal development. Mirror offers thoughtful prompts, mood tracking, and a beautiful interface to make journaling a meaningful daily practice.

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building component-based interfaces
- **Vite** - Next generation frontend tooling for faster development
- **CSS3** - Custom styling with theme capabilities
- **Context API** - State management for theming and user authentication
- **React Router** - Navigation and routing

### Backend
- **Node.js** - JavaScript runtime for server-side logic
- **Express** - Web framework for building the API
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for secure authentication

### DevOps & Deployment
- **Git** - Version control
- **Vercel** - Frontend deployment
- **MongoDB Atlas** - Cloud database service

## ✨ Features

### Core Functionality
- **User Authentication** - Secure signup and login system
- **Journal Entries** - Create, view, edit, and delete journal entries
- **Prompts** - Thoughtful journaling prompts to inspire reflection
- **User Profile** - Customizable user profiles with avatar upload
- **Dashboard** - Overview of journaling activity and stats

### Security Features
- **JWT Authentication** - Secure token-based authentication system
- **Password Hashing** - bcrypt implementation for secure password storage
- **Protected Routes** - Authorization middleware to protect private content
- **Input Validation** - Server-side validation of all user inputs
- **HTTPS** - Secure data transmission

### UI/UX Features
- **Responsive Design** - Fully responsive across all device sizes
- **Dark/Light Themes** - User-selectable theme preferences
- **Custom Fonts** - Carefully selected typography for optimal reading
- **Smooth Animations** - Subtle animations for a polished user experience
- **Intuitive Navigation** - User-friendly sidebar and navigation elements

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or newer)
- npm or yarn
- MongoDB connection (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Yrcd27/Mirror-journaling-Website.git
cd Mirror-journaling-Website
```

2. Install backend dependencies
```bash
cd mirror-backend
npm install
```

3. Install frontend dependencies
```bash
cd ../mirror-frontend
npm install
```

4. Set up environment variables
- Create a `.env` file in the mirror-backend directory with:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the development servers
- For backend:
```bash
cd mirror-backend
npm run dev
```

- For frontend:
```bash
cd mirror-frontend
npm run dev
```

6. Visit `http://localhost:5173` in your browser

## 📱 Usage

1. Create an account or log in
2. Navigate to the dashboard to see your journaling overview
3. Create new journal entries using the provided prompts or free writing
4. View past entries and track your journaling progress
5. Customize your profile and application preferences

## 🔮 Future Roadmap

- **AI-Powered Insights** - Pattern recognition in journal content
- **Mood Analytics** - Visual representation of mood trends
- **Export Options** - PDF/EPUB export of journal collections
- **Mobile App** - Native applications for iOS and Android
- **Social Features** - Optional community aspects for shared growth

## 👨‍💻 Created By

Developed with care by [Yasiru Pandigama](https://github.com/Yrcd27)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Live Demo

**[Experience Mirror Now](https://mirror-journaling-website.vercel.app/)**

## 🧪 QA and Testing

For comprehensive QA and testing for this project, visit: [QA and Testing for Mirror](https://github.com/Yrcd27/QA-and-Testing-for-Mirror.git)

---

Thank you for exploring Mirror! We hope it helps you on your journey of self-reflection and personal growth.
