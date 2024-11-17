import { TourScheduleStatus } from '@sdk/tour-operations';

const colorStatusTour = [
    { status: TourScheduleStatus.New, color: 'bg-state-info' },
    { status: TourScheduleStatus.SalesOpen, color: 'bg-state-success' },
    { status: TourScheduleStatus.NoSeatsAvailable, color: 'bg-slate-400' },
    { status: TourScheduleStatus.SaleTimeExpired, color: 'bg-state-error' },
    { status: TourScheduleStatus.Cancel, color: 'bg-state-error' },
    { status: TourScheduleStatus.WaitingForApproval, color: 'bg-violet-600' },
    { status: TourScheduleStatus.Approved, color: 'bg-cyan-500' },
    { status: TourScheduleStatus.Rejected, color: 'bg-amber-600' },
];

export const getColorStatusTour = (status: TourScheduleStatus | string) => {
    return colorStatusTour.find(item => item.status === status)?.color;
};
