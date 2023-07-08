import React, { useEffect, useState } from "react";
import { createContext } from "use-context-selector";

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
    const [ darkMode, setDarkMode ] = useState(true);

    useEffect(() => {
        darkMode ? document.body.style.background = "#212121" : document.body.style.background = "#FFFFFF";
    }, [darkMode])

    useEffect(() => {
        window.localStorage.getItem("DarkMode") == "true" ? setDarkMode(true) : setDarkMode(false);
    }, []);

    return (
        <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeContextProvider;