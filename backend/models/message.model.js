import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,//this will be id witch will be in user model
        ref: "User",//id will be from user 
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,//this will be id witch will be in user model
        ref: "User",//id will be from user 
        required: true
    },
    message: {
        type: String,
        required: true
    }
    //createAt,updatedAt for example updatedAt => message.createdAt : 15:30
},{timestamps:true});