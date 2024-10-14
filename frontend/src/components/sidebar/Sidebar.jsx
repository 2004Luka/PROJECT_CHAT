import React,{useState} from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations.jsx'
import LogoutButton from './LogoutButton'
import FriendList from './FriendList'
import FriendRequestList from './FriendRequestList.jsx'
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
const Sidebar = () => {
  const [isFriendRequestsOpen, setIsFriendRequestsOpen] = useState(false);
  const [isSearchFriendsOpen, setIsSearchFriendsOpen] = useState(false);

  const toggleFriendRequests = () => {
    setIsFriendRequestsOpen(!isFriendRequestsOpen);
  };

  const toggleSearchFriends = () => {
    setIsSearchFriendsOpen(!isSearchFriendsOpen);
  };



  return (
    <div className='border-r border-[var(--primary)] rounded-tl-xl rounded-bl-xl p-4 flex flex-col h-full w-full bg-[var(--background2)] '>
      
      {/* Icon button inside the sidebar to open Friend Requests */}
      <TbLayoutSidebarRightCollapseFilled 
        onClick={toggleFriendRequests} 
        className=' w-[5vh] h-[5vh] text-white text-3xl cursor-pointer mb-4 bg-[var(--primary)] p-2 rounded-lg'
      />

      <LogoutButton />
      <SearchInput />
      <FriendList />

      {isFriendRequestsOpen && (
        <>
          <div 
            className='fixed inset-0 bg-black bg-opacity-50 z-40 rounded-lg' 
            onClick={toggleFriendRequests}
          />
          <div 
            className={`fixed top-0 left-0 h-full w-80 bg-[var(--background2)] border-r border-[var(--primary)] p-4 z-50 transition-transform ${
              isFriendRequestsOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full">
              <button 
                onClick={toggleFriendRequests} 
                className="self-end bg-[var(--primary)] text-white p-2 rounded-md mb-4"
              >
                Close
              </button>
              <FriendRequestList />
            </div>
          </div>
        </>
      )}


      
    </div>
  )
}

export default Sidebar
