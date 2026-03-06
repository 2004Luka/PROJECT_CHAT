import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("chat-user")) || null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        // Validation could be added here later if needed
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
