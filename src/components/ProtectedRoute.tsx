
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'cliente' | 'mecanico';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard if user doesn't have required role
    const redirectPath = user?.role === 'cliente' ? '/cliente/dashboard' : '/';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
