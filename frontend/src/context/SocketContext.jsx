import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";
import config from "../config/config";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (!authUser) {
            if (socket) {
                socket.close();
                setSocket(null);
            }
            return;
        }

        const newSocket = io(config.SOCKET_URL, {
            query: { userId: authUser._id }
        });

        newSocket.on("getOnlineUsers", setOnlineUsers);
        setSocket(newSocket);

        return () => newSocket.close();
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
