import React, { useState } from 'react';
import LogoutButton from './LogoutButton';
import FriendList from './FriendList';
import { FaUserFriends, FaComments, FaTimes } from "react-icons/fa";
import FriendRequestsSidebar from './sidebars/FriendRequestsSidebar.jsx'; 
import ConversationsSidebar from './sidebars/ConversationsSidebar.jsx'; 

const Sidebar = ({ onClose }) => {
  const [isFriendRequestsOpen, setIsFriendRequestsOpen] = useState(false);
  const [isConversationsOpen, setIsConversationsOpen] = useState(false);

  const toggleFriendRequests = () => {
    setIsFriendRequestsOpen(!isFriendRequestsOpen);
  };

  const toggleConversations = () => {
    setIsConversationsOpen(!isConversationsOpen);
  };

  return (
    <div className='flex flex-col h-full w-full bg-[#1E1E1E]'>
      {/* Header - High-contrast dark mode */}
      <div className='p-4 text-center border-b border-[#333333] relative bg-[#1E1E1E]'>
        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className='absolute top-3 right-3 p-2 text-[#CCCCCC] hover:text-[#FFFFFF] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors'
          >
            <FaTimes className='w-4 h-4' />
          </button>
        )}
        <h2 className='text-xl font-bold text-[#FFFFFF] mb-1 leading-tight tracking-tight'>
          <span className='text-[#00FF99] font-mono'>CS</span>
          <span className='text-[#FFFFFF] ml-1 font-mono'>Chat</span>
        </h2>
        <p className='text-xs text-[#999999] font-mono mt-1'>Developer Tools</p>
      </div>

      {/* Action Buttons - High-contrast design */}
      <div className='p-4 border-b border-[#333333] bg-[#1E1E1E]'>
        <div className='grid grid-cols-2 gap-2'>
          <button
            onClick={toggleFriendRequests}
            className={`flex items-center justify-center gap-2 p-3 border transition-all duration-200 focus:outline-none ${
              isFriendRequestsOpen 
                ? 'bg-[#111111] border-[#00FF99] text-[#00FF99]' 
                : 'bg-[#1E1E1E] border-[#333333] text-[#CCCCCC] hover:border-[#00FF99] hover:text-[#00FF99]'
            }`}
          >
            <FaUserFriends className='text-sm' />
            <span className='text-xs font-mono font-medium'>Requests</span>
          </button>

          <button
            onClick={toggleConversations}
            className={`flex items-center justify-center gap-2 p-3 border transition-all duration-200 focus:outline-none ${
              isConversationsOpen 
                ? 'bg-[#111111] border-[#00FF99] text-[#00FF99]' 
                : 'bg-[#1E1E1E] border-[#333333] text-[#CCCCCC] hover:border-[#00FF99] hover:text-[#00FF99]'
            }`}
          >
            <FaComments className='text-sm' />
            <span className='text-xs font-mono font-medium'>People</span>
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className='flex-1 flex flex-col min-h-0 p-4'>
        <LogoutButton />
        <div className='flex-1 min-h-0 mt-4'>
          <FriendList />
        </div>
      </div>

      {/* Sidebar Modals */}
      <FriendRequestsSidebar 
        isOpen={isFriendRequestsOpen} 
        toggle={toggleFriendRequests} 
      />
      <ConversationsSidebar 
        isOpen={isConversationsOpen} 
        toggle={toggleConversations} 
      />
    </div>
  );
};

export default Sidebar;