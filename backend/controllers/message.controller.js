import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getRecieverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }




        // This will run in parallel
        await Promise.all([
            conversation.save(),
            newMessage.save()
        ]);

        res.status(201).json(newMessage);

        // Socket.io functionality goes here


        
        const reveiverSocketId = getRecieverSocketId(receiverId);
        if(reveiverSocketId){
            //send event to speciofic client 
            io.to(reveiverSocketId).emit("newMessage",newMessage)
        }

    } catch (error) {
        console.log("error in sendMessages controller: ", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        console.log('Fetched conversation:', conversation);

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        res.status(200).json(messages);

    } catch (error) {
        console.log("error in getMessage controller: ", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};
