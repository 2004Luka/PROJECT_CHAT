import React from 'react';
import { FaPaperclip } from 'react-icons/fa';

const FileAttachment = ({ message }) => {
  return (
    <div className='space-y-2'>
      <a
        href={message.fileUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-3 p-3 bg-[#1E1E1E] border border-[#333333] rounded hover:border-[#00FF99] transition-colors group'
      >
        <FaPaperclip className='text-[#00FF99] flex-shrink-0' />
        <div className='flex-1 min-w-0'>
          <p className='text-[#FFFFFF] text-sm font-mono truncate'>{message.fileName || 'File'}</p>
          <p className='text-[#999999] text-xs font-mono'>{message.fileType || 'Unknown type'}</p>
        </div>
        <span className='text-[#00FF99] text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity'>
          Download
        </span>
      </a>
      {message.message && message.message.trim() && (
        <span className='text-[#FFFFFF] whitespace-pre-wrap break-words block'>{message.message}</span>
      )}
    </div>
  );
};

export default FileAttachment;
