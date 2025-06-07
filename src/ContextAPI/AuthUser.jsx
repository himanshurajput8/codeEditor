import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [AuthUserData , setAuthUserData] = useState(null);
    const [isAuthPage , setShowisAuthPage] = useState(false);
    return (
        <AuthContext.Provider 
            value={
                {   
                    isAuthPage , setShowisAuthPage,
                    AuthUserData , setAuthUserData
                }}>
            {children}
        </AuthContext.Provider>
    );
};
