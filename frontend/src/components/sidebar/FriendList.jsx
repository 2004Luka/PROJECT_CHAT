import { useEffect, useCallback } from 'react';
import useGetFriends from '../../hooks/useGetFriends';
import FriendItem from './FriendItem';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext.jsx';
import { FaUserFriends, FaSpinner, FaSync } from 'react-icons/fa';

const FriendsList = () => {
    const { friends, setFriends, loading, error, refetch } = useGetFriends();
    const { setSelectedConversation } = useConversation();
    const { socket } = useSocketContext();

    const startChat = useCallback((friend) => {
        setSelectedConversation({
            _id: friend._id,
            username: friend.username,
            fullName: friend.fullName || friend.username,
            profilePic: friend.profilePic
        });
    }, [setSelectedConversation]);

    useEffect(() => {
        if (!socket) return;

        const handleFriendRequestAccepted = ({ friend }) => {
            setFriends(prev => [...prev, friend]);
        };

        socket.on('friendRequestAccepted', handleFriendRequestAccepted);
        return () => socket.off('friendRequestAccepted', handleFriendRequestAccepted);
    }, [socket, setFriends]);

    return (
        <div className='flex flex-col h-full'>
            <div className='flex items-center justify-between mb-4 pb-3 border-b border-[#333333]'>
                <div className='flex items-center gap-3'>
                    <FaUserFriends className='text-[#00FF99] text-sm' />
                    <h3 className='text-[#FFFFFF] font-semibold text-sm font-mono'>Friends ({friends.length})</h3>
                </div>
                <button 
                    onClick={refetch}
                    disabled={loading}
                    className='p-1.5 bg-[#111111] border border-[#333333] hover:border-[#00FF99] text-[#666666] hover:text-[#00FF99] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group'
                    title='Refresh List'
                >
                    <FaSync className={`text-xs ${loading ? 'animate-spin text-[#00FF99]' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                </button>
            </div>

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
                    <div className='flex flex-col items-center justify-center py-12'>
                        <FaSpinner className='text-[#00FF99] text-xl mb-3 animate-spin' />
                        <p className='text-[#999999] text-xs font-mono'>Loading friends...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className='text-center py-8'>
                        <div className='bg-[#111111] border border-[#FF4444] p-4'>
                            <p className='text-[#FF4444] font-semibold text-sm font-mono'>Error loading friends</p>
                            <p className='text-[#FF6666] text-xs mt-1 font-mono'>{error}</p>
                        </div>
                    </div>
                )}

                {!loading && !error && friends.length === 0 && (
                    <div className='text-center py-12'>
                        <div className='w-12 h-12 mx-auto mb-4 bg-[#111111] border border-[#333333] flex items-center justify-center'>
                            <FaUserFriends className='text-[#666666] text-xl' />
                        </div>
                        <p className='text-[#FFFFFF] font-semibold text-sm mb-1 font-mono'>No friends yet</p>
                        <p className='text-[#999999] text-xs font-mono'>Start by adding some friends!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendsList;