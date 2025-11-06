import React, { useState, useEffect } from 'react'
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations'
import useGetFriends from '../../hooks/useGetFriends'
import { useAuthContext } from '../../context/AuthContext';
import FriendButton from './FriendButton';
import toast from 'react-hot-toast';
import { FaSearch, FaUser, FaUserCheck } from 'react-icons/fa';

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();
    const { friends } = useGetFriends();
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (search.length < 3) {
            setSearchResults([]);
            return;
        }

        const allItems = [...conversations, ...friends.filter(friend => 
            !conversations.some(conv => conv._id === friend._id)
        )];

        const results = allItems.filter((item) => 
            item.fullName.toLowerCase().includes(search.toLowerCase()) ||
            item.username?.toLowerCase().includes(search.toLowerCase())
        );

        setSearchResults(results);
    }, [search, conversations, friends]);

    const handleItemClick = (item) => {
        if (isFriend(item)) {
            setSelectedConversation(item);
            setSearch("");
            setSearchResults([]);
        }
    }

    const isFriend = (item) => {
        return friends.some(friend => friend._id === item._id);
    }

    return (
        <div className='relative'>
            <div className='relative'>
                <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666] text-sm' />
                {/* Input - High-contrast design */}
                <input 
                    type="text" 
                    placeholder='Search users...' 
                    className='w-full h-11 pl-10 pr-3 py-2 bg-[#111111] border border-[#333333] text-[#FFFFFF] placeholder-[#666666] focus:outline-none focus:border-[#00FF99] text-sm transition-colors duration-200 font-mono' 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {searchResults.length > 0 && (
                <div className='absolute z-10 w-full mt-2 bg-[#111111] border border-[#333333] max-h-60 overflow-y-auto'>
                    {searchResults.map((item) => (
                        <div 
                            key={item._id} 
                            className={`p-3 flex items-center justify-between text-[#FFFFFF] border-b border-[#333333] last:border-b-0 hover:bg-[#2A2A2A] transition-colors duration-150
                                ${isFriend(item) ? 'cursor-pointer' : 'cursor-default opacity-50'}`}
                            onClick={() => isFriend(item) && handleItemClick(item)}
                        >
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 border border-[#333333] overflow-hidden bg-[#1E1E1E]'>
                                    {item.profilePic ? (
                                        <img 
                                            src={item.profilePic} 
                                            alt={item.fullName} 
                                            className='w-full h-full object-cover'
                                        />
                                    ) : (
                                        <div className='w-full h-full bg-[#111111] flex items-center justify-center border border-[#333333]'>
                                            <FaUser className='text-[#00FF99] text-sm' />
                                        </div>
                                    )}
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-sm font-mono'>{item.fullName || item.username}</span>
                                    {/* Username - Monospace */}
                                    <span className='text-[#999999] text-xs font-mono'>@{item.username}</span>
                                </div>
                            </div>
                                {item._id !== authUser._id && (
                                isFriend(item) ? (
                                    <div className='flex items-center gap-1.5 text-[#00FF99] text-xs font-medium font-mono'>
                                        <FaUserCheck className='text-sm' />
                                        <span className='hidden md:inline'>Friend</span>
                                    </div>
                                ) : (
                                    <FriendButton receiverId={item._id} onClick={(e) => e.stopPropagation()} />
                                )
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchInput