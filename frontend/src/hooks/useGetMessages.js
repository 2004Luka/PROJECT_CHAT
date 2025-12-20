import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import config from '../config/config';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        if (!selectedConversation?._id) return;

        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${config.API_BASE_URL}/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to fetch messages');
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
