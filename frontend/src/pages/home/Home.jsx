import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    <div className='flex flex-col h-screen w-full rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 shadow-2xl'>
      <div className='h-1/3 overflow-y-auto'>
        <Sidebar className='h-full' />
      </div>
      <div className='flex-1 overflow-y-auto'>
        <MessageContainer />
      </div>
    </div>
  ) : (
    <div className='flex flex-row h-screen w-screen rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 shadow-2xl'>
      <div className='w-full md:w-[25rem] h-full overflow-y-auto'>
        <Sidebar className='h-full' />
      </div>
      <div className='w-full md:w-2/3 h-full overflow-y-auto'>
        <MessageContainer className='h-full' />
      </div>
    </div>
  );
}

export default Home;
