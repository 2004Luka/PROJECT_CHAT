import React from 'react'
import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
const Message = ({message}) => {
  const {authUser}=useAuthContext();
  const {selectedConversation}=useConversation();

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe? 'chat-end':'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubbleBgColor = fromMe? 'bg-gradient-to-r from-green-500 to-teal-600': "bg-teal-900/30";
  const formattedTime = extractTime(message.createdAt);


  return (
    <div className={`flex ${fromMe ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in-up`}>
        <div className={`flex items-end gap-2 max-w-[70%] ${fromMe ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className='w-8 h-8 flex-shrink-0 rounded-full border-2 border-green-500/30 shadow-lg shadow-green-500/30'>
                <img
                    alt='User avatar'
                    src={profilePic}
                    className='w-full h-full rounded-full object-cover'
                />
            </div>
            <div className='flex flex-col'>
                <div 
                  className={`max-w-full px-4 py-2 rounded-2xl text-sm font-medium animate-fade-in-up ${
                    fromMe 
                      ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-br-md' 
                      : 'bg-teal-900/30 text-teal-100 border border-teal-500/20 rounded-bl-md'
                  }`}
                >
                    {message.message}
                </div>
                <time className={`text-xs text-teal-400 mt-1 ${fromMe ? 'text-right' : 'text-left'}`}>
                    {formattedTime}
                </time>
            </div>
        </div>
    </div>
  )
}

export default Message
