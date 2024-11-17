import { Navigate } from 'react-router-dom';
import React from 'react';
import { rootPaths } from './route';
import useHasAnyPermission from '../hooks/useHasAnyPermission';

interface ProtectedRouteProps {
    permissions: string[];
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ permissions, children }) => {
    const hasPermission = useHasAnyPermission(permissions);
    return hasPermission ? children : <Navigate to={rootPaths.privateUnauthorized} replace />;
};

export default ProtectedRoute;
