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
    <form className='px-4 my-3 grid grid-cols-[96%,4%] items-center gap-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type="text" className='border text-sm rounded-lg block w-full p-2.5 bg-[var(--background)] border-[var(--secondary)] text-[var(--text)] font-bold' 
            placeholder='Type...'
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            />
        </div>

            <button type='submit' className='h-[5vh] w-[5vh] bg-[var(--primary)] flex items-center justify-center rounded-lg'>
              {loading?<div className='loading loading-spinner'>
              </div>:
              <IoSend className="text-[var(--text)] h-[3vh] w-[3vh] hover:text-[var(--background4)] transition duration-300 ml-1" />}
            </button>
    </form>
  )
}

export default MessageInput
