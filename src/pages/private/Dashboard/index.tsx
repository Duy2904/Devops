import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { rootPathsNew } from '@src/routers/newRoute';
import { MyPermissions } from '@utils/Permissions';

export const DashboardPage = () => {
    const navigate = useNavigate();

    const hasPermissionTourFit = useHasAnyPermission([MyPermissions.TourFitView]);
    const hasPermissionTourFitSchedule = useHasAnyPermission([MyPermissions.DepartureScheduleView]);

    const handleRedirect = useCallback(() => {
        if (hasPermissionTourFitSchedule) {
            return navigate({ pathname: rootPathsNew.tourFitDepartureSchedule }, { replace: true });
        }
        if (hasPermissionTourFit) {
            return navigate({ pathname: rootPathsNew.tourFit }, { replace: true });
        }
    }, [hasPermissionTourFit, hasPermissionTourFitSchedule, navigate]);

    useEffect(() => {
        handleRedirect();
    }, [handleRedirect]);

    return <></>;
};
