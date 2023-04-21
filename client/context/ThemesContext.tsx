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
    const getStoredDarkMode = (): boolean => {
        const storedDarkMode = typeof window !== "undefined" && localStorage.getItem("DarkMode");
        return storedDarkMode ? JSON.parse(storedDarkMode) : true;
    };
    
    const [ darkMode, setDarkMode ] = useState<boolean>(getStoredDarkMode);
    
    useEffect(() => {
        localStorage.setItem("DarkMode", JSON.stringify(darkMode));
        document.body.style.background =
            darkMode
                ? "#212121" // for dark theme
                : "#FFFFFF"; // for light theme
        document.body.style.color =
            darkMode
                ? "white" // for dark theme
                : "navy"; // for light theme
    }, [ darkMode ]);
    
    const contextValue: DarkModeContextType = {
        darkMode,
        setDarkMode
    };
    
    console.log(darkMode);
    
    return (
        <DarkModeContext.Provider value={contextValue}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeContextProvider;