import React, { useState, useRef, useCallback } from 'react'
import useSendMessage from '../../hooks/useSendMessage';
import { IoSend } from "react-icons/io5";
import { FaPaperclip, FaCode, FaSmile, FaImage, FaTimes } from 'react-icons/fa';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { loading, sendMessage } = useSendMessage();
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && selectedImages.length === 0 && !selectedFile) return;
    
    setUploading(true);
    
    try {
      // Get image files
      const imageFiles = selectedImages.map(img => img.file);
      
      // Send message with images and/or file
      await sendMessage(message, imageFiles, selectedFile);
      
      // Clean up
      selectedImages.forEach(img => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
      setMessage("");
      setSelectedImages([]);
      setSelectedFile(null);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const insertCodeBlock = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = message.substring(start, end);
    const codeBlock = selectedText ? `\`\`\`\n${selectedText}\n\`\`\`` : '```\n\n```';
    
    const newMessage = message.substring(0, start) + codeBlock + message.substring(end);
    setMessage(newMessage);
    
    // Set cursor position after the opening ```
    setTimeout(() => {
      const newPosition = start + (selectedText ? 4 : 4);
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's an image - if so, use image handler
      if (file.type.startsWith('image/')) {
        const imageEvent = { target: { files: [file] } };
        handleImageSelect(imageEvent);
        return;
      }
      
      // For non-image files, store it
      setSelectedFile({
        id: Date.now(),
        file,
        name: file.name,
        size: file.size,
        type: file.type
      });
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      const newImages = imageFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        preview: URL.createObjectURL(file),
        size: file.size
      }));
      setSelectedImages(prev => [...prev, ...newImages]);
    }
    
    // Reset input
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const removeImage = (imageId) => {
    setSelectedImages(prev => {
      const image = prev.find(img => img.id === imageId);
      if (image && image.preview) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== imageId);
    });
  };

  const insertEmoji = useCallback((emoji) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const emojiText = emoji.native || emoji;
    
    const newMessage = message.substring(0, start) + emojiText + message.substring(end);
    setMessage(newMessage);
    
    // Set cursor position after emoji
    setTimeout(() => {
      const newPosition = start + emojiText.length;
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
    
    setShowEmojiPicker(false);
  }, [message]);

  // Close emoji picker when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
      {/* Toolbar with icon buttons */}
      <div className='flex items-center gap-2 px-2'>
        <button
          type='button'
          onClick={handleFileAttach}
          className='p-2 text-[#999999] hover:text-[#00FF99] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors'
          title='Attach file'
        >
          <FaPaperclip className='w-4 h-4' />
        </button>
        <input
          ref={fileInputRef}
          type='file'
          className='hidden'
          onChange={handleFileChange}
          accept='*/*'
        />
        
        <button
          type='button'
          onClick={() => imageInputRef.current?.click()}
          className='p-2 text-[#999999] hover:text-[#00FF99] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors'
          title='Add image'
        >
          <FaImage className='w-4 h-4' />
        </button>
        <input
          ref={imageInputRef}
          type='file'
          accept='image/*'
          multiple
          className='hidden'
          onChange={handleImageSelect}
        />
        
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
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
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
          disabled={loading || uploading || (!message.trim() && selectedImages.length === 0 && !selectedFile)}
          title='Send message (Enter)'
        >
          {(loading || uploading) ? (
            <div className='w-4 h-4 border-2 border-[#1E1E1E]/30 border-t-[#1E1E1E] rounded-full animate-spin'></div>
          ) : (
            <IoSend className='w-4 h-4' />
          )}
        </button>
      </div>

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

      {/* Emoji picker */}
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className='px-2 pb-2 relative z-50'>
          <div className='bg-[#111111] border border-[#333333] rounded overflow-hidden'>
            <Picker
              data={data}
              onEmojiSelect={insertEmoji}
              theme='dark'
              previewPosition='none'
              skinTonePosition='none'
            />
          </div>
        </div>
      )}

      {/* Text input area */}
      <div className='relative'>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='Type your message... (Markdown supported, Shift+Enter for new line)'
          className='w-full min-h-[60px] max-h-[200px] px-4 py-3 pr-12 bg-[#111111] text-[#FFFFFF] placeholder:text-[#666666] border border-[#333333] focus:outline-none focus:border-[#00FF99] transition-colors resize-none font-mono text-sm leading-relaxed'
          style={{ height: '60px' }}
        />
        <div className='absolute bottom-2 right-2 text-xs text-[#666666] font-mono pointer-events-none'>
          {message.length > 0 && `${message.length} chars`}
        </div>
      </div>
    </form>
  )
}

export default MessageInput
