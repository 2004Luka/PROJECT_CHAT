import React, { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import config from '../config/config';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                console.log('Fetching messages for conversation:', selectedConversation?._id);
                const res = await fetch(`${config.API_BASE_URL}/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                console.log('Fetched messages:', data);
                if (res.status !== 200) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
