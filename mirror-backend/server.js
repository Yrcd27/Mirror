const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const journalRoutes = require("./routes/journalRoutes");
const profileRoutes = require("./routes/profileRoutes"); // ✅ Import profile routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);        // Auth routes
app.use("/api/journals", journalRoutes); // Journal routes
app.use("/api/profile", profileRoutes);  // ✅ Profile routes

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
