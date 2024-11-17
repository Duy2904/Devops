import React from 'react';

import useHasAnyPermission from '../../hooks/useHasAnyPermission';

interface CanProps {
    permissions: string[];
    children: JSX.Element | null;
}

const Can: React.FC<CanProps> = ({ permissions, children }) => {
    return useHasAnyPermission(permissions) ? children : null;
};

export default Can;
