import { useEffect, useRef, useCallback } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';
import useConversation from '../../zustand/useConversation';

const Messages = () => {
    const { messages, loading } = useGetMessages();
    const { selectedConversation } = useConversation();
    useListenMessages();
    const messagesEndRef = useRef();
    const scrollContainerRef = useRef();

    const scrollToBottom = useCallback((behavior = "smooth") => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
        } else if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0 || (selectedConversation && !loading)) {
            const timer = setTimeout(() => scrollToBottom("smooth"), 100);
            return () => clearTimeout(timer);
        }
    }, [messages.length, selectedConversation, loading, scrollToBottom]);

    return (
        <div className='h-full flex flex-col'>
            <div ref={scrollContainerRef} className='flex-1 overflow-y-auto px-6 py-6 bg-[#1E1E1E]'>
                {loading ? (
                    <div className='space-y-4'>
                        {[...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
                    </div>
                ) : messages.length > 0 ? (
                    <div className='space-y-2'>
                        {messages.map((message) => (
                            <Message key={message._id} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <div className='text-center p-8'>
                            <p className='text-[#999999] text-sm font-mono'>Send a message to start conversation</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
