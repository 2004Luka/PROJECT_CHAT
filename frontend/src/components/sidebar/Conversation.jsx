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
            {/* Conversation Item Card - High-contrast dark mode */}
            <div
                className={`flex gap-3 items-center p-3 min-h-[60px] w-full border transition-all duration-200
                    ${isSelected 
                        ? "bg-[#111111] border-[#00FF99] border-l-2 border-l-[#00FF99]" 
                        : "bg-[#1E1E1E] border-[#333333] hover:bg-[#2A2A2A] hover:border-[#00FF99]"
                    }
                    ${isFriend ? "cursor-pointer" : "cursor-default opacity-50"}
                `}
                onClick={() => isFriend && setSelectedConversation(conversation)}
                tabIndex={isFriend ? 0 : -1}
            >
                {/* Profile Picture */}
                <div className='relative flex-shrink-0'>
                    <div className="w-10 h-10 border border-[#333333] overflow-hidden bg-[#111111]">
                        {conversation.profilePic ? (
                            <img 
                                src={conversation.profilePic} 
                                alt={`${conversation.fullName}'s profile`}
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <div className='w-full h-full bg-[#111111] flex items-center justify-center border border-[#333333]'>
                                <FaUser className='text-[#00FF99] text-sm' />
                            </div>
                        )}
                    </div>
                    {/* Online Status Indicator - Neon Green */}
                    {isOnline && (
                        <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00FF99] rounded-full border-2 border-[#1E1E1E]'></div>
                    )}
                </div>

                {/* User Info */}
                <div className='flex flex-col flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                        <p className={`font-semibold truncate text-sm ${isSelected ? 'text-[#00FF99]' : 'text-[#FFFFFF]'}`}>
                            {conversation.fullName}
                        </p>
                        {/* Online Status Text */}
                        {isOnline && (
                            <div className='flex items-center gap-1 text-[#00FF99] text-xs font-mono'>
                                <FaCircle className='text-[6px]' />
                                <span className='hidden md:inline'>Online</span>
                            </div>
                        )}
                    </div>
                    {/* Username - Monospace */}
                    <p className='text-[#999999] text-xs font-mono truncate mt-0.5'>
                        @{conversation.username}
                    </p>
                </div>

                {/* Friend Button */}
                <div className='flex-shrink-0' onClick={(e) => e.stopPropagation()}>
                    {isFriend ? (
                        <div className='flex items-center gap-1.5 text-[#00FF99] text-xs font-mono'>
                            <FaUserCheck className='text-sm' />
                            <span className='hidden md:inline'>Friend</span>
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