import { TourScheduleStatus } from '@sdk/tour-operations';
import i18n from '@src/i18n';

export const tourAgentStatus = [
    {
        label: i18n.t(`tour.status.${TourScheduleStatus.SalesOpen}`),
        value: TourScheduleStatus.SalesOpen,
    },
    {
        label: i18n.t(`tour.status.${TourScheduleStatus.NoSeatsAvailable}`),
        value: TourScheduleStatus.NoSeatsAvailable,
    },
    {
        label: i18n.t(`tour.status.${TourScheduleStatus.SaleTimeExpired}`),
        value: TourScheduleStatus.SaleTimeExpired,
    },
];
