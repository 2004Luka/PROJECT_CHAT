import User from '../models/user.model.js';

export const getFriendRequestsController = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Fetching friend requests for user:', userId);

        const user = await User.findById(userId).populate('friendRequests.sender', 'username');

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User found:', user);
        console.log('Friend requests:', user.friendRequests);

        const pendingRequests = user.friendRequests.filter(request => request.status === 'pending');

        console.log('Pending requests:', pendingRequests);

        res.status(200).json({ requests: pendingRequests });
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).json({ error: 'Server error' });
    }
};