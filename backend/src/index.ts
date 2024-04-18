import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cors middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
