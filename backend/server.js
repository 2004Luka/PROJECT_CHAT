import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import authRouts from './routs/auth.routes.js';
import messageRoutes from './routs/message.routes.js';
import userRoutes from './routs/user.routes.js';

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouts)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

// app.get("/",(req,res)=>{
//     //root
//     res.send("Hello World");
// });

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);

});

