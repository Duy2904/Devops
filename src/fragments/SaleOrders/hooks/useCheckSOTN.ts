import { useLocation } from 'react-router-dom';

import { TourScheduleDto } from '@sdk/tour-operations';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';
import { isEmptyString } from '@utils/formHelper';

import { RouteCloneSOState } from '../features';

export const useCheckSOTN = () => {
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { tourSchedule } = useTourScheduleStore(state => state);
    const { saleOrder } = useSaleOrderStore(state => state);

    if (clonedId) {
        return false;
    }

    return (
        saleOrder?.tourSchedule?.hasTourThienNhien ||
        (!isEmptyString(saleOrder.id) && (tourSchedule as TourScheduleDto)?.hasTourThienNhien)
    );
};
