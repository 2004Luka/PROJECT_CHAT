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
                <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 text-sm' />
                <input 
                    type="text" 
                    placeholder='Search users...' 
                    className='w-full h-10 pl-10 pr-3 py-2 bg-green-500/5 backdrop-blur-sm border border-green-500/20 rounded-lg text-green-100 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm' 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {searchResults.length > 0 && (
                <div className='absolute z-10 w-full mt-2 bg-slate-800/95 backdrop-blur-xl border border-green-500/20 rounded-lg max-h-60 overflow-y-auto shadow-xl shadow-green-500/10'>
                    {searchResults.map((item) => (
                        <div 
                            key={item._id} 
                            className={`p-3 flex items-center justify-between text-green-100 border-b border-green-500/10 last:border-b-0
                                ${isFriend(item) ? 'hover:bg-green-500/20 cursor-pointer' : 'cursor-default opacity-75'}`}
                            onClick={() => isFriend(item) && handleItemClick(item)}
                        >
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-full border-2 border-green-500/30 overflow-hidden'>
                                    {item.profilePic ? (
                                        <img 
                                            src={item.profilePic} 
                                            alt={item.fullName} 
                                            className='w-full h-full object-cover'
                                        />
                                    ) : (
                                        <div className='w-full h-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center'>
                                            <FaUser className='text-white text-sm' />
                                        </div>
                                    )}
                                </div>
                                <div className='flex flex-col'>
                                    <span className='font-medium'>{item.fullName || item.username}</span>
                                    <span className='text-green-400/70 text-sm'>@{item.username}</span>
                                </div>
                            </div>
                                {item._id !== authUser._id && (
                                isFriend(item) ? (
                                    <div className='flex items-center gap-1 text-green-400 text-sm'>
                                        <FaUserCheck />
                                        <span className='hidden md:inline'>Friends</span>
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