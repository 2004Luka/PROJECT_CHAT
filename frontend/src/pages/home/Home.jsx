import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import { FaBars, FaTimes } from 'react-icons/fa'

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowSidebar(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      {/* Mobile Menu Button - Only show when sidebar is closed */}
      {isMobile && !showSidebar && (
        <button
          onClick={toggleSidebar}
          className='fixed top-4 left-4 z-50 p-2 text-white rounded-lg bg-white/10 backdrop-blur-xxl border border-white/10'
        >
          <FaBars className='w-5 h-5' />
        </button>
      )}

      <div className='flex h-screen w-full bg-white/5 backdrop-blur-xl relative overflow-hidden rounded-none sm:rounded-3xl border border-white/10'>
        {/* Sidebar */}
        <div className={`
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-40 w-80 ${showSidebar ? '' : 'hidden'}` 
            : 'w-80 flex-shrink-0'
          }
          h-full border-r border-white/10
        `}>
          <Sidebar onClose={isMobile ? toggleSidebar : null} />
        </div>

        {/* Mobile Overlay */}
        {isMobile && showSidebar && (
          <div 
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-30'
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <div className='flex-1 h-full overflow-hidden relative'>
          <MessageContainer />
        </div>
      </div>
    </>
  );
};

export default Home;