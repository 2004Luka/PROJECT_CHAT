import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
import getProfilePic from '../../utils/getProfilePic';
import { FaReply, FaRegHeart } from 'react-icons/fa';

import FileAttachment from './subcomponents/FileAttachment';
import ImageMessage from './subcomponents/ImageMessage';
import CodeBlock from './subcomponents/CodeBlock';

const Message = ({ message, isReply = false, parentMessage = null }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const [isHovered, setIsHovered] = useState(false);

  const fromMe = message.senderId === authUser._id;
  const profilePicUrl = getProfilePic(fromMe ? authUser.profilePic : selectedConversation?.profilePic);
  const senderName = fromMe ? authUser.fullName || authUser.username : selectedConversation?.fullName || selectedConversation?.username || 'Unknown';
  const formattedTime = extractTime(message.createdAt);

  const hasCodeBlock = message.message.includes('```');
  const hasImage = message.message.includes('[Image:') || message.imageUrl;
  const hasFile = message.fileUrl && !message.imageUrl;
  
  // Extract image URLs from message text
  const extractImages = (text) => {
    const imageMatches = text.match(/\[Image:([^\]]+)\]/g) || [];
    return imageMatches;
  };

  const renderMessageContent = () => {
    if (hasFile) return <FileAttachment message={message} />;
    
    if (message.imageUrl) return <ImageMessage imageUrl={message.imageUrl} text={message.message} />;

    const imageRefs = extractImages(message.message);
    if (imageRefs.length > 0 && !hasCodeBlock) {
      const parts = message.message.split(/(\[Image:[^\]]+\])/g);
      return (
        <div className='space-y-2'>
          {parts.map((part, idx) => {
            if (part.startsWith('[Image:')) {
              const filename = part.match(/\[Image:([^\]]+)\]/)?.[1];
              return (
                <div key={idx} className='p-2 bg-[#1E1E1E] border border-[#333333] rounded text-xs text-[#999999] font-mono'>
                  📷 {filename || 'Image'}
                </div>
              );
            }
            if (part.trim()) {
              return <span key={idx} className='text-[#FFFFFF] whitespace-pre-wrap break-words block'>{part}</span>;
            }
            return null;
          })}
        </div>
      );
    }

    if (!hasCodeBlock) {
      return <span className='text-[#FFFFFF] whitespace-pre-wrap break-words'>{message.message}</span>;
    }

    const parts = message.message.split(/(```[\s\S]*?```)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeContent = part.slice(3, -3).trim();
        const lines = codeContent.split('\n');
        const firstLine = lines[0];
        const language = /^[a-zA-Z]+/.test(firstLine) ? firstLine.split(/\s/)[0] : null;
        const actualCode = language ? lines.slice(1).join('\n') : codeContent;

        return <CodeBlock key={idx} code={actualCode} language={language} />;
      }
      return <span key={idx} className='text-[#FFFFFF] whitespace-pre-wrap break-words'>{part}</span>;
    });
  };

  return (
    <div 
      className={`flex ${fromMe ? 'justify-end' : 'justify-start'} mb-4 group relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isReply && !fromMe && (
        <div className='absolute left-8 top-0 bottom-0 w-px bg-[#333333]' style={{ height: 'calc(100% + 0.5rem)' }} />
      )}
      {isReply && fromMe && (
        <div className='absolute right-8 top-0 bottom-0 w-px bg-[#333333]' style={{ height: 'calc(100% + 0.5rem)' }} />
      )}

      <div className={`flex items-start gap-3 max-w-[75%] ${fromMe ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className='w-8 h-8 flex-shrink-0 border border-[#333333] overflow-hidden bg-[#111111]'>
          <img
            alt='User avatar'
            src={profilePicUrl}
            className='w-full h-full object-cover'
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              if (e.target.nextElementSibling) {
                e.target.nextElementSibling.style.display = 'flex';
              }
            }}
          />
          <div className='w-full h-full hidden items-center justify-center text-[#00FF99] text-xs font-mono font-semibold'>
            {senderName.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className={`flex flex-col ${fromMe ? 'items-end' : 'items-start'} flex-1 min-w-0`}>
          <div className={`flex items-center gap-2 mb-1 ${fromMe ? 'flex-row-reverse' : 'flex-row'} ${isHovered ? 'opacity-100' : 'opacity-60'} transition-opacity`}>
            <span className='text-xs text-[#999999] font-mono font-medium'>{senderName}</span>
            <time className='text-xs text-[#666666] font-mono'>{formattedTime}</time>
          </div>

          <div 
            className={`
              max-w-full px-4 py-2.5 text-sm leading-relaxed break-words
              border transition-all duration-200
              ${fromMe 
                ? 'bg-[#111111] text-[#FFFFFF] border-[#333333]' 
                : 'bg-[#111111] text-[#FFFFFF] border-[#333333]'
              }
              ${isHovered ? 'border-[#00FF99]' : ''}
            `}
          >
            {renderMessageContent()}
          </div>

          <div className={`flex items-center gap-2 mt-1 ${fromMe ? 'flex-row-reverse' : 'flex-row'} ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
            <button 
              className='p-1.5 text-[#999999] hover:text-[#00FF99] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors'
              title='Reply'
            >
              <FaReply className='w-3.5 h-3.5' />
            </button>
            <button 
              className='p-1.5 text-[#999999] hover:text-[#00FF99] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors'
              title='React'
            >
              <FaRegHeart className='w-3.5 h-3.5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
