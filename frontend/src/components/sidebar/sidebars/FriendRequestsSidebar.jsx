// src/components/Sidebar/FriendRequestsSidebar.jsx
import React from 'react';
import FriendRequestList from '../FriendRequestList';

const FriendRequestsSidebar = ({ isOpen, toggle }) => {
    return (
        <>
            {isOpen && (
                <>
                    <div 
                        className='fixed inset-0 bg-black bg-opacity-50 z-40' 
                        onClick={toggle}
                    />
                    <div 
                        className={`fixed top-0 left-0 h-full w-80 bg-[var(--background2)] border-r border-[var(--primary)] p-4 z-50 transition-transform ${
                            isOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        <div className="flex flex-col h-full">
                            <button 
                                onClick={toggle} 
                                className="self-end bg-[var(--primary)] text-white p-2 rounded-md mb-4"
                            >
                                Close
                            </button>
                            <FriendRequestList />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default FriendRequestsSidebar;
