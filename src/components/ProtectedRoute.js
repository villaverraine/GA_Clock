// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useUser();
    const userRole = user.profile.role;

    // Check if the user's role is in the allowed roles
    if (allowedRoles.includes(userRole)) {
        return children;
    } else {
        // Redirect to the dashboard if not allowed
        return <Navigate to="/dashboard" replace />;
    }
};

export default ProtectedRoute;
