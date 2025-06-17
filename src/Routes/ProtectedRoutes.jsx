// src/routes/ProtectedRoutes.jsx
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../ContextAPI/AuthUser';

export default function ProtectedRoutes({ children }) {
  const { isUserLogged, isAuthLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isAuthLoading) return <div>Loading...</div>;

  if (!isUserLogged) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/signUp?redirect=${redirect}`} state={{from:location}} replace />;
  }

  return children;
}