import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations.jsx'
import LogoutButton from './LogoutButton'
import FriendList from './FriendList'
import FriendRequestList from './FriendRequestList.jsx'
const Sidebar = () => {
  return (
    <div className='border-r border-[var(--primary)] rounded-tl-xl rounded-bl-xl p-4 flex flex-col h-full w-full bg-[var(--background2)] '>
      <FriendRequestList/>
      <LogoutButton/>
      <SearchInput/>
      <FriendList/>
      {/* <Conversations/> */}
    </div>
  )
}

export default Sidebar
