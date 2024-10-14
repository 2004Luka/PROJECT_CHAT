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
    
    // If it's a friend (has username property)
    if (selectedConversation.username) {
      return {
        profilePic: selectedConversation.profilePic,
        name: selectedConversation.fullName || selectedConversation.username,
      };
    }
    
    // If it's a conversation
    const recipientId = selectedConversation.participants.find(id => id !== authUser._id);
    const recipient = selectedConversation.participants.find(p => p._id === recipientId);
    return {
      profilePic: recipient?.profilePic,
      name: recipient?.fullName || recipient?.username,
    };
  };

  const recipientInfo = getRecipientInfo();

  return (
    <div className='flex flex-col h-full w-full bg-[var(--background4)]'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='bg-[var(--primary)] px-4 py-4 mb-2 rounded-tr-xl overflow-hidden'>
            <div className='flex items-center'>
              <div className='avatar w-[5vh] h-[5vh] mr-4'>
                <img
                  src={recipientInfo?.profilePic}
                  alt={`${recipientInfo?.name}'s profile`}
                  className='bg-white rounded-lg object-cover w-full h-full'
                />
              </div>
              <span className='text-[var(--text)] font-bold text-base md:text-lg'>
                {recipientInfo?.name}
              </span>
            </div>
          </div>

          {/* Messages Section */}
          <div className='flex-1 overflow-y-auto bg-[var(--background4)]'>
            <Messages />
          </div>

          {/* Message Input Section */}
          <div className='mt-auto w-full'>
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className='flex items-center justify-center w-full h-full p-4'>
      <div className='text-center text-[var(--secondary)] font-semibold flex flex-col items-center gap-2'>
        <p className='text-base md:text-lg'>Welcome {authUser.fullName}</p>
        <p className='text-base md:text-lg'>Select a chat to start messaging</p>
        <TiMessages className='text-4xl md:text-6xl text-center' />
      </div>
    </div>
  );
}

export default MessageContainer;
