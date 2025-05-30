import { createContext, useState } from "react";
import { monacoLanguagePresets } from "../Data/laguageSupportData";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
    const totalLanguage = monacoLanguagePresets;
    const [languageChoosed , setLanguageChoosed] = useState(totalLanguage[0]);

    return (
        <LanguageContext.Provider 
            value={
                { 
                    totalLanguage,
                    languageChoosed , setLanguageChoosed
                }}>
            {children}
        </LanguageContext.Provider>
    );
};
