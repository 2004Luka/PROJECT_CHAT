import React, { useEffect, useState } from 'react';
import useGetFriendRequests from '../../hooks/useGetFriendRequests.js';
import { useAuthContext } from "../../context/AuthContext.jsx"; // Make sure to import this for getting authUser
import { useSocketContext } from '../../context/SocketContext.jsx';
import toast from 'react-hot-toast';

const FriendRequestList = () => {
    const { authUser } = useAuthContext(); // Get authUser from context
    const { loading, friendRequests, setFriendRequests, refetchRequests } = useGetFriendRequests(authUser?._id);
    const [respondingTo, setRespondingTo] = useState(null);
    const { socket } = useSocketContext();

    useEffect(() => {
        console.log('AuthUser:', authUser);
        console.log('Friend Requests:', friendRequests);
    }, [authUser, friendRequests]);

    useEffect(() => {
        if (socket) {
            socket.on('friendRequestAccepted', ({ friend }) => {
                // Remove the accepted request from the list
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
            console.log('Token from localStorage:', token);

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
                    // Handle unauthorized error
                    throw new Error('Unauthorized. Please log in again.');
                }
                throw new Error(data.error || 'Failed to respond to friend request');
            }

            // Update local state immediately
            setFriendRequests(prev => prev.filter(req => req.sender._id !== senderId));
            toast.success(data.message);

            // Emit socket event if accepted
            if (action === 'accept' && socket) {
                socket.emit('friendRequestAccepted', { senderId, receiverId: authUser._id });
            }

            refetchRequests(); // Refresh the friend requests
        } catch (error) {
            console.error('Error responding to friend request:', error);
            toast.error(error.message || 'Failed to respond to friend request');
            if (error.message === 'Unauthorized. Please log in again.') {
                // Handle logout or redirect to login page
                // For example:
                // logout();
                // navigate('/login');
            }
        } finally {
            setRespondingTo(null);
        }
    };

    return (
        <div>
            <h3 className='text-[var(--text)]'>Pending Friend Requests</h3>
            {loading ? (
                <span className='loading loading-spinner mx-auto'></span>
            ) : friendRequests.length > 0 ? (
                friendRequests.map((request) => (
                    <div key={request.sender._id}  
                    className=' text-[var(--text)] grid grid-[3fr,1fr,1fr] border-b-4 border-[var(--background3)] border-opacity-5 '>
                        <span>{request.sender.username}</span>
                        <button 
                            onClick={() => handleRespond(request.sender._id, 'accept')}
                            disabled={respondingTo === request.sender._id}
                            className='bg-[var(--primary)] hover:bg-[var(--background)] '
                        >
                            {respondingTo === request.sender._id ? 'Accepting...' : 'Accept'}
                        </button>
                        <button 
                            onClick={() => handleRespond(request.sender._id, 'reject')}
                            disabled={respondingTo === request.sender._id}
                            className='text-[var(--background3)] bg-[var(--background)] hover:bg-[var(--background3)] hover:text-[var(--background)] '
                        >
                            {respondingTo === request.sender._id ? 'Rejecting...' : 'Reject'}
                        </button>
                    </div>
                ))
            ) : (
                <p className='text-[var(--text)]'>No friend requests</p>
            )}
        </div>
    );
};

export default FriendRequestList;
