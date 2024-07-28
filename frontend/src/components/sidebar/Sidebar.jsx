import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations.jsx'
import LogoutButton from './LogoutButton'
const Sidebar = () => {
  return (
    <div className='border-r border-[var(--primary)] p-4 flex flex-col h-full'>
      <LogoutButton/>
      <SearchInput/>
      <div className="divider px-3"></div>
      <Conversations/>
    </div>
  )
}

export default Sidebar
