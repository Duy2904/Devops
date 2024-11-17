import { IndexTourList } from '@src/new/fragments/Tour/TourList';
import { MyPermissions } from '@src/new/shared/utils/Permissions';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

export const FitToursPage: React.FC = () => {
    return (
        <IndexTourList
            permission={[MyPermissions.TourFitView, MyPermissions.AgencyTourFitView]}
            titleHeader={`${i18n.t('Danh sách')} ${i18n.t('tour.tourFit')}`}
            redirectUrl={rootPaths.fitTourForm}
            isFitTour
        />
    );
};
