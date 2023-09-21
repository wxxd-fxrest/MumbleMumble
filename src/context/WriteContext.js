import React, { createContext, useContext, useState } from 'react';

const WriteContext = createContext();

export const useWriteContext = () => useContext(WriteContext);

export const WriteProvider = ({ children }) => {
    const [write, setWrite] = useState(false);
    const [mumble, setMumble] = useState("");

    return (
        <WriteContext.Provider value={{ write, setWrite, mumble, setMumble }}>
            {children}
        </WriteContext.Provider>
    );
};