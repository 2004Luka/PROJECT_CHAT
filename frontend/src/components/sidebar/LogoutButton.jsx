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
          className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25 font-medium'
          onClick={handleLogout}
        >
          <FaSignOutAlt className='w-4 h-4' />
          <span>Logout</span>
        </button>
      ) : (
        <div className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/50 rounded-lg'>
          <FaSpinner className='w-4 h-4 animate-spin' />
          <span className='font-medium'>Logging out...</span>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;