import React, { useEffect } from 'react';
import useGetFriends from '../../hooks/useGetFriends';
import FriendItem from './FriendItem';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext.jsx';

const FriendsList = () => {
  const { friends,setFriends, loading, error } = useGetFriends();
  const { setSelectedConversation } = useConversation();
  const { socket } = useSocketContext();

  const startChat = (friend) => {
    setSelectedConversation({
      _id: friend._id,
      username: friend.username,
      fullName: friend.fullName || friend.username,
      profilePic: friend.profilePic,
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on('friendRequestAccepted', ({ friend }) => {
        setFriends(prev => [...prev, friend]);
      });
    }

    return () => {
      if (socket) {
        socket.off('friendRequestAccepted');
      }
    };
  }, [socket, setFriends]);

  return (
    <div className='py-1 flex sm:flex-row md:flex-col overflow-auto h-full'>
      {friends.map((friend, idx) => (
        <FriendItem
          key={friend._id}
          friend={friend}
          onStartChat={startChat}
          lastIdx={idx === friends.length - 1}
        />
      ))}
      {loading && <span className='loading loading-spinner mx-auto'></span>}
      {!loading && error && <p className='text-center text-red-500'>{error}</p>}
      {!loading && !error && friends.length === 0 && <p className='text-center'>No friends found</p>}
    </div>
  );
};

export default FriendsList;