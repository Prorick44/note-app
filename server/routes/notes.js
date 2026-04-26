const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// CREATE NOTE
router.post("/", async (req, res) => {
  const { userId, title, content } = req.body;

  const note = await Note.create({
    userId,
    title,
    content,
  });

  res.json(note);
});

// GET ALL NOTES
router.get("/:userId", async (req, res) => {
  const notes = await Note.find({ userId: req.params.userId });
  res.json(notes);
});

// UPDATE NOTE
router.put("/:id", async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(note);
});

// DELETE NOTE
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
