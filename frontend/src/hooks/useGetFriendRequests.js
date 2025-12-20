import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/SocketContext';
import config from '../config/config';

const useGetFriendRequests = (authUserId) => {
    const [loading, setLoading] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const { socket } = useSocketContext();

    const fetchRequests = useCallback(async () => {
        if (!authUserId) return;

        setLoading(true);
        try {
            const res = await fetch(`${config.API_BASE_URL}/api/friends/requests/${authUserId}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            setFriendRequests(data.requests || []);
        } catch (error) {
            toast.error('Failed to fetch friend requests');
        } finally {
            setLoading(false);
        }
    }, [authUserId]);

    useEffect(() => {
        fetchRequests();

        if (!socket) return;

        const handleFriendRequest = (request) => {
            setFriendRequests(prev => [...prev, request]);
            toast.success(`${request.senderName} sent you a friend request!`);
        };

        socket.on('friendRequestReceived', handleFriendRequest);
        return () => socket.off('friendRequestReceived', handleFriendRequest);
    }, [fetchRequests, socket]);

    return { loading, friendRequests, setFriendRequests, refetchRequests: fetchRequests };
};

export default useGetFriendRequests;
