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
              className='w-full h-12 pr-12 rounded-xl px-4 text-white placeholder-green-300 bg-green-500/5 backdrop-blur-sm border border-green-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent' 
              placeholder='Type your message...'
              value={message}
              onChange={(e)=> setMessage(e.target.value)}
            />
        </div>

        <button 
          type='submit' 
          className='h-12 w-12 flex items-center justify-center rounded-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-500 to-teal-500 shadow-green-500/30'
          disabled={loading || !message.trim()}
        >
          {loading ? (
            <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
          ) : (
            <IoSend className="text-white h-5 w-5" />
          )}
        </button>
    </form>
  )
}

export default MessageInput
