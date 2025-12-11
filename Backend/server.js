import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB
connectDB();

app.use("/api/tasks", taskRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
