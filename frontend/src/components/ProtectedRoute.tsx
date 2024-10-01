import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuth: boolean;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuth, children }) => {
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
