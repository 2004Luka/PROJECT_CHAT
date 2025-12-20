import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getRecieverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const { message = "", imageUrl, fileUrl, fileName, fileType } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
            imageUrl: imageUrl || null,
            fileUrl: fileUrl || null,
            fileName: fileName || null,
            fileType: fileType || null
        });

        conversation.messages.push(newMessage._id);
        await conversation.save();

        res.status(201).json(newMessage);

        const receiverSocketId = getRecieverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
    } catch (error) {
        console.log("error in sendMessages controller:", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        res.status(200).json(conversation?.messages || []);
    } catch (error) {
        console.log("error in getMessage controller:", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};
