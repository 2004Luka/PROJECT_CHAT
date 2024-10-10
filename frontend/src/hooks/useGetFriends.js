import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useGetFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchFriends = async () => {
      if (!authUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const res = await fetch(`/api/friends/${authUser._id}/friends`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch friends: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (Array.isArray(data.friends)) {
          // Ensure each friend object has the required properties
          const processedFriends = data.friends.map(friend => ({
            _id: friend._id,
            username: friend.username,
            fullName: friend.fullName || friend.username, // Fallback to username if fullName is not available
            profilePic: friend.profilePic || '/default-avatar.png', // Provide a default avatar if not available
          }));
          setFriends(processedFriends);
        } else {
          console.error('Unexpected friends data format:', data);
          setFriends([]);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
        setError(error.message);
        toast.error(error.message);
        setFriends([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [authUser]);

  return { friends, loading, error };
};

export default useGetFriends;