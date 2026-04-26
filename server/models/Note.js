const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: String,
    title: String,
    content: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Note", noteSchema);
