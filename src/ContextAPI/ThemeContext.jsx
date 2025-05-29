import { createContext, useState } from "react";


export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(['vs-dark','hc-black','vs']);
    const [themeCoosed, setThemeCossed] = useState(theme[0]);

    return (
        <ThemeContext.Provider 
            value={
                { 
                    theme, setTheme ,
                    themeCoosed, setThemeCossed
                }}>
            {children}
        </ThemeContext.Provider>
    );
};
