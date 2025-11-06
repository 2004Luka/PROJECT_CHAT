import React, { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast';
import config from '../config/config';

const useSendMessage = () => {
  const [loading,setLoading] = useState(false)
  const {messages,setMessages,selectedConversation} = useConversation();

    const uploadFile = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file); // Backend expects 'image' field name

            const token = localStorage.getItem('token');
            const res = await fetch(`${config.API_BASE_URL}/api/images/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // Return file data
            return {
                fileUrl: `${config.API_BASE_URL}${data.fileUrl}`,
                imageUrl: data.imageUrl ? `${config.API_BASE_URL}${data.imageUrl}` : null,
                fileName: data.originalName,
                fileType: data.fileType,
                isImage: data.isImage
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    const sendMessage = async (message, imageFiles = [], selectedFile = null) => {
        setLoading(true);
        try{
            let imageUrl = null;
            let fileUrl = null;
            let fileName = null;
            let fileType = null;

            // Upload images if any
            if (imageFiles.length > 0) {
                // Upload only the first image for now
                const uploaded = await uploadFile(imageFiles[0]);
                imageUrl = uploaded.imageUrl;
            }

            // Upload file if any (non-image)
            if (selectedFile && !selectedFile.file.type.startsWith('image/')) {
                const uploaded = await uploadFile(selectedFile.file);
                fileUrl = uploaded.fileUrl;
                fileName = uploaded.fileName;
                fileType = uploaded.fileType;
            }

            const res = await fetch(`${config.API_BASE_URL}/api/messages/send/${selectedConversation._id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    message: message || "",
                    imageUrl: imageUrl,
                    fileUrl: fileUrl,
                    fileName: fileName,
                    fileType: fileType
                })

            });
            const data = await res.json();
            if(data.error){
                throw Error(data.error);
            }

            setMessages([...messages,data])
        }catch(error){
            toast.error(error.message || 'Failed to send message');
        }finally{
            setLoading(false);
        }
    }

    return {sendMessage,loading};
}

export default useSendMessage
