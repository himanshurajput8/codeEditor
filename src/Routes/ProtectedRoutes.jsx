import React, { useContext } from 'react';
import { AuthContext } from '../ContextAPI/AuthUser';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoutes({ children }) {
  const { isUserLogged, isAuthLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  if (!isUserLogged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}