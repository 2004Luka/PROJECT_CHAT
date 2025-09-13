import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import config from '../config/config';

const useGetConversations = () => {
    const [loading,setLoading] = useState(false);
    const [conversations,setConversations]=useState([]);

    useEffect(()=>{
        const getConversations=async()=>{
            setLoading(true);
            try{
                const res=await fetch(`${config.API_BASE_URL}/api/users`);
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setConversations(data);
            }catch(error){
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        };

        getConversations();
    },[]);

    return {loading,conversations};
}

export default useGetConversations;
