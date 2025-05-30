import { createContext, useState } from "react";


export const FullScreenContext = createContext();

export const FullScreenContextProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16);
    const [isFullScreen, setFullScreen] = useState(false);
    const [miniMap, toggleMiniMap] = useState(true);
    const [isSettingOpen, setSettingToOpen] = useState(false);

    return (
        <FullScreenContext.Provider value={
            { 
                isFullScreen, setFullScreen ,
                fontSize, setFontSize,
                miniMap, toggleMiniMap,
                isSettingOpen, setSettingToOpen
            }}>
            {children}
        </FullScreenContext.Provider>
    );
};
