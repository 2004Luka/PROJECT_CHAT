import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetFriendRequests = (authUserId) => {
    const [loading, setLoading] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
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

                const rawText = await res.text();
                console.log('Raw response:', rawText);

                let data;
                try {
                    data = JSON.parse(rawText);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    throw new Error('Invalid JSON response');
                }

                console.log('Parsed data:', data);
                setFriendRequests(data.requests || []);
            } catch (error) {
                console.error('Error fetching friend requests:', error);
                toast.error('Failed to fetch friend requests');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [authUserId]);

    return { loading, friendRequests };
};

export default useGetFriendRequests;
