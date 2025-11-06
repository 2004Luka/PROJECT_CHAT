import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';
import { FaComments, FaSpinner } from 'react-icons/fa';

const Conversations = () => {
  const {loading,conversations}=useGetConversations();

  return (
    <div className='flex flex-col h-full'>
      {/* Header - High-contrast design */}
      <div className='flex items-center gap-3 mb-4 pb-3 border-b border-[#333333]'>
        <FaComments className='text-[#00FF99] text-sm' />
        <h3 className='text-[#FFFFFF] font-semibold text-sm font-mono'>People ({conversations.length})</h3>
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
          <div className='flex flex-col items-center justify-center py-12'>
            <FaSpinner className='text-[#00FF99] text-xl mb-3 animate-spin' />
            <p className='text-[#999999] text-xs font-mono'>Loading people...</p>
          </div>
        )}
        
        {!loading && conversations.length === 0 && (
          <div className='text-center py-12'>
            <div className='w-12 h-12 mx-auto mb-4 bg-[#111111] border border-[#333333] flex items-center justify-center'>
              <FaComments className='text-[#666666] text-xl' />
            </div>
            <p className='text-[#FFFFFF] font-semibold text-sm mb-1 font-mono'>No people found</p>
            <p className='text-[#999999] text-xs font-mono'>Add friends to start chatting!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Conversations