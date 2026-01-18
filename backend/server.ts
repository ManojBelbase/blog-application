import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import postRoutes from "./routes/post.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

// CORS
const allowedOrigins = [
    process.env.FRONTEND_URL || "https://quickgptai.vercel.app",
    process.env.DEV_FRONTEND_URL || "http://localhost:5173",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes); // Auth routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ PUBLIC ROUTE (important)
app.get("/", (_req, res) => {
    res.send("QuickGPT Server running 🚀");
});

export default app; 