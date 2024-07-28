import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  return (
    <div className='flex flex-col h-full'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='bg-[var(--secondary)] px-4 py-2 mb-2'>
            <span className='label-text text-[var(--text-2)]'>To:</span>{" "}
            <span className='text-[var(--text-2)] font-bold'>{selectedConversation.fullName}</span>
          </div>
          <div className='flex-1 overflow-y-auto'>
            <Messages />
          </div>
          <div className='mt-auto'>
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
