import { TourScheduleStatus } from '@sdk/tour-operations';
import { getTourScheduleStatus } from '../../hooks/useTourFit';
import i18n from '@src/i18n';

export const tourStatus = getTourScheduleStatus();

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

export const tourGitStatus = [
    {
        label: i18n.t(`tour.status.${TourScheduleStatus.New}`),
        value: TourScheduleStatus.New,
    },
    {
        label: i18n.t(`tour.status.${TourScheduleStatus.WaitingForApproval}`),
        value: TourScheduleStatus.WaitingForApproval,
    },
    {
        label: i18n.t(`tour.status.${TourScheduleStatus.Approved}`),
        value: TourScheduleStatus.Approved,
    },
    {
        label: i18n.t(`tour.status.${TourScheduleStatus.Rejected}`),
        value: TourScheduleStatus.Rejected,
    },
];
