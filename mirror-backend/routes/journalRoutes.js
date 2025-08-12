// routes/journals.js
const express = require("express");
const multer = require("multer");
const Journal = require("../models/Journal");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Multer in-memory (unchanged)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE (unchanged)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { content, mood } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    let imageBase64 = null;
    if (req.file) imageBase64 = req.file.buffer.toString("base64");

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

// ✅ READ all journals (lightweight, paginated, NO image)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const page  = Math.max(parseInt(req.query.page)  || 1, 1);
    const skip  = (page - 1) * limit;

    // exclude image field (it’s heavy)
    const docs = await Journal.find({ user_id: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("_id content createdAt mood")   // no 'image' here
      .lean();

    const items = docs.map(d => ({
      _id: d._id,
      createdAt: d.createdAt,
      mood: d.mood || "",
      // short preview; trim on server to avoid sending megabytes
      excerpt: (d.content || "").slice(0, 220),
    }));

    res.json({
      items,
      page,
      limit,
      hasMore: items.length === limit
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ single journal (unchanged)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const journal = await Journal.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!journal) return res.status(404).json({ message: "Journal not found" });
    res.json(journal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE (unchanged)
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    let updatedFields = { content: req.body.content, mood: req.body.mood };
    if (req.file) updatedFields.image = req.file.buffer.toString("base64");

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

// DELETE (unchanged)
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
