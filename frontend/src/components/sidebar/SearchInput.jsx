import React, { useState, useEffect } from 'react'
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations'
import useGetFriends from '../../hooks/useGetFriends'
import { useAuthContext } from '../../context/AuthContext';
import FriendButton from './FriendButton'; // Import the FriendButton component
import toast from 'react-hot-toast';

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
        // If not a friend, do nothing (the FriendButton will handle the action)
    }

    const isFriend = (item) => {
        return friends.some(friend => friend._id === item._id);
    }

    return (
        <div className='relative'>
            <input 
                type="text" 
                placeholder='Search...' 
                className='input input-bordered rounded-lg text-[var(--text)] bg-[var(--text-2)] 
                           border border-[var(--primary)] w-full' 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
                <div className='absolute z-10 w-full mt-1 bg-[var(--background)] border border-[var(--primary)] rounded-lg max-h-60 overflow-y-auto'>
                    {searchResults.map((item) => (
                        <div 
                            key={item._id} 
                            className='p-2 hover:bg-[var(--primary)] cursor-pointer flex items-center justify-between'
                            onClick={() => handleItemClick(item)}
                        >
                            <div className='flex items-center'>
                                <img 
                                    src={item.profilePic} 
                                    alt={item.fullName} 
                                    className='w-8 h-8 rounded-full mr-2'
                                />
                                <span>{item.fullName || item.username}</span>
                            </div>
                            {item._id !== authUser._id && (
                                isFriend(item) ? (
                                    <span className='text-green-500'>Already Friends</span>
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
