import React, { useEffect, useState } from 'react';
import useGetFriendRequests from '../../hooks/useGetFriendRequests.js';
import { useAuthContext } from "../../context/AuthContext.jsx"; // Make sure to import this for getting authUser
import toast from 'react-hot-toast';

const FriendRequestList = () => {
    const { authUser } = useAuthContext(); // Get authUser from context
    const { loading, friendRequests, refetchRequests } = useGetFriendRequests(authUser?._id);
    const [respondingTo, setRespondingTo] = useState(null);

    useEffect(() => {
        console.log('AuthUser:', authUser);
        console.log('Friend Requests:', friendRequests);
    }, [authUser, friendRequests]);

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

            toast.success(data.message);
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
            <h3>Pending Friend Requests</h3>
            {loading ? (
                <span className='loading loading-spinner mx-auto'></span>
            ) : friendRequests.length > 0 ? (
                friendRequests.map((request) => (
                    <div key={request.sender._id}>
                        <span>{request.sender.username}</span>
                        <button 
                            onClick={() => handleRespond(request.sender._id, 'accept')}
                            disabled={respondingTo === request.sender._id}
                        >
                            {respondingTo === request.sender._id ? 'Accepting...' : 'Accept'}
                        </button>
                        <button 
                            onClick={() => handleRespond(request.sender._id, 'reject')}
                            disabled={respondingTo === request.sender._id}
                        >
                            {respondingTo === request.sender._id ? 'Rejecting...' : 'Reject'}
                        </button>
                    </div>
                ))
            ) : (
                <p>No friend requests</p>
            )}
        </div>
    );
};

export default FriendRequestList;
