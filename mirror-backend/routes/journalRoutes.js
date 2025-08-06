const express = require("express");
const multer = require("multer");
const Journal = require("../models/Journal");
const authMiddleware = require("../middleware/authMiddleware"); // checks JWT

const router = express.Router();

// Multer setup to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE a journal entry (with optional image upload)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { content, mood } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    let imageBase64 = null;
    if (req.file) {
      imageBase64 = req.file.buffer.toString("base64");
    }

    const journal = new Journal({
      user_id: req.user.id,
      content,
      mood,
      image: imageBase64
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

// READ single journal by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const journal = await Journal.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!journal) return res.status(404).json({ message: "Journal not found" });
    res.json(journal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE journal (with optional new image)
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    let updatedFields = {
      content: req.body.content,
      mood: req.body.mood
    };

    if (req.file) {
      updatedFields.image = req.file.buffer.toString("base64");
    }

    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      updatedFields,
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
