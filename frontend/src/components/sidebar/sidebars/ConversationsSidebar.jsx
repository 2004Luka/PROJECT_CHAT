import React from 'react';
import SearchInput from '../SearchInput';
import Conversations from '../Conversations.jsx';
import { FaTimes } from 'react-icons/fa';

const ConversationsSidebar = ({ isOpen, toggle }) => {
    return (
        <>
            {isOpen && (
                <>
                    {/* Mobile Overlay */}
                    <div 
                        className='fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden' 
                        onClick={toggle}
                    />
                    
                    {/* Sidebar */}
                    <div 
                        className={`fixed top-0 right-0 h-screen w-full sm:w-96 lg:w-80 bg-slate-800/95 backdrop-blur-xl border-l border-green-500/20 z-50 transition-transform duration-300 ease-in-out ${
                            isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                                <h2 className="text-lg font-semibold text-green-300">People</h2>
                                <button 
                                    onClick={toggle} 
                                    className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all duration-300"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            </div>
                            
                            {/* Search */}
                            <div className="p-4 border-b border-green-500/20">
                                <SearchInput />
                            </div>
                            
                            {/* Conversations List */}
                            <div className="flex-1 min-h-0 p-4">
                                <Conversations />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ConversationsSidebar;