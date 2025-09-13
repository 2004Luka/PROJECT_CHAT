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
    <div className='flex flex-col h-full w-full bg-slate-800/90 backdrop-blur-xl'>
      {/* Header with CS-themed title */}
      <div className='p-4 sm:p-6 text-center border-b border-green-500/20 relative'>
        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className='absolute top-4 right-4 p-2 bg-green-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 sm:hidden'
          >
            <FaTimes className='w-4 h-4' />
          </button>
        )}
        <h2 className='text-xl sm:text-2xl font-bold text-green-400 mb-2'>CS Chat</h2>
        <div className='h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent'></div>
      </div>

      {/* Action Buttons */}
      <div className='p-4 sm:p-6 border-b border-green-500/20'>
        <div className='grid grid-cols-2 gap-2 sm:gap-3'>
          <button
            onClick={toggleFriendRequests} 
            className='flex items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 shadow-green-500/30 group'
          >
            <FaUserFriends className='text-sm sm:text-lg' />
            <span className='text-xs sm:text-sm font-medium'>Requests</span>
          </button>

          <button
            onClick={toggleConversations} 
            className='flex items-center justify-center gap-2 bg-gradient-to-br from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 shadow-lime-500/30 group'
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