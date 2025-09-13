import React, { useEffect, useState } from 'react';
import useGetFriendRequests from '../../hooks/useGetFriendRequests.js';
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useSocketContext } from '../../context/SocketContext.jsx';
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
            {/* Header */}
            <div className='flex items-center gap-2 mb-4 pb-2 border-b border-green-500/20'>
                <FaUserClock className='text-green-400 text-lg' />
                <h3 className='text-green-300 font-semibold'>Friend Requests ({friendRequests.length})</h3>
            </div>

            {/* Requests List */}
            <div className='flex-1 overflow-y-auto space-y-3'>
                {loading ? (
                    <div className='flex flex-col items-center justify-center py-8'>
                        <FaSpinner className='text-green-400 text-2xl animate-spin mb-2' />
                        <p className='text-green-300 text-sm'>Loading requests...</p>
                    </div>
                ) : friendRequests.length > 0 ? (
                    friendRequests.map((request) => (
                        <div key={request.sender._id} className='bg-slate-800/50 border border-green-500/20 rounded-lg p-4 hover:bg-slate-800/70 transition-all duration-300'>
                            <div className='flex items-center gap-3 mb-3'>
                                <div className='w-10 h-10 rounded-full border-2 border-green-500/30 overflow-hidden'>
                                    {request.sender.profilePic ? (
                                        <img 
                                            src={request.sender.profilePic} 
                                            alt={request.sender.username}
                                            className='w-full h-full object-cover'
                                        />
                                    ) : (
                                        <div className='w-full h-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center'>
                                            <FaUserPlus className='text-white text-sm' />
                                        </div>
                                    )}
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-green-100 font-medium truncate'>{request.sender.fullName || request.sender.username}</p>
                                    <p className='text-green-400/70 text-sm truncate'>@{request.sender.username}</p>
                                </div>
                            </div>
                            
                            <div className='flex gap-2'>
                                <button 
                                    onClick={() => handleRespond(request.sender._id, 'accept')}
                                    disabled={respondingTo === request.sender._id}
                                    className='flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:from-green-400 disabled:to-teal-400 text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-lg shadow-green-500/30 disabled:cursor-not-allowed'
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
                                <button 
                                    onClick={() => handleRespond(request.sender._id, 'reject')}
                                    disabled={respondingTo === request.sender._id}
                                    className='flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50'
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
                    <div className='text-center py-8'>
                        <FaUserClock className='text-green-400/50 text-4xl mx-auto mb-3' />
                        <p className='text-green-300 text-lg font-medium'>No pending requests</p>
                        <p className='text-green-400/70 text-sm mt-1'>All caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendRequestList;