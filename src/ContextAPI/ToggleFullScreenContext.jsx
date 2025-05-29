import { createContext, useState } from "react";


export const FullScreenContext = createContext();

export const FullScreenContextProvider = ({ children }) => {
    const [isFullScreen, setFullScreen] = useState(false);

    return (
        <FullScreenContext.Provider value={{ isFullScreen, setFullScreen }}>
            {children}
        </FullScreenContext.Provider>
    );
};
