import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { FaPhone, FaCamera } from "react-icons/fa6";

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
    <div className='flex flex-col h-full' >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='bg-[var(--primary)] px-4 py-4 mb-2 grid grid-cols-[90%,5%,5%] rounded-tr-xl'>
            <div className='flex items-center'> 
              <div className='avatar w-[5vh] h-[5vh] mr-4'>
                <img
                  src={recipientInfo?.profilePic}
                  alt={`${recipientInfo?.name}'s profile`}
                  className='bg-white rounded-lg'
                />
              </div>
              <span className='text-[var(--text)] font-bold'>{recipientInfo?.name}</span>
            </div>
            
            <div className='h-[5vh] w-[5vh] bg-[var(--background)] flex items-center justify-center rounded-lg'>
              <FaPhone className="text-[var(--text)] h-[3vh] w-[3vh] hover:text-[var(--primary)] transition duration-300 ml-1" />
            </div>
            
            <div className='h-[5vh] w-[5vh] bg-[var(--background)] flex items-center justify-center rounded-lg'>
              <FaCamera className="text-[var(--text)] h-[3vh] w-[3vh] hover:text-[var(--primary)] transition duration-300 ml-1" />
            </div>
          
          </div>
          <div className='flex-1 overflow-y-auto'>
            <Messages />
          </div>
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
        <p className='sm:text-lg md:text-xl'>Welcome {authUser.fullName}</p>
        <p className='sm:text-lg md:text-xl'>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
}

export default MessageContainer;