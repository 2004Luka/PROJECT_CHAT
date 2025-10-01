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
      <div className='flex flex-col h-full bg-white/5 backdrop-blur-xl'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center p-8'>
            <div className='w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center border border-white/10'>
              <TiMessages className='text-white text-3xl' />
            </div>
            <h2 className='text-2xl font-bold text-white mb-2'>
              Welcome {authUser.fullName}
            </h2>
            <p className='text-base text-white/70'>Select a friend to start messaging</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full bg-white/5 backdrop-blur-xl'>
      {/* Header */}
      <div className='p-4 border-b border-white/10 flex-shrink-0'>
        <div className='flex items-center justify-end gap-3'>
          <div className='flex-1 min-w-0 text-right'>
            <h3 className='text-white font-semibold truncate'>{recipientInfo?.name}</h3>
            <p className='text-white/70 text-sm truncate'>@{recipientInfo?.username}</p>
          </div>
          <div className='w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden'>
            {recipientInfo?.profilePic ? (
              <img 
                src={recipientInfo.profilePic} 
                alt={recipientInfo.name}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-white/10 flex items-center justify-center'>
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
      <div className='p-4 border-t border-white/10 flex-shrink-0'>
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageContainer;