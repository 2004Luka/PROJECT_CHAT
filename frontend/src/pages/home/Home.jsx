import { useState, useEffect, useCallback } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';
import { FaBars } from 'react-icons/fa';

const Home = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = useCallback(() => setShowSidebar(prev => !prev), []);

    return (
        <>
            {/* Sidebar toggle button - Only visible on mobile when sidebar is closed */}
            <button
                onClick={toggleSidebar}
                className={`fixed top-4 left-4 z-50 p-3 text-[#FFFFFF] bg-[#111111] border border-[#333333] hover:border-[#00FF99] transition-colors lg:hidden ${showSidebar ? 'hidden' : ''}`}
            >
                <FaBars className='w-5 h-5' />
            </button>

            <div className='flex h-screen w-full bg-[#1E1E1E] relative overflow-hidden'>
                {/* Sidebar container */}
                <div className={`
                    ${showSidebar ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 
                    fixed lg:static inset-y-0 left-0 z-40 w-80 
                    bg-[#1E1E1E] border-r border-[#333333] 
                    transition-transform duration-300 ease-in-out
                    flex-shrink-0
                `}>
                    <Sidebar onClose={toggleSidebar} />
                </div>

                {/* Mobile Overlay */}
                {showSidebar && (
                    <div
                        className='fixed inset-0 bg-[#1E1E1E]/80 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-200'
                        onClick={toggleSidebar}
                    />
                )}

                {/* Main Content Area */}
                <div className='flex-1 h-full overflow-hidden relative min-w-0'>
                    <MessageContainer />
                </div>
            </div>
        </>
    );
};

export default Home;