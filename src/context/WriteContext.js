import React, { createContext, useContext, useState } from 'react';

const WriteContext = createContext();

export const useWriteContext = () => useContext(WriteContext);

export const WriteProvider = ({ children }) => {
    const [write, setWrite] = useState(false);
    const [mumble, setMumble] = useState("");
    const [data, setData] = useState([]);

    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    
    return (
        <WriteContext.Provider value={{ 
            write, setWrite, 
            mumble, setMumble, 
            data, setData, 
            first, setFirst, 
            second, setSecond
        }}>
            {children}
        </WriteContext.Provider>
    );
};