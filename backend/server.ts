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
    process.env.FRONTEND_URL || "https://blog-application-pfdz.vercel.app",
    process.env.DEV_FRONTEND_URL || "http://localhost:5173",
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Strip trailing slashes from origin for comparison
            const cleanOrigin = origin?.replace(/\/$/, "");
            if (!origin || allowedOrigins.some(o => o.replace(/\/$/, "") === cleanOrigin)) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        },
        credentials: true,
    })
);

app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("error detected:", err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ PUBLIC ROUTE (important)
app.get("/", (_req, res) => {
    res.send("Blog Application Server running 🚀");
});

export default app; 