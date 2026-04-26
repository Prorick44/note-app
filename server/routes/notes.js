import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// READ ALL
router.get("/:userId", async (req, res) => {
  const notes = await Note.find({ userId: req.params.userId });
  res.json(notes);
});

// CREATE
router.post("/", async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
