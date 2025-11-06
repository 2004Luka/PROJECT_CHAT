import { useAuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import { FaUserPlus, FaSpinner } from 'react-icons/fa';
import { useState } from 'react';

const FriendButton = ({ receiverId }) => {
    const { authUser } = useAuthContext(); 
    const [isLoading, setIsLoading] = useState(false);

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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    senderId: authUser._id,
                    receiverId: receiverId,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.error || 'Failed to send friend request');
                return;
            }

            const data = await res.json();
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
            disabled={isLoading}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-[#00FF99] font-semibold font-mono py-2 px-3 border border-[#00FF99] hover:border-[#00E689] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-xs sm:text-sm transition-colors duration-200"
        >
            {isLoading ? (
                <>
                    <FaSpinner className='animate-spin' />
                    <span className='hidden sm:inline'>Sending...</span>
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