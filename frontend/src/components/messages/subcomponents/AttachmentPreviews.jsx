import React from 'react';
import { FaPaperclip, FaTimes } from 'react-icons/fa';

const AttachmentPreviews = ({ selectedFile, removeFile, selectedImages, removeImage }) => {
  return (
    <>
      {/* Selected File Preview */}
      {selectedFile && (
        <div className='px-2'>
          <div className='p-2 bg-[#111111] border border-[#333333] rounded flex items-center justify-between group'>
            <div className='flex items-center gap-2 flex-1 min-w-0'>
              <FaPaperclip className='text-[#00FF99] flex-shrink-0' />
              <div className='flex-1 min-w-0'>
                <p className='text-[#FFFFFF] text-xs font-mono truncate'>{selectedFile.name}</p>
                <p className='text-[#999999] text-xs font-mono'>
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              type='button'
              onClick={removeFile}
              className='p-1 text-[#999999] hover:text-[#FF4444] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors'
              title='Remove file'
            >
              <FaTimes className='w-3 h-3' />
            </button>
          </div>
        </div>
      )}

      {/* Selected Images Preview */}
      {selectedImages.length > 0 && (
        <div className='px-2 flex gap-2 overflow-x-auto'>
          {selectedImages.map((image) => (
            <div key={image.id} className='relative flex-shrink-0 group'>
              <img
                src={image.preview}
                alt={image.name}
                className='w-20 h-20 object-cover border border-[#333333] rounded'
              />
              <button
                type='button'
                onClick={() => removeImage(image.id)}
                className='absolute -top-1 -right-1 p-1 bg-[#FF4444] text-[#FFFFFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                title='Remove image'
              >
                <FaTimes className='w-2.5 h-2.5' />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AttachmentPreviews;
