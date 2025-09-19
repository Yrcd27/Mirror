const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  mood: { type: String }, // optional
  image: { type: String }, // optional (URL or base64)
}, { timestamps: true }); // createdAt, updatedAt automatically added

// Add compound index for efficient querying by user_id and sorting by createdAt
journalSchema.index({ user_id: 1, createdAt: -1 });

module.exports = mongoose.model("Journal", journalSchema);
