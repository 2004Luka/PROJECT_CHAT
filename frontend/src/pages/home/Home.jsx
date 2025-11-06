import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import { FaBars } from 'react-icons/fa'

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setShowSidebar(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && !showSidebar && (
        <button
          onClick={toggleSidebar}
          className='fixed top-4 left-4 z-50 p-3 text-[#FFFFFF] bg-[#111111] border border-[#333333] hover:border-[#00FF99] transition-colors'
        >
          <FaBars className='w-5 h-5' />
        </button>
      )}

      <div className='flex h-screen w-full bg-[#1E1E1E] relative overflow-hidden'>
        {/* Left Navigation - Sidebar */}
        <div className={`
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-40 w-80 bg-[#1E1E1E] ${showSidebar ? '' : 'hidden'}` 
            : 'w-80 flex-shrink-0'
          }
          h-full border-r border-[#333333]
        `}>
          <Sidebar onClose={isMobile ? toggleSidebar : null} />
        </div>

        {/* Mobile Overlay for Sidebar */}
        {isMobile && showSidebar && (
          <div 
            className='fixed inset-0 bg-[#1E1E1E]/80 backdrop-blur-sm z-30 transition-opacity duration-200'
            onClick={toggleSidebar}
          />
        )}

        {/* Center - Main Chat Thread */}
        <div className='flex-1 h-full overflow-hidden relative min-w-0'>
          <MessageContainer />
        </div>
      </div>
    </>
  );
};

export default Home;