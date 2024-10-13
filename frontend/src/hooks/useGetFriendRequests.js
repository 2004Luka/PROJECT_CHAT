import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/SocketContext'; // Import the SocketContext

const useGetFriendRequests = (authUserId) => {
    const [loading, setLoading] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const { socket } = useSocketContext(); // Get the socket instance

    const fetchRequests = useCallback(async () => {
        if (!authUserId) {
            console.log('No authUserId provided');
            return;
        }
        setLoading(true);
        try {
            console.log('Fetching friend requests for user:', authUserId);
            const res = await fetch(`/api/friends/requests/${authUserId}`);

            console.log('Response status:', res.status);
            if (!res.ok) {
                const errorText = await res.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Parsed data:', data);
            setFriendRequests(data.requests || []);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
            toast.error('Failed to fetch friend requests');
        } finally {
            setLoading(false);
        }
    }, [authUserId]);

    useEffect(() => {
        fetchRequests();

        // Listen for incoming friend requests via Socket.IO
        if (socket) {
            socket.on('friendRequestReceived', (request) => {
                setFriendRequests(prev => [...prev, request]);
                toast.success(`${request.senderName} sent you a friend request!`);
            });
        }

        return () => {
            if (socket) {
                socket.off('friendRequestReceived');
            }
        };
    }, [fetchRequests, socket]);

    const refetchRequests = useCallback(() => {
        fetchRequests();
    }, [fetchRequests]);

    return { loading, friendRequests, setFriendRequests, refetchRequests };
};

export default useGetFriendRequests;
