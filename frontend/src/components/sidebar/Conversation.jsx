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
            <div className={`flex gap-5 items-center hover:bg-[var(--primary)] rounded p-2 py-1 cursor-pointer 
                            h-[9vh] w-full border-b-[1px] border-opacity-50 border-black 
                    ${isSelected ? "bg-[var(--primary)]":""  }
                `}
                    onClick={()=>setSelectedConversation(conversation)}
                >
                <div className={`avatar  ${isOnline ? "online" : ""}`}>
                    <div className="w-14 rounded-lg bg-white">
                         <img src={conversation.profilePic} className=' size-fit'/>
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between flex-col'>
                        <p className='font-bold text-[var(--text)] bg-transparent'>{conversation.fullName}</p>
                        <p className='text-[var(--text)]'>last text from this person</p>
                    </div>

                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1 w-full'> </div>}
        </>      
    )
}

export default Conversation
