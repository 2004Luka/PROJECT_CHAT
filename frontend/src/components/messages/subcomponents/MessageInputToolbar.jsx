import React from 'react';
import { FaPaperclip, FaImage, FaCode, FaSmile } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

const MessageInputToolbar = ({ 
  handleFileAttach, 
  handleImageAttach, 
  insertCodeBlock, 
  toggleEmojiPicker, 
  showEmojiPicker, 
  loading, 
  uploading, 
  canSend 
}) => {
  return (
    <div className='flex items-center gap-2 px-2'>
      <button
        type='button'
        onClick={handleFileAttach}
        className='p-2 text-[#999999] hover:text-[#00FF99] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors'
        title='Attach file'
      >
        <FaPaperclip className='w-4 h-4' />
      </button>

      <button
        type='button'
        onClick={handleImageAttach}
        className='p-2 text-[#999999] hover:text-[#00FF99] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors'
        title='Add image'
      >
        <FaImage className='w-4 h-4' />
      </button>

      <button
        type='button'
        onClick={insertCodeBlock}
        className='p-2 text-[#999999] hover:text-[#00FF99] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors'
        title='Insert code block'
      >
        <FaCode className='w-4 h-4' />
      </button>

      <button
        type='button'
        onClick={toggleEmojiPicker}
        className={`p-2 hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors ${
          showEmojiPicker ? 'text-[#00FF99] bg-[#2A2A2A]' : 'text-[#999999] hover:text-[#00FF99]'
        }`}
        title='Add emoji'
      >
        <FaSmile className='w-4 h-4' />
      </button>

      <div className='flex-1' />

      <button
        type='submit'
        className='p-2 text-[#1E1E1E] bg-[#00FF99] hover:bg-[#00E689] border border-[#00FF99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00FF99] transition-colors rounded'
        disabled={!canSend || loading || uploading}
        title='Send message (Enter)'
      >
        {(loading || uploading) ? (
          <div className='w-4 h-4 border-2 border-[#1E1E1E]/30 border-t-[#1E1E1E] rounded-full animate-spin'></div>
        ) : (
          <IoSend className='w-4 h-4' />
        )}
      </button>
    </div>
  );
};

export default MessageInputToolbar;
