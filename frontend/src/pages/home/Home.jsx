import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
const Home = () => {
  return (
    <div className='flex sm:h-[500px] md:h-[600px] rounded-lg overflow-hidden bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 shadow-2xl' >
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
