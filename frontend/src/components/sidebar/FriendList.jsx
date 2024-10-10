import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchFriends = async () => {
      if (!authUser) return;

      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('Fetching friends for user:', authUser._id);

        const res = await fetch(`/api/friends/${authUser._id}/friends`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch friends: ${res.status} ${res.statusText}`);
        }

        const rawText = await res.text(); // Get raw response text
        console.log('Raw response:', rawText);

        let data;
        try {
          data = JSON.parse(rawText);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          console.error('Raw response:', rawText);
          throw new Error('Invalid JSON response from server');
        }

        console.log('Parsed friends data:', data);

        if (Array.isArray(data.friends)) {
          setFriends(data.friends);
        } else {
          console.error('Unexpected friends data format:', data);
          setFriends([]);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
        toast.error(error.message);
        setFriends([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [authUser]);

  const startChat = (friend) => {
    console.log('Starting chat with:', friend.username);
  };

  if (loading) {
    return <div>Loading friends...</div>;
  }

  return (
    <div>
      <h3>Your Friends</h3>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <div key={friend._id} className="friend-item">
            <span>{friend.username}</span>
            <button onClick={() => startChat(friend)}>Chat</button>
          </div>
        ))
      ) : (
        <p>No friends found</p>
      )}
    </div>
  );
};

export default FriendsList;