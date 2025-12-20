import { Server } from "socket.io";
import http from 'http';
import express from "express";

const app = express();
const server = http.createServer(app);
const userSocketMap = {};
const isProd = process.env.NODE_ENV === "production";

const io = new Server(server, {
    cors: {
        origin: isProd ? [process.env.CLIENT_URL] : ["http://localhost:3000", "http://localhost:5000"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

export const getRecieverSocketId = (receiverId) => userSocketMap[receiverId];

const emitOnlineUsers = () => io.emit("getOnlineUsers", Object.keys(userSocketMap));

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        emitOnlineUsers();
    }

    socket.on('sendFriendRequest', (data) => {
        socket.to(data.recipientId).emit('friendRequestReceived', {
            senderId: socket.id,
            senderName: data.senderName,
            message: `${data.senderName} sent you a friend request!`
        });
    });

    socket.on('respondToFriendRequest', (data) => {
        socket.to(data.senderId).emit('friendRequestResponse', {
            recipientId: socket.id,
            response: data.response
        });
    });

    socket.on('disconnect', () => {
        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
            emitOnlineUsers();
        }
    });
});

export { app, io, server };
