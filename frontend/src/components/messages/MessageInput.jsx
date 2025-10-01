import React, { useState } from 'react'
import { BsSendFill } from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';


import { IoSend } from "react-icons/io5";
const MessageInput = () => {
  const [message,setMessage]=useState("");
  const {loading,sendMessage}=useSendMessage();


  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className='flex flex-row items-center gap-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input 
              type="text" 
              className='w-full h-12 pr-12 rounded-xl px-4 text-white placeholder-white/50 bg-white/5 backdrop-blur-sm border border-white/10 focus:outline-none focus:ring-0' 
              placeholder='Type your message...'
              value={message}
              onChange={(e)=> setMessage(e.target.value)}
            />
        </div>

        <button 
          type='submit' 
          className='h-12 w-12 flex items-center justify-center rounded-xl disabled:opacity-50 disabled:cursor-not-allowed bg-white/10 border border-white/10'
          disabled={loading || !message.trim()}
        >
          {loading ? (
            <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full'></div>
          ) : (
            <IoSend className="text-white h-5 w-5" />
          )}
        </button>
    </form>
  )
}

export default MessageInput
