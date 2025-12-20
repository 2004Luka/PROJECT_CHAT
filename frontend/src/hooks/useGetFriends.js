import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import config from '../config/config';

const useGetFriends = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (!authUser) {
            setLoading(false);
            return;
        }

        const fetchFriends = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No authentication token found');

                const res = await fetch(`${config.API_BASE_URL}/api/friends/${authUser._id}/friends`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!res.ok) throw new Error(`Failed to fetch friends: ${res.status}`);

                const data = await res.json();
                const processedFriends = Array.isArray(data.friends)
                    ? data.friends.map(friend => ({
                        _id: friend._id,
                        username: friend.username,
                        fullName: friend.fullName || friend.username,
                        profilePic: friend.profilePic || '/default-avatar.png'
                    }))
                    : [];

                setFriends(processedFriends);
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
                setFriends([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [authUser]);

    return { friends, setFriends, loading, error };
};

export default useGetFriends;