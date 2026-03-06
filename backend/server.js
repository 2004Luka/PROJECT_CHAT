import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import http from 'http';
import https from 'https';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import requestRoutes from './routes/request.routes.js';
import imageRoutes from './routes/image.routes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Security: Helmet for security headers
app.use(helmet({
    crossOriginResourcePolicy: false, // Allow cross-origin images for now
}));

// Security: Rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: "Too many requests from this IP, please try again after 15 minutes" },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use("/api/auth", authLimiter);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: isProd ? process.env.CLIENT_URL : ["http://localhost:3000", "http://localhost:5000", "http://localhost:5173"],
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/friends", requestRoutes);
app.use("/api/images", imageRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/health", (req, res) => res.status(200).json({ status: "ok", timestamp: new Date().toISOString() }));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../frontend/dist/index.html")));

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
    
    if (isProd) {
        const url = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
        const client = url.startsWith('https') ? https : http;
        const ping = () => client.get(`${url}/health`, () => {});
        ping();
        setInterval(ping, 14 * 60 * 1000);
    }
});
