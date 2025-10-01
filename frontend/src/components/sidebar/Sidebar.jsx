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
    <div className='flex flex-col h-full w-full bg-white/10 backdrop-blur-2xl'>
      {/* Header with CS-themed title */}
      <div className='p-4 sm:p-6 text-center border-b border-white/10 relative'>
        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className='absolute top-4 right-4 p-2 text-white rounded-lg bg-white/10 backdrop-blur-xl border border-white/10 sm:hidden'
          >
            <FaTimes className='w-4 h-4' />
          </button>
        )}
        <h2 className='text-xl sm:text-2xl font-bold text-white mb-2'>CS Chat</h2>
        <div className='h-px bg-white/10'></div>
      </div>

      {/* Action Buttons */}
      <div className='p-4 sm:p-6 border-b border-white/10'>
        <div className='grid grid-cols-2 gap-2 sm:gap-3'>
          <button
            onClick={toggleFriendRequests} 
            className='flex items-center justify-center gap-2 bg-white/10 text-white p-3 rounded-xl border border-white/10 group'
          >
            <FaUserFriends className='text-sm sm:text-lg' />
            <span className='text-xs sm:text-sm font-medium'>Requests</span>
          </button>

          <button
            onClick={toggleConversations} 
            className='flex items-center justify-center gap-2 bg-white/10 text-white p-3 rounded-xl border border-white/10 group'
          >
            <FaComments className='text-sm sm:text-lg' />
            <span className='text-xs sm:text-sm font-medium'>People</span>
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className='flex-1 flex flex-col min-h-0 p-4 sm:p-6'>
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