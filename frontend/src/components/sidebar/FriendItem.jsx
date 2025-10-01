import React from 'react';
import { FaUser, FaCircle } from 'react-icons/fa';

const FriendItem = ({ friend, onStartChat, lastIdx }) => {
  return (
    <>
      <div 
        className='flex gap-3 items-center rounded-xl p-3 cursor-pointer bg-white/0 group'
        onClick={() => onStartChat(friend)}
      >
        <div className='relative flex-shrink-0'>
          <div className='w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden'>
            {friend.profilePic ? (
              <img 
                src={friend.profilePic} 
                alt='user avatar' 
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-white/10 flex items-center justify-center'>
                <FaUser className='text-white text-lg' />
              </div>
            )}
          </div>
          <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-800 flex items-center justify-center'>
            <FaCircle className='text-emerald-300 text-xs' />
          </div>
        </div>

        <div className='flex flex-col flex-1 min-w-0'>
          <div className='flex items-center justify-between'>
            <p className='font-semibold text-white truncate'>
              {friend.fullName || friend.username}
            </p>
            <div className='flex items-center gap-1 text-white/70 text-xs'>
              <FaCircle className='text-emerald-400' />
              <span className='hidden md:inline'>Online</span>
            </div>
          </div>
          <p className='text-white/70 text-sm truncate'>
            @{friend.username}
          </p>
        </div>
      </div>

      {!lastIdx && <div className='h-px bg-white/10 my-2' />}
    </>
  );
};

export default FriendItem;