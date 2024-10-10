import { useAuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';

const FriendButton = ({ receiverId }) => {
    const { authUser } = useAuthContext(); 

    console.log("FriendButton received receiverId:", receiverId); // Add this line

    const handleSendRequest = async (e) => {
        e.stopPropagation(); // Prevent the click from bubbling up

        if (!authUser) {
            console.error('User not authenticated');
            toast.error('You must be logged in to send a friend request');
            return;
        }

        if (!receiverId) {
            console.error('Receiver ID is missing');
            toast.error('Unable to send friend request: Receiver ID is missing');
            return;
        }

        try {
            console.log('Sending friend request:', { senderId: authUser._id, receiverId });

            const res = await fetch('/api/friends/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add this if you're using token-based auth
                },
                body: JSON.stringify({
                    senderId: authUser._id,
                    receiverId: receiverId,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Error sending friend request:', errorData.error);
                toast.error(errorData.error || 'Failed to send friend request');
                return;
            }

            const data = await res.json();
            console.log(data.message);
            toast.success('Friend request sent successfully');
        } catch (error) {
            console.error('Error sending friend request:', error);
            toast.error('An error occurred while sending the friend request');
        }
    };

    return <button onClick={handleSendRequest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Add Friend</button>;
};

export default FriendButton;
