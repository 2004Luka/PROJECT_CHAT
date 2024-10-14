import React, { useState } from 'react';
import LogoutButton from './LogoutButton';
import FriendList from './FriendList';
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import FriendRequestsSidebar from './sidebars/FriendRequestsSidebar.jsx'; 
import ConversationsSidebar from './sidebars/ConversationsSidebar.jsx'; 

const Sidebar = () => {
  const [isFriendRequestsOpen, setIsFriendRequestsOpen] = useState(false);
  const [isConversationsOpen, setIsConversationsOpen] = useState(false);

  const toggleFriendRequests = () => {
    setIsFriendRequestsOpen(!isFriendRequestsOpen);
  };

  const toggleConversations = () => {
    setIsConversationsOpen(!isConversationsOpen);
  };

  return (
    <div className='border-r border-[var(--primary)] lg:rounded-tl-xl lg:rounded-bl-xl p-4 flex flex-col h-full w-full bg-[var(--background2)]
        
    '>
      <div className='flex flex-row gap-[5%]' >
        <TbLayoutSidebarRightCollapseFilled 
          onClick={toggleFriendRequests} 
          className=' w-[6vh] h-[6vh] text-white text-3xl cursor-pointer mb-4 bg-[var(--primary)] p-2 rounded-lg'
        />

        <TbLayoutSidebarRightCollapseFilled 
          onClick={toggleConversations} 
          className=' w-[6vh] h-[6vh] text-white text-3xl cursor-pointer mb-4 bg-[var(--primary)] p-2 rounded-lg'
        />
      </div>
      

      <LogoutButton />
      <FriendList />

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
