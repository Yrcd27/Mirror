const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const journalRoutes = require("./routes/journalRoutes");
const profileRoutes = require("./routes/profileRoutes"); 

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.FRONTEND_URL,
    /\.vercel\.app$/,  // Allow all Vercel domains
    /\.railway\.app$/  // Allow all Railway domains
  ],
  credentials: true
}));
app.use(express.json());
// Apply MongoDB sanitization to prevent NoSQL injection
app.use(mongoSanitize());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Mirror Journaling API", 
    version: "1.0.0",
    endpoints: {
      health: "/health",
      auth: "/api/auth",
      journals: "/api/journals",
      profile: "/api/profile"
    }
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);        
app.use("/api/journals", journalRoutes); 
app.use("/api/profile", profileRoutes);  


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
