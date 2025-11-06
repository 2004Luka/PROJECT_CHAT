import React from 'react';
import { FaSignOutAlt, FaSpinner } from "react-icons/fa";
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('token');
  };

  return (
    <div>
      {!loading ? (
        <button 
          className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111111] hover:bg-[#2A2A2A] text-[#FF4444] border border-[#FF4444] hover:border-[#FF6666] font-semibold font-mono text-sm focus:outline-none transition-all duration-200'
          onClick={handleLogout}
        >
          <FaSignOutAlt className='w-3.5 h-3.5' />
          <span>Logout</span>
        </button>
      ) : (
        <div className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111111] border border-[#333333]'>
          <FaSpinner className='w-3.5 h-3.5 animate-spin text-[#FF4444]' />
          <span className='font-semibold text-[#FF4444] text-sm font-mono'>Logging out...</span>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;