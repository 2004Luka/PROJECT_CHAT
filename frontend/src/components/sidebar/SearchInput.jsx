import React,{useState}from 'react'
import { FaSearchPlus } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations'
import toast from 'react-hot-toast';

const SearchInput = () => {
    const [search,setSearch]=useState("");
    const {setSelectedConversation} = useConversation();
    const {conversations} = useGetConversations();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!search) return;
        if(search.length < 3){
            return toast.error("search term must be at least 3 characters long")
        }

        const conversation = conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
    
        if(conversation){
            setSelectedConversation(conversation);
            setSearch("");

        }else{
            toast.error("no such user found!");
        }
    }



    return (
        <form 
            onSubmit={handleSubmit}
            className='flex items-center gap-2 mt-5'>
            <input type="text" placeholder='Search...' className='input input=bordered rpunded-full text-[var(--text)] bg-[var(--text-2)] border border-[var(--primary)]' 
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
            />
            <button className='btn btn-circle bg-[var(--primary)] text-[var(--text-2)]'> 
                <FaSearchPlus className='w-6 h-6 outline-none bg-transparent' />
            </button>
        </form>
    )
}

export default SearchInput
