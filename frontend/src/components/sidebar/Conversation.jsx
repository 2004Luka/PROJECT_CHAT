import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import FriendButton from './FriendButton';
import useGetFriends from '../../hooks/useGetFriends';
import { FaUser, FaCircle, FaUserCheck } from 'react-icons/fa';

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    const isSelected = selectedConversation?._id === conversation._id;

    const { friends, loading, error } = useGetFriends(); 
    const isFriend = friends.map(friend => friend._id).includes(conversation._id);

    if (loading) {
        return <div>Loading...</div>; 
    }
    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <>
            <div
                className={`flex gap-3 items-center rounded-lg p-3 
                            min-h-[60px] w-full border-b border-green-500/20 transition-all duration-300
                    ${isSelected ? "bg-green-500/30 border-green-500/50" : ""}
                    ${isFriend ? "cursor-pointer hover:bg-green-500/20" : "cursor-default opacity-75"}`}
                onClick={() => isFriend && setSelectedConversation(conversation)}
            >
                <div className='relative flex-shrink-0'>
                    <div className="w-12 h-12 rounded-full border-2 border-green-500/30 overflow-hidden">
                        {conversation.profilePic ? (
                            <img 
                                src={conversation.profilePic} 
                                alt={`${conversation.fullName}'s profile`}
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <div className='w-full h-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center'>
                                <FaUser className='text-white text-lg' />
                            </div>
                        )}
                    </div>
                    {isOnline && (
                        <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center'>
                            <FaCircle className='text-green-400 text-xs' />
                        </div>
                    )}
                </div>

                <div className='flex flex-col flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                        <p className='font-semibold text-green-100 truncate'>{conversation.fullName}</p>
                        {isOnline && (
                            <div className='flex items-center gap-1 text-green-400 text-xs'>
                                <FaCircle className='text-green-500' />
                                <span className='hidden md:inline'>Online</span>
                            </div>
                        )}
                    </div>
                    <p className='text-green-400/70 text-sm truncate'>
                        @{conversation.username}
                    </p>
                </div>

                <div className='flex-shrink-0' onClick={(e) => e.stopPropagation()}>
                    {isFriend ? (
                        <div className='flex items-center gap-1 text-green-400 text-sm'>
                            <FaUserCheck />
                            <span className='hidden md:inline'>Friends</span>
                        </div>
                    ) : (
                        <FriendButton receiverId={conversation._id} /> 
                    )}
                </div>
            </div>
        </>
    );
}

export default Conversation;