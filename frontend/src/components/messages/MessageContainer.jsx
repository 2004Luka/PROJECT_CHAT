import React, { useEffect,useState } from 'react'
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
                    src={selectedConversation.profilePic}
                    alt={`${selectedConversation.fullName}'s profile`}
                    className='bg-white rounded-lg'
                  />
                </div>
              <span className='text-[var(--text)] font-bold'>{selectedConversation.fullName}</span>
            </div>
            
            

            <div className='h-[5vh] w-[5vh] bg-[var(--background)] flex items-center justify-center rounded-lg'>
              <img src="../src/assets/phone-call.png" className='h-[3vh]'/>
            </div>
            
            <div className='h-[5vh] w-[5vh] bg-[var(--background)] flex items-center justify-center rounded-lg'>
              <img src="../src/assets/video-camera.png" className='h-[3vh]'/>
            </div>
          
          </div>
          <div className='flex-1 overflow-y-auto'>
            <Messages />
          </div>
          <div className='mt-auto w-full grid grid-cols-[96%,4%] items-center'>
            <MessageInput />
            
            <div className='h-[5vh] w-[5vh] bg-[var(--primary)] flex items-center justify-center rounded-lg'>
              <img src="../src/assets/send.png" className='h-[3vh]'/>
            </div>

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
