import User from '../models/user.model.js'; // Import the User model
import { io } from '../socket/socket.js'; // Adjust the path as needed

export const respondController = async (req, res) => {
    const { receiverId, senderId, action } = req.body; // action can be 'accept' or 'reject'

    try {
        const receiver = await User.findById(receiverId);
        const sender = await User.findById(senderId);

        if (!receiver || !sender) {
            return res.status(404).json({ error: 'User not found' });
        }

        const requestIndex = receiver.friendRequests.findIndex(req => req.sender.equals(senderId));
        if (requestIndex === -1) {
            return res.status(404).json({ error: 'Friend request not found' });
        }

        if (action === 'accept') {
            // Add each other as friends
            receiver.friends.push(sender._id);
            sender.friends.push(receiver._id);
            receiver.friendRequests[requestIndex].status = 'accepted';
            io.to(senderId.toString()).emit('friendRequestAccepted', { friend: receiver });
      io.to(receiverId.toString()).emit('friendRequestAccepted', { friend: sender });
        } else if (action === 'reject') {
            receiver.friendRequests[requestIndex].status = 'rejected';
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }

        // Remove the friend request from the array
        receiver.friendRequests.splice(requestIndex, 1);

        await receiver.save();
        await sender.save();

        res.status(200).json({ message: `Friend request ${action}ed successfully` });
    } catch (error) {
        console.error('Error responding to friend request:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

