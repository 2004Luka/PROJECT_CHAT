import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';
import useConversation from '../../zustand/useConversation';

const Messages = () => {
  const {messages,loading}=useGetMessages();
  const {selectedConversation} = useConversation();
  useListenMessages();
  const lastMessageRef = useRef();
  const messagesEndRef = useRef();
  const scrollContainerRef = useRef();

  // Function to scroll to bottom
  const scrollToBottom = (behavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
    } else if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when messages change (new messages)
  useEffect(()=>{
    if (messages.length > 0) {
      const timer = setTimeout(()=>{
        scrollToBottom("smooth")
      }, 100)
      return () => clearTimeout(timer)
    }
  },[messages])

  // Scroll to bottom when conversation changes or when loading finishes
  useEffect(() => {
    if (selectedConversation && !loading) {
      const timer = setTimeout(() => {
        scrollToBottom("smooth")
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [selectedConversation, loading])

  // Force scroll to bottom when messages are loaded for the first time
  useEffect(() => {
    if (!loading && messages.length > 0) {
      const timer = setTimeout(() => {
        scrollToBottom("smooth")
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [loading, messages.length])

  return (
    <div className='h-full flex flex-col'>
      <div ref={scrollContainerRef} className='flex-1 overflow-y-auto px-4 py-4'>
        {loading ? (
          <div className='space-y-4'>
            {[...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
          </div>
        ) : messages.length > 0 ? (
          <div className='space-y-4'>
            {messages.map((message)=>(
              <div key={message._id}
                ref={lastMessageRef}
              >
                <Message message={message}/>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className='flex items-center justify-center h-full'>
            <p className='text-center text-green-300'>send a message to start conversation</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
