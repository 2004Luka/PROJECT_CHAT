import React from 'react';

const ImageMessage = ({ imageUrl, text }) => {
  return (
    <div className='space-y-2'>
      <div className='relative group/image'>
        <img 
          src={imageUrl} 
          alt='Shared image' 
          className='max-w-full max-h-96 rounded border border-[#333333] object-contain cursor-pointer hover:border-[#00FF99] transition-colors'
          onClick={() => window.open(imageUrl, '_blank')}
        />
      </div>
      {text && text.trim() && (
        <span className='text-[#FFFFFF] whitespace-pre-wrap break-words block'>{text}</span>
      )}
    </div>
  );
};

export default ImageMessage;
