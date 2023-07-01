import React, { createContext, useEffect, useState } from "react";

export interface DarkModeContextType {
        darkMode: boolean;
        setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<DarkModeContextType>({
        darkMode: true,
        setDarkMode: () => {
        }
});

interface DarkModeContextProviderProps {
        children: React.ReactNode;
}

const DarkModeContextProvider: React.FC<DarkModeContextProviderProps> = ({ children }) => {
        
        //this arrow function is needed for dodging localStorage Error (is not defined)
        const [ darkMode, setDarkMode ] = useState(true);
        
        useEffect(() => {
                window.localStorage.getItem("DarkMode") == "true" ? setDarkMode(true) : setDarkMode(false);
        }, []);
        
        const contextValue: DarkModeContextType = {
                darkMode,
                setDarkMode
        };
        
        return (
            <DarkModeContext.Provider value={contextValue}>
                    {children}
            </DarkModeContext.Provider>
        );
};

export default DarkModeContextProvider;