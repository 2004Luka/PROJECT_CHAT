import { Server } from "socket.io";
import http from 'http';
import express from "express";

const app = express();

const server = http.createServer(app);
const io =new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});

export const getRecieverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}


const userSocketMap={};//{userId:socketId}

io.on('connection',(socket)=>{
    console.log("a user connected",socket.id)

    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId]=socket.id;
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    // Listen for friend request events
    socket.on('sendFriendRequest', (data) => {
        // Broadcast the friend request to the recipient
        socket.to(data.recipientId).emit('friendRequestReceived', {
            senderId: socket.id,
            senderName: data.senderName,
            message: `${data.senderName} sent you a friend request!`
        });
    });

    // Listen for responses to friend requests
    socket.on('respondToFriendRequest', (data) => {
        // Notify the sender of the response
        socket.to(data.senderId).emit('friendRequestResponse', {
            recipientId: socket.id,
            response: data.response
        });
    });

    
    socket.on('disconnect',()=>{
        console.log("a user disconnected",socket.id);

        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));

    });
})


export {app,io,server}
