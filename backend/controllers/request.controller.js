import User from '../models/user.model.js';

export const requestController = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user._id;

        if (!receiverId) return res.status(400).json({ error: 'Receiver ID is required' });

        const [receiver, sender] = await Promise.all([
            User.findById(receiverId),
            User.findById(senderId)
        ]);

        if (!receiver || !sender) return res.status(404).json({ error: 'User not found' });

        const alreadyRequested = receiver.friendRequests?.some(req => req.sender.equals(senderId));
        const alreadyFriends = sender.friends?.some(id => id.equals(receiverId));

        if (alreadyRequested || alreadyFriends) {
            return res.status(400).json({ error: 'Request already sent or users are already friends' });
        }

        receiver.friendRequests = receiver.friendRequests || [];
        receiver.friendRequests.push({ sender: sender._id });
        await receiver.save();

        res.status(200).json({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.error('Error sending friend request:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};
