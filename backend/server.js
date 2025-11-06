import path from "path"
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRouts from './routs/auth.routes.js';
import messageRoutes from './routs/message.routes.js';
import userRoutes from './routs/user.routes.js';
import requestRoutes from './routs/request.routes.js';
import imageRoutes from './routs/image.routes.js'; 

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


dotenv.config();
const PORT = process.env.PORT || 5000;

// Get the directory of this file (backend/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.NODE_ENV === "production" 
        ? process.env.CLIENT_URL 
        : ["http://localhost:3000", "http://localhost:5000", "http://localhost:5173"],
    credentials: true,
}));

app.use("/api/auth",authRouts)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)
app.use("/api/friends",requestRoutes)
app.use("/api/images",imageRoutes)

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
});



server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);

});
