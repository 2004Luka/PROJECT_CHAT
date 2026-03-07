import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import config from '../config/config';

const useGetFriends = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authUser } = useAuthContext();

    const fetchFriends = useCallback(async (showToast = false) => {
        if (!authUser) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${config.API_BASE_URL}/api/friends/${authUser._id}/friends`);

            if (!res.ok) throw new Error(`Failed to fetch friends: ${res.status}`);

            const data = await res.json();
            const processedFriends = Array.isArray(data.friends)
                ? data.friends.map(friend => ({
                    _id: friend._id,
                    username: friend.username,
                    fullName: friend.fullName || friend.username,
                    profilePic: friend.profilePic || null
                }))
                : [];

            setFriends(processedFriends);
            if (showToast) toast.success('Friends list updated');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
            setFriends([]);
        } finally {
            setLoading(false);
        }
    }, [authUser]);

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    return { friends, setFriends, loading, error, refetch: () => fetchFriends(true) };
};

export default useGetFriends;