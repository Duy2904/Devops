import { useLocation } from 'react-router-dom';

import { SaleOrderDto, TourScheduleDto } from '@sdk/tour-operations';
import { TourNatureType } from '@src/types/TypeEnum';
import { isEmptyString } from '@utils/formHelper';

import { RouteCloneSOState } from '../features';

export const useCheckTourSendGuest = ({
    dataSO,
    dataTourSchedule,
}: {
    dataSO?: SaleOrderDto;
    dataTourSchedule?: TourScheduleDto;
}) => {
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;

    if (clonedId) {
        return false;
    }

    return (
        dataSO?.tourSchedule?.tourNature === TourNatureType.SendGuest ||
        (isEmptyString(dataSO?.id) && dataTourSchedule?.tourNature === TourNatureType.SendGuest)
    );
};
