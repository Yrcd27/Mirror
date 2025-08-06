const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const journalRoutes = require("./routes/journalRoutes"); // ✅ Import journal routes

const app = express();

// Middleware
app.use(cors()); // allows frontend to call backend
app.use(express.json()); // lets backend read JSON from requests

// Routes
app.use("/api/auth", authRoutes);       // Auth routes
app.use("/api/journals", journalRoutes); // ✅ Journal routes

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
