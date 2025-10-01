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
            className="flex items-center gap-1 sm:gap-2 bg-white/10 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg border border-white/10 disabled:cursor-not-allowed text-xs sm:text-sm"
        >
            {isLoading ? (
                <>
                    <FaSpinner />
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