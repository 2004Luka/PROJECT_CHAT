import User from '../models/user.model.js';

export const getFriendsController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('friends', 'username profilePic');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error('Error in getFriendsController:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};