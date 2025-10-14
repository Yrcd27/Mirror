const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true, // Ensures email is always stored in lowercase
    trim: true,      // Removes whitespace
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
