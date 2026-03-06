import { useState, useCallback } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import config from '../config/config';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const uploadFile = useCallback(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`${config.API_BASE_URL}/api/images/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        return {
            fileUrl: `${config.API_BASE_URL}${data.fileUrl}`,
            imageUrl: data.imageUrl ? `${config.API_BASE_URL}${data.imageUrl}` : null,
            fileName: data.originalName,
            fileType: data.fileType
        };
    }, []);

    const sendMessage = useCallback(async (message, imageFiles = [], selectedFile = null) => {
        if (!selectedConversation?._id) return;

        setLoading(true);
        try {
            let imageUrl = null;
            let fileUrl = null;
            let fileName = null;
            let fileType = null;

            if (imageFiles.length > 0) {
                const uploaded = await uploadFile(imageFiles[0]);
                imageUrl = uploaded.imageUrl;
            }

            if (selectedFile && !selectedFile.file.type.startsWith('image/')) {
                const uploaded = await uploadFile(selectedFile.file);
                ({ fileUrl, fileName, fileType } = uploaded);
            }

            const res = await fetch(`${config.API_BASE_URL}/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message || "", imageUrl, fileUrl, fileName, fileType })
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    }, [selectedConversation?._id, messages, setMessages, uploadFile]);

    return { sendMessage, loading };
};

export default useSendMessage;
