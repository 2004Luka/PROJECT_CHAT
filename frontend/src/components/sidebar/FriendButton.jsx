import { useAuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import { FaUserPlus, FaSpinner, FaUserCheck } from 'react-icons/fa';
import { useState } from 'react';

const FriendButton = ({ receiverId }) => {
    const { authUser } = useAuthContext(); 
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [isAlreadySent, setIsAlreadySent] = useState(false);

    const handleSendRequest = async (e) => {
        e.stopPropagation();

        if (!authUser) {
            toast.error('You must be logged in to send a friend request');
            return;
        }

        if (!receiverId) {
            toast.error('Unable to send friend request: Receiver ID is missing');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/friends/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    senderId: authUser._id,
                    receiverId: receiverId,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                if (res.status === 400 && errorData.error === 'Request already sent or users are already friends') {
                    setIsAlreadySent(true);
                    toast.error('Friend request already sent');
                } else {
                    toast.error(errorData.error || 'Failed to send friend request');
                }
                return;
            }

            const data = await res.json();
            setIsSent(true);
            toast.success('Friend request sent successfully');
        } catch (error) {
            console.error('Error sending friend request:', error);
            toast.error('An error occurred while sending the friend request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            onClick={handleSendRequest} 
            disabled={isLoading || isSent || isAlreadySent}
            className={`flex items-center gap-1.5 sm:gap-2 font-semibold font-mono py-2 px-3 border focus:outline-none disabled:cursor-not-allowed text-xs sm:text-sm transition-colors duration-200 
                ${isSent 
                    ? "bg-[#00FF99] text-[#111111] border-[#00FF99] opacity-80" 
                    : isAlreadySent
                    ? "bg-[#FF9900] text-[#111111] border-[#FF9900] opacity-80"
                    : "bg-[#111111] hover:bg-[#2A2A2A] text-[#00FF99] border-[#00FF99] hover:border-[#00E689] disabled:opacity-50"
                }`}
        >
            {isLoading ? (
                <>
                    <FaSpinner className='animate-spin' />
                    <span className='hidden sm:inline'>Sending...</span>
                </>
            ) : isSent ? (
                <>
                    <FaUserCheck />
                    <span className='hidden sm:inline'>Sent</span>
                </>
            ) : isAlreadySent ? (
                <>
                    <FaUserCheck />
                    <span className='hidden sm:inline'>Already Sent</span>
                </>
            ) : (
                <>
                    <FaUserPlus />
                    <span className='hidden sm:inline'>Add Friend</span>
                </>
            )}
        </button>
    );
};

export default FriendButton;