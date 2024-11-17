import { IndexTourList } from '@fragments/Tour/TourList';
import { MyPermissions } from '@utils/Permissions/index.ts';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

export interface ToursProps {}

// eslint-disable-next-line no-unused-vars
export const Tours: React.FC = (_props: ToursProps) => {
    return (
        <IndexTourList
            permission={[MyPermissions.TourFitView, MyPermissions.AgencyTourFitView]}
            titleHeader={`${i18n.t('Danh sách')} ${i18n.t('tour.tourFit')}`}
            redirectUrl={rootPaths.fitTourForm}
            permissionSearch={[MyPermissions.TourFitView, MyPermissions.AgencyTourFitView]}
            isFitTour
        />
    );
};
