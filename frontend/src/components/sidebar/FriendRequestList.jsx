import React, { useEffect, useState } from 'react';
import useGetFriendRequests from '../../hooks/useGetFriendRequests.js';
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useSocketContext } from '../../context/SocketContext.jsx';
import getProfilePic from '../../utils/getProfilePic';
import toast from 'react-hot-toast';
import { FaUserPlus, FaUserCheck, FaUserTimes, FaSpinner, FaUserClock } from 'react-icons/fa';

const FriendRequestList = () => {
    const { authUser } = useAuthContext();
    const { loading, friendRequests, setFriendRequests, refetchRequests } = useGetFriendRequests(authUser?._id);
    const [respondingTo, setRespondingTo] = useState(null);
    const { socket } = useSocketContext();

    useEffect(() => {
        if (socket) {
            socket.on('friendRequestAccepted', ({ friend }) => {
                setFriendRequests(prev => prev.filter(req => req.sender._id !== friend._id));
                toast.success(`You are now friends with ${friend.username}`);
            });
        }

        return () => {
            if (socket) {
                socket.off('friendRequestAccepted');
            }
        };
    }, [socket, setFriendRequests]);

    const handleRespond = async (senderId, action) => {
        setRespondingTo(senderId);
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            const res = await fetch('/api/friends/respond', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    receiverId: authUser._id,
                    senderId,
                    action,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Unauthorized. Please log in again.');
                }
                throw new Error(data.error || 'Failed to respond to friend request');
            }

            setFriendRequests(prev => prev.filter(req => req.sender._id !== senderId));
            toast.success(data.message);

            if (action === 'accept' && socket) {
                socket.emit('friendRequestAccepted', { senderId, receiverId: authUser._id });
            }

            refetchRequests();
        } catch (error) {
            console.error('Error responding to friend request:', error);
            toast.error(error.message || 'Failed to respond to friend request');
        } finally {
            setRespondingTo(null);
        }
    };

    return (
        <div className='flex flex-col h-full'>
            {/* Header - High-contrast design */}
            <div className='flex items-center gap-3 mb-4 pb-3 border-b border-[#333333]'>
                <FaUserClock className='text-[#00FF99] text-sm' />
                <h3 className='text-[#FFFFFF] font-semibold text-sm font-mono'>Friend Requests ({friendRequests.length})</h3>
            </div>

            {/* Requests List */}
            <div className='flex-1 overflow-y-auto space-y-3'>
                {loading ? (
                    <div className='flex flex-col items-center justify-center py-12'>
                        <FaSpinner className='text-[#00FF99] text-xl mb-3 animate-spin' />
                        <p className='text-[#999999] text-xs font-mono'>Loading requests...</p>
                    </div>
                ) : friendRequests.length > 0 ? (
                    friendRequests.map((request) => (
                        <div key={request.sender._id} className='bg-[#111111] border border-[#333333] p-4 hover:border-[#00FF99] transition-colors duration-200'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='w-10 h-10 border border-[#333333] overflow-hidden bg-[#1E1E1E]'>
                                    <img 
                                        src={getProfilePic(request.sender.profilePic)} 
                                        alt={request.sender.username}
                                        className='w-full h-full object-cover'
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.style.display = 'none';
                                            if (e.target.nextElementSibling) {
                                                e.target.nextElementSibling.style.display = 'flex';
                                            }
                                        }}
                                    />
                                    <div className='w-full h-full hidden bg-[#111111] items-center justify-center border border-[#333333]'>
                                        <FaUserPlus className='text-[#00FF99] text-sm' />
                                    </div>
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-[#FFFFFF] font-semibold truncate text-sm font-mono'>{request.sender.fullName || request.sender.username}</p>
                                    {/* Username - Monospace */}
                                    <p className='text-[#999999] text-xs font-mono truncate mt-0.5'>@{request.sender.username}</p>
                                </div>
                            </div>
                            
                            <div className='flex gap-2'>
                                {/* Accept Button - Neon Green */}
                                <button 
                                    onClick={() => handleRespond(request.sender._id, 'accept')}
                                    disabled={respondingTo === request.sender._id}
                                    className='flex-1 flex items-center justify-center gap-2 bg-[#00FF99] hover:bg-[#00E689] text-[#1E1E1E] px-3 py-2.5 text-xs font-semibold font-mono border border-[#00FF99] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200'
                                >
                                    {respondingTo === request.sender._id ? (
                                        <>
                                            <FaSpinner className='animate-spin' />
                                            <span>Accepting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaUserCheck />
                                            <span>Accept</span>
                                        </>
                                    )}
                                </button>
                                {/* Reject Button - Red accent */}
                                <button 
                                    onClick={() => handleRespond(request.sender._id, 'reject')}
                                    disabled={respondingTo === request.sender._id}
                                    className='flex-1 flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-[#FF4444] px-3 py-2.5 text-xs font-semibold font-mono border border-[#FF4444] hover:border-[#FF6666] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200'
                                >
                                    {respondingTo === request.sender._id ? (
                                        <>
                                            <FaSpinner className='animate-spin' />
                                            <span>Rejecting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaUserTimes />
                                            <span>Reject</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center py-12'>
                        <div className='w-12 h-12 mx-auto mb-4 bg-[#111111] border border-[#333333] flex items-center justify-center'>
                            <FaUserClock className='text-[#666666] text-xl' />
                        </div>
                        <p className='text-[#FFFFFF] font-semibold text-sm mb-1 font-mono'>No pending requests</p>
                        <p className='text-[#999999] text-xs font-mono'>All caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendRequestList;