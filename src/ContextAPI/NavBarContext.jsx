import { createContext, useState } from "react";

export const NavContext = createContext();

export const NavContextProvider = ({ children }) => {
    const [isnav, setNav] = useState(true);

    return (
        <NavContext.Provider 
            value={
                { 
                    isnav, setNav
                }}>
            {children}
        </NavContext.Provider>
    );
};
