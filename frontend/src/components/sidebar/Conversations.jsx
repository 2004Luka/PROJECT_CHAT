import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';
import { FaComments, FaSpinner } from 'react-icons/fa';

const Conversations = () => {
  const {loading,conversations}=useGetConversations();

  return (
    <div className='flex flex-col h-full'>
      {/* Header */}
      <div className='flex items-center gap-2 mb-4 pb-2 border-b border-green-500/20'>
        <FaComments className='text-green-400 text-lg' />
        <h3 className='text-green-300 font-semibold'>People ({conversations.length})</h3>
      </div>

      {/* Conversations List */}
      <div className='flex-1 overflow-y-auto space-y-2'>
        {conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        ))}
        
        {loading && (
          <div className='flex flex-col items-center justify-center py-8'>
            <FaSpinner className='text-green-400 text-2xl animate-spin mb-2' />
            <p className='text-green-300 text-sm'>Loading people...</p>
          </div>
        )}
        
        {!loading && conversations.length === 0 && (
          <div className='text-center py-8'>
            <FaComments className='text-green-400/50 text-4xl mx-auto mb-3' />
            <p className='text-green-300 text-lg font-medium'>No people found</p>
            <p className='text-green-400/70 text-sm mt-1'>Add friends to start chatting!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Conversations