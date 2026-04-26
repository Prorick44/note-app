import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import notesRouter from "./routes/notes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRouter);

mongoose.connect("YOUR_MONGO_URL").then(() => {
  console.log("DB connected");
});

app.listen(5000, () => console.log("Server running"));
