import { useAuthContext } from "../../context/AuthContext";

const FriendButton = ({ receiverId }) => {
    const { authUser } = useAuthContext(); 

    const handleSendRequest = async () => {
        if (!authUser) {
            console.error('User not authenticated');
            return; // Prevent sending request if user is not authenticated
        }

        try {
            const res = await fetch('/api/friends/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: authUser._id,
                    receiverId: receiverId,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Error sending friend request:', errorData.error);
                return;
            }

            const data = await res.json();
            console.log(data.message);
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };
    return <button onClick={handleSendRequest}>Add Friend</button>;
};

export default FriendButton;
