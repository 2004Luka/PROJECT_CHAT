import User from '../models/user.model.js'

export const requestController = async (req, res) => {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
        return res.status(400).json({ error: 'Sender and receiver IDs are required' });
    }

    try {
        const receiver = await User.findById(receiverId);
        const sender = await User.findById(senderId);

        if (!receiver || !sender) return res.status(404).json({ error: 'User not found' });

        const alreadyRequested = receiver.friendRequests.some(req => req.sender.equals(senderId));
        const alreadyFriends = sender.friends.includes(receiverId);

        if (alreadyRequested || alreadyFriends) {
            return res.status(400).json({ error: 'Request already sent or users are already friends' });
        }

        // Ensure that friendRequests is initialized
        if (!receiver.friendRequests) {
            receiver.friendRequests = [];
        }

        receiver.friendRequests.push({ sender: sender._id });
        await receiver.save();

        res.status(200).json({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.error('Error sending friend request:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};
