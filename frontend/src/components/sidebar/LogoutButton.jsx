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
          className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg border border-white/10 font-medium'
          onClick={handleLogout}
        >
          <FaSignOutAlt className='w-4 h-4' />
          <span>Logout</span>
        </button>
      ) : (
        <div className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/10'>
          <FaSpinner className='w-4 h-4' />
          <span className='font-medium'>Logging out...</span>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;