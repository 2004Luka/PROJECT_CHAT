import React, { useEffect } from 'react';
import useGetFriends from '../../hooks/useGetFriends';
import FriendItem from './FriendItem';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext.jsx';
import { FaUserFriends, FaSpinner } from 'react-icons/fa';

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
    <div className='flex flex-col h-full'>
      {/* Header */}
      <div className='flex items-center gap-2 mb-4 pb-2 border-b border-green-500/20'>
        <FaUserFriends className='text-green-400 text-lg' />
        <h3 className='text-green-300 font-semibold'>Friends ({friends.length})</h3>
      </div>

      {/* Friends List */}
      <div className='flex-1 overflow-y-auto space-y-2'>
        {friends.map((friend, idx) => (
          <FriendItem
            key={friend._id}
            friend={friend}
            onStartChat={startChat}
            lastIdx={idx === friends.length - 1}
          />
        ))}
        
        {loading && (
          <div className='flex flex-col items-center justify-center py-8'>
            <FaSpinner className='text-green-400 text-2xl animate-spin mb-2' />
            <p className='text-green-300 text-sm'>Loading friends...</p>
          </div>
        )}
        
        {!loading && error && (
          <div className='text-center py-8'>
            <div className='bg-red-900/20 border border-red-500/30 rounded-lg p-4'>
              <p className='text-red-400 font-medium'>Error loading friends</p>
              <p className='text-red-300 text-sm mt-1'>{error}</p>
            </div>
          </div>
        )}
        
        {!loading && !error && friends.length === 0 && (
          <div className='text-center py-8'>
            <FaUserFriends className='text-green-400/50 text-4xl mx-auto mb-3' />
            <p className='text-green-300 text-lg font-medium'>No friends yet</p>
            <p className='text-green-400/70 text-sm mt-1'>Start by adding some friends!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsList;