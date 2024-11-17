import { IndexTourList } from '@fragments/Tour/TourList';
import { MyPermissions } from '@utils/Permissions/index.ts';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

export const ToursGit: React.FC = () => {
    return (
        <IndexTourList
            permission={[MyPermissions.TourGitView]}
            titleHeader={i18n.t('tour.tourGit')}
            redirectUrl={rootPaths.gitTourForm}
            permissionSearch={[MyPermissions.TourGitView]}
            isFitTour={false}
        />
    );
};
