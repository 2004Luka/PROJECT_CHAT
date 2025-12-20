import { useEffect, useMemo } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { authUser } = useAuthContext();

    useEffect(() => () => setSelectedConversation(null), [setSelectedConversation]);

    const recipientInfo = useMemo(() => {
        if (!selectedConversation) return null;
        return {
            name: selectedConversation.fullName || selectedConversation.username || 'Unknown User',
            username: selectedConversation.username || 'unknown',
            profilePic: selectedConversation.profilePic
        };
    }, [selectedConversation]);

    if (!selectedConversation) {
        return (
            <div className='flex flex-col h-full bg-[#1E1E1E]'>
                <div className='flex-1 flex items-center justify-center'>
                    <div className='text-center p-10'>
                        <div className='w-24 h-24 mx-auto mb-8 bg-[#111111] border border-[#333333] flex items-center justify-center hover:border-[#00FF99] transition-colors'>
                            <TiMessages className='text-[#00FF99] text-4xl' />
                        </div>
                        <h2 className='text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-2 leading-tight tracking-tight font-mono'>
                            Welcome, <span className='text-[#00FF99]'>{authUser?.fullName}</span>
                        </h2>
                        <p className='text-base text-[#999999] mt-3 leading-relaxed font-mono'>Select a friend to start messaging</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-full bg-[#1E1E1E]'>
            <div className='p-4 border-b border-[#333333] flex-shrink-0 bg-[#1E1E1E]'>
                <div className='flex items-center gap-4'>
                    <div className='w-10 h-10 border border-[#333333] overflow-hidden bg-[#111111] flex-shrink-0'>
                        {recipientInfo?.profilePic ? (
                            <img src={recipientInfo.profilePic} alt={recipientInfo.name} className='w-full h-full object-cover' />
                        ) : (
                            <div className='w-full h-full bg-[#111111] flex items-center justify-center'>
                                <span className='text-[#00FF99] font-bold text-sm font-mono'>
                                    {recipientInfo?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className='flex-1 min-w-0'>
                        <h3 className='text-[#FFFFFF] font-semibold text-base truncate font-mono'>{recipientInfo?.name}</h3>
                        <p className='text-[#999999] text-xs font-mono truncate mt-0.5'>@{recipientInfo?.username}</p>
                    </div>
                </div>
            </div>

            <div className='flex-1 min-h-0'>
                <Messages />
            </div>

            <div className='p-4 border-t border-[#333333] flex-shrink-0 bg-[#1E1E1E]'>
                <MessageInput />
            </div>
        </div>
    );
};

export default MessageContainer;