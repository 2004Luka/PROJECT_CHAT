import dotenv from "dotenv";
import express from "express";
import authRouts from './routs/auth.routes.js';
import connectToMongoDB from "./db/connectToMongoDB.js";

const app =express();


dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use("/api/auth",authRouts)

// app.get("/",(req,res)=>{
//     //root
//     res.send("Hello World");
// });

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);

});

