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
    <div className='flex h-screen w-full bg-slate-800/80 backdrop-blur-xl relative overflow-hidden rounded-3xl border border-green-500/20 shadow-2xl shadow-green-500/20'>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className='fixed top-4 left-4 z-50 p-2 bg-green-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300'
        >
          {showSidebar ? <FaTimes className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile 
          ? `fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out ${
              showSidebar ? 'translate-x-0' : '-translate-x-full'
            }` 
          : 'w-80 flex-shrink-0'
        }
        h-full border-r border-green-500/20
      `}>
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {isMobile && showSidebar && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className='flex-1 h-full overflow-hidden relative'>
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;