import User from '../models/user.model.js';
import { io } from '../socket/socket.js';

export const respondController = async (req, res) => {
    try {
        const { receiverId, senderId, action } = req.body;
        if (!['accept', 'reject'].includes(action)) return res.status(400).json({ error: 'Invalid action' });

        const [receiver, sender] = await Promise.all([
            User.findById(receiverId),
            User.findById(senderId)
        ]);

        if (!receiver || !sender) return res.status(404).json({ error: 'User not found' });

        const requestIndex = receiver.friendRequests?.findIndex(req => req.sender.equals(senderId)) ?? -1;
        if (requestIndex === -1) return res.status(404).json({ error: 'Friend request not found' });

        if (action === 'accept') {
            receiver.friends = receiver.friends || [];
            sender.friends = sender.friends || [];
            receiver.friends.push(sender._id);
            sender.friends.push(receiver._id);
            io.to(senderId.toString()).emit('friendRequestAccepted', { friend: receiver });
            io.to(receiverId.toString()).emit('friendRequestAccepted', { friend: sender });
        }

        receiver.friendRequests.splice(requestIndex, 1);
        await Promise.all([receiver.save(), sender.save()]);

        res.status(200).json({ message: `Friend request ${action}ed successfully` });
    } catch (error) {
        console.error('Error responding to friend request:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

