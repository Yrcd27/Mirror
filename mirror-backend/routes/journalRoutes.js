const express = require("express");
const Journal = require("../models/Journal");
const authMiddleware = require("../middleware/authMiddleware"); // checks JWT

const router = express.Router();

// CREATE a journal entry
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { content, mood, image } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    const journal = new Journal({
      user_id: req.user.id,
      content,
      mood,
      image
    });
    await journal.save();
    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ all journals for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const journals = await Journal.find({ user_id: req.user.id }).sort({ createdAt: -1 });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ READ single journal by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const journal = await Journal.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!journal) return res.status(404).json({ message: "Journal not found" });
    res.json(journal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE journal
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true }
    );
    if (!journal) return res.status(404).json({ message: "Journal not found" });
    res.json(journal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE journal
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    if (!journal) return res.status(404).json({ message: "Journal not found" });
    res.json({ message: "Journal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
