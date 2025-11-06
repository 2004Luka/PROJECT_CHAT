import React from 'react';
import FriendRequestList from '../FriendRequestList';
import { FaTimes } from 'react-icons/fa';

const FriendRequestsSidebar = ({ isOpen, toggle }) => {
    return (
        <>
            {isOpen && (
                <>
                    {/* Mobile Overlay */}
                    <div 
                        className='fixed inset-0 bg-black/50 z-40 sm:hidden' 
                        onClick={toggle}
                    />
                    
                    {/* Sidebar - High-contrast dark mode */}
                    <div 
                        className={`fixed top-0 right-0 h-screen w-full sm:w-96 lg:w-80 bg-[#1E1E1E] border-l border-[#333333] z-50 transition-transform duration-300 ${
                            isOpen ? '' : 'hidden'
                        }`}
                        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
                    >
                        <div className="flex flex-col h-full">
                            {/* Header - High-contrast design */}
                            <div className="flex items-center justify-between p-4 border-b border-[#333333] bg-[#1E1E1E]">
                                <h2 className="text-base font-bold text-[#FFFFFF] font-mono">Friend Requests</h2>
                                <button 
                                    onClick={toggle} 
                                    className="p-2 text-[#CCCCCC] hover:text-[#FFFFFF] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] transition-colors"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            </div>
                            
                            {/* Friend Requests List */}
                            <div className="flex-1 min-h-0 p-4 bg-[#1E1E1E]">
                                <FriendRequestList />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default FriendRequestsSidebar;