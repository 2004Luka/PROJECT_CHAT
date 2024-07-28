import React from 'react';
import { CiLogout } from "react-icons/ci";
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className=''>
      {!loading ? (
        <CiLogout className='w-6 h-6 text-white cursor-pointer bg-transparent' onClick={logout} />
      ) : (
        <span className='loading loading-spinner'></span>
      )}
    </div>
  );
};

export default LogoutButton;
