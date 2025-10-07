import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requiresAdmin = false }) => {
  const { user, loading, isAdminUser } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiresAdmin && !isAdminUser) {
    return <Navigate to="/dashboard" state={{ from: location, unauthorized: true }} replace />;
  }

  return children;
};

export default ProtectedRoute;
