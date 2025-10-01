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
                    
                    {/* Sidebar */}
                    <div 
                        className={`fixed top-0 right-0 h-screen w-full sm:w-96 lg:w-80 bg-black/70 backdrop-blur-4xl border-l border-white/10 z-50 ${
                            isOpen ? '' : 'hidden'
                        }`}
                        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-white/10">
                                <h2 className="text-lg font-semibold text-white">Friend Requests</h2>
                                <button 
                                    onClick={toggle} 
                                    className="p-2 bg-white/10 text-white rounded-lg border border-white/10"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            </div>
                            
                            {/* Friend Requests List */}
                            <div className="flex-1 min-h-0 p-4">
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