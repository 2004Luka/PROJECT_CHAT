import User from '../models/user.model.js';

export const getFriendRequestsController = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('friendRequests.sender', 'username fullName profilePic');

        if (!user) return res.status(404).json({ error: 'User not found' });

        const pendingRequests = (user.friendRequests || []).filter(req => req.status === 'pending');
        res.status(200).json({ requests: pendingRequests });
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).json({ error: 'Server error' });
    }
};