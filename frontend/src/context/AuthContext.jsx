import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();


export const useAuthContext = () =>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user"))||null)
    
    useEffect(() => {
        // Optional: You can add a listener to update authUser if the token changes
        const token = localStorage.getItem('token');
        if (!token) {
            setAuthUser(null); // Clear user if no token
        }
    }, []);

    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
    </AuthContext.Provider>
}
