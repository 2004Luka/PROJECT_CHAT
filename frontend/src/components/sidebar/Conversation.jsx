import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({conversation,lastIdx}) => {
    const {selectedConversation,setSelectedConversation}=useConversation();
    const {onlineUsers}=useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id)

    const isSelected = selectedConversation?._id===conversation._id;
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-[var(--primary)] rounded p-2 py-1 cursor-pointer 
                    ${isSelected ? "bg-[var(--primary)]":""}
                `}
                    onClick={()=>setSelectedConversation(conversation)}
                >
                <div className={`avatar  ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src={conversation.profilePic} className='bg-transparent'/>
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-[var(--text)] bg-transparent'>{conversation.fullName}</p>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1 w-full'> </div>}
        </>      
    )
}

export default Conversation
