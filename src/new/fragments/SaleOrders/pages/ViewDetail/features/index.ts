import { OrderStatus, SaleOrderDto, TourScheduleStatus } from '@sdk/tour-operations';

export enum TypeButton {
    // eslint-disable-next-line no-unused-vars
    Shorten = 'shorten',
    // eslint-disable-next-line no-unused-vars
    Full = 'full',
}

export const canClone = (data: SaleOrderDto | undefined) => {
    if (!data || !data.status) return false;

    return (
        (data.tourSchedule?.status === TourScheduleStatus.SalesOpen ||
            data.tourSchedule?.status === TourScheduleStatus.NoSeatsAvailable) &&
        data.status == OrderStatus.Canceled
    );
};

export const canChangeTour = (data: SaleOrderDto | undefined) => {
    if (!data || !data.status) return false;

    const listStatusCanChangeTour = [
        OrderStatus.New,
        OrderStatus.Confirming,
        OrderStatus.Confirmed,
        OrderStatus.Deposited,
        OrderStatus.Paid,
        OrderStatus.WaitRefund,
        OrderStatus.CompletedRefund,
    ];
    return listStatusCanChangeTour.includes(data.status);
};

export const canCreateVisaDocument = (data: SaleOrderDto | undefined) => {
    if (!data || !data.status) return false;

    const listStatusCanWork = [OrderStatus.Confirmed, OrderStatus.Deposited, OrderStatus.Paid];
    return listStatusCanWork.includes(data.status);
};
