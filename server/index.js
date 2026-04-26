const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const notesRoutes = require("./routes/notes");

const app = express();

// ✅ IMPORTANT
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());

// ✅ ALL ROUTES MUST USE /api PREFIX
app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

app.use("/api/notes", notesRoutes);
