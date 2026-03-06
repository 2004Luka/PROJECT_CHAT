import React from 'react';
import { FaUser, FaCircle } from 'react-icons/fa';
import getProfilePic from '../../utils/getProfilePic';

const FriendItem = ({ friend, onStartChat, lastIdx }) => {
  const profilePicUrl = getProfilePic(friend.profilePic);
  
  return (
    <>
      {/* Friend Item Card - High-contrast dark mode */}
      <div 
        className='flex gap-3 items-center p-3 cursor-pointer bg-[#1E1E1E] border border-[#333333] hover:bg-[#2A2A2A] hover:border-[#00FF99] focus:outline-none transition-all duration-200'
        onClick={() => onStartChat(friend)}
        tabIndex={0}
      >
        <div className='relative flex-shrink-0'>
          <div className='w-10 h-10 border border-[#333333] overflow-hidden bg-[#111111]'>
            <img 
              src={profilePicUrl} 
              alt='user avatar' 
              className='w-full h-full object-cover'
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className='w-full h-full bg-[#111111] hidden items-center justify-center border border-[#333333]'>
              <FaUser className='text-[#00FF99] text-sm' />
            </div>
          </div>
          {/* Online Status Indicator - Neon Green */}
          <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00FF99] rounded-full border-2 border-[#1E1E1E]'></div>
        </div>

        <div className='flex flex-col flex-1 min-w-0'>
          <div className='flex items-center justify-between gap-2'>
            <p className='font-semibold text-[#FFFFFF] truncate text-sm'>
              {friend.fullName || friend.username}
            </p>
            {/* Online Status Text */}
            <div className='flex items-center gap-1 text-[#00FF99] text-xs font-mono'>
              <FaCircle className='text-[6px]' />
              <span className='hidden md:inline'>Online</span>
            </div>
          </div>
          {/* Username - Monospace */}
          <p className='text-[#999999] text-xs font-mono truncate mt-0.5'>
            @{friend.username}
          </p>
        </div>
      </div>

      {!lastIdx && <div className='h-px bg-[#333333] my-1' />}
    </>
  );
};

export default FriendItem;