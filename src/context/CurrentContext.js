import React, { createContext, useContext, useState } from 'react';

const CurrentContext = createContext();

export const useCurrentContext = () => useContext(CurrentContext);

export const CurrentProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState([]);
    
    return (
        <CurrentContext.Provider value={{ 
            currentUser, setCurrentUser
        }}>
            {children}
        </CurrentContext.Provider>
    );
};