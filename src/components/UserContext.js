import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : { 
            profile: { _id: '', username: '', email: '', firstName: '', lastName: '', role: '' }, 
            token: ''
        };
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const clearUser = () => {
        setUser({ 
            profile: { _id: '', username: '', email: '', firstName: '', lastName: '', role: '' }, 
            token: ''
        });
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
