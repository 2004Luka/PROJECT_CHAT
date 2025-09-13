import React from 'react';
import { FaUser, FaCircle } from 'react-icons/fa';

const FriendItem = ({ friend, onStartChat, lastIdx }) => {
  return (
    <>
      <div 
        className='flex gap-3 items-center hover:bg-green-500/10 rounded-xl p-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group'
        onClick={() => onStartChat(friend)}
      >
        <div className='relative flex-shrink-0'>
          <div className='w-12 h-12 rounded-full border-2 border-green-500/30 group-hover:border-green-400 transition-colors duration-300 shadow-lg shadow-green-500/20 overflow-hidden'>
            {friend.profilePic ? (
              <img 
                src={friend.profilePic} 
                alt='user avatar' 
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center'>
                <FaUser className='text-white text-lg' />
              </div>
            )}
          </div>
          <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center'>
            <FaCircle className='text-green-400 text-xs animate-pulse' />
          </div>
        </div>

        <div className='flex flex-col flex-1 min-w-0'>
          <div className='flex items-center justify-between'>
            <p className='font-semibold text-white group-hover:text-green-300 transition-colors duration-300 truncate'>
              {friend.fullName || friend.username}
            </p>
            <div className='flex items-center gap-1 text-green-400 text-xs'>
              <FaCircle className='text-green-500' />
              <span className='hidden md:inline'>Online</span>
            </div>
          </div>
          <p className='text-green-400/70 text-sm truncate'>
            @{friend.username}
          </p>
        </div>
      </div>

      {!lastIdx && <div className='h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent my-2' />}
    </>
  );
};

export default FriendItem;