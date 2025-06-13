import React, { useContext } from 'react'
import { AuthContext } from '../ContextAPI/AuthUser';
import { Navigate, useLocation } from 'react-router-dom';


export default function ProtectedRoutes({children}) {
    const {isUserLogged} = useContext(AuthContext);
    const location = useLocation();

    if (!isUserLogged) return <Navigate to='/'/>;

  return children
}
