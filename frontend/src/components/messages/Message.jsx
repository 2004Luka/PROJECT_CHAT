import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
import { FaReply, FaRegHeart, FaCopy, FaPaperclip } from 'react-icons/fa';

const Message = ({ message, isReply = false, parentMessage = null }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const fromMe = message.senderId === authUser._id;
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const senderName = fromMe ? authUser.fullName || authUser.username : selectedConversation?.fullName || selectedConversation?.username || 'Unknown';
  const formattedTime = extractTime(message.createdAt);

  const hasCodeBlock = message.message.includes('```');
  const hasImage = message.message.includes('[Image:') || message.imageUrl;
  const hasFile = message.fileUrl && !message.imageUrl;
  
  // Extract image URLs from message text (format: [Image: filename] or direct URL)
  const extractImages = (text) => {
    const imageMatches = text.match(/\[Image:([^\]]+)\]/g) || [];
    return imageMatches;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const renderMessageContent = () => {
    // If message has file attachment (non-image)
    if (hasFile) {
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
    }

    // If message has image URL (from backend)
    if (message.imageUrl) {
      return (
        <div className='space-y-2'>
          <div className='relative group/image'>
            <img 
              src={message.imageUrl} 
              alt='Shared image' 
              className='max-w-full max-h-96 rounded border border-[#333333] object-contain cursor-pointer hover:border-[#00FF99] transition-colors'
              onClick={() => window.open(message.imageUrl, '_blank')}
            />
          </div>
          {message.message && message.message.trim() && (
            <span className='text-[#FFFFFF] whitespace-pre-wrap break-words block'>{message.message}</span>
          )}
        </div>
      );
    }

    // Check for image references in text
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

        return (
          <div key={idx} className='mt-2 mb-2 relative group/code'>
            <div className='bg-[#111111] border border-[#333333] rounded p-4 relative'>
              {language && (
                <div className='text-xs text-[#999999] font-mono mb-2 pb-2 border-b border-[#333333]'>
                  {language}
                </div>
              )}
              <pre className='overflow-x-auto'>
                <code className='text-[#FFFFFF] font-mono text-sm leading-relaxed'>
                  {actualCode.split('\n').map((line, lineIdx) => {
                    // Simple syntax highlighting
                    const highlighted = line
                      .replace(/(const|let|var|function|if|else|return|class|import|export|from|default)/g, '<span class="text-[#00FF99]">$1</span>')
                      .replace(/(["'`])((?:(?=(\\?))\3.)*?)\1/g, '<span class="text-[#FFFFFF]">$1$2$1</span>')
                      .replace(/(\/\/.*$)/gm, '<span class="text-[#666666]">$1</span>');
                    return (
                      <div key={lineIdx} dangerouslySetInnerHTML={{ __html: highlighted || ' ' }} />
                    );
                  })}
                </code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(actualCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className='absolute top-2 right-2 p-1.5 text-[#999999] hover:text-[#00FF99] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors opacity-0 group-hover/code:opacity-100'
                title='Copy code'
              >
                <FaCopy className='w-3.5 h-3.5' />
              </button>
              {copied && (
                <div className='absolute top-2 right-10 text-xs text-[#00FF99] font-mono bg-[#111111] px-2 py-1 border border-[#00FF99] rounded'>
                  Copied!
                </div>
              )}
            </div>
          </div>
        );
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
          {profilePic ? (
            <img
              alt='User avatar'
              src={profilePic}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-[#00FF99] text-xs font-mono font-semibold'>
              {senderName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className={`flex flex-col ${fromMe ? 'items-end' : 'items-start'} flex-1 min-w-0`}>
          <div className={`flex items-center gap-2 mb-1 ${fromMe ? 'flex-row-reverse' : 'flex-row'} ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
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
