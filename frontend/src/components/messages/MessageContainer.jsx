import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const getRecipientInfo = () => {
    if (!selectedConversation) return null;
    
    if (selectedConversation.username) {
      return {
        name: selectedConversation.fullName || selectedConversation.username,
        username: selectedConversation.username,
        profilePic: selectedConversation.profilePic
      };
    }
    
    return {
      name: selectedConversation.fullName || 'Unknown User',
      username: selectedConversation.username || 'unknown',
      profilePic: selectedConversation.profilePic
    };
  };

  const recipientInfo = getRecipientInfo();

  if (!selectedConversation) {
    return (
      <div className='flex flex-col h-full bg-gradient-to-br from-green-900/20 to-teal-900/30 backdrop-blur-sm'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center p-8'>
            <div className='w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50'>
              <TiMessages className='text-white text-3xl' />
            </div>
            <h2 className='text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-2'>
              Welcome {authUser.fullName}
            </h2>
            <p className='text-base text-green-300'>Select a friend to start messaging</p>
            <div className='flex justify-center space-x-2 mt-4'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:0.2s]'></div>
              <div className='w-2 h-2 bg-green-300 rounded-full animate-pulse [animation-delay:0.4s]'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full bg-gradient-to-br from-green-900/20 to-teal-900/30 backdrop-blur-sm'>
      {/* Header */}
      <div className='bg-gradient-to-r from-green-500 to-teal-500 shadow-green-500/30 p-4 border-b border-green-500/20 flex-shrink-0'>
        <div className='flex items-center justify-end gap-3'>
          <div className='flex-1 min-w-0 text-right'>
            <h3 className='text-white font-semibold truncate'>{recipientInfo?.name}</h3>
            <p className='text-green-100 text-sm truncate'>@{recipientInfo?.username}</p>
          </div>
          <div className='w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden shadow-lg shadow-green-500/30'>
            {recipientInfo?.profilePic ? (
              <img 
                src={recipientInfo.profilePic} 
                alt={recipientInfo.name}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-white/20 flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>
                  {recipientInfo?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className='flex-1 min-h-0'>
        <Messages />
      </div>

      {/* Message Input */}
      <div className='p-4 border-t border-green-500/20 flex-shrink-0'>
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageContainer;