import { FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';

import {
    OrderStatus,
    SaleOrderDto,
    SaleOrderLineTravellerDto,
    SaleOrderSearchDto,
    SearchSaleOrderViewDto,
    TourScheduleFareDto,
    TourScheduleStatus,
} from '@sdk/tour-operations';
import { convertValues } from '@utils/formHelper';

export interface RouteCloneSOState {
    clonedId?: string;
}

export interface RouteChangeTourSOState {
    changeTourSOId?: string;
}

export interface RouteCreateSOFromTourState {
    createSOFromTourId?: string;
}

export interface TitleSplitPassengerType {
    title: string;
    subTitle: string;
}

export enum TypeButton {
    // eslint-disable-next-line no-unused-vars
    Shorten = 'shorten',
    // eslint-disable-next-line no-unused-vars
    Full = 'full',
}

export const canClone = (data: SearchSaleOrderViewDto) => {
    return (
        (data.tourScheduleStatus === TourScheduleStatus.SalesOpen ||
            data.tourScheduleStatus === TourScheduleStatus.NoSeatsAvailable) &&
        data.status == OrderStatus.Canceled
    );
};

export const canChangeTour = (data: SaleOrderDto) => {
    if (!data.status) return false;

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

export const forbiddenUpdateContent = (data: SaleOrderDto) => {
    if (!data.status) return false;

    const arrStatusForbiddenUpdate = [
        OrderStatus.Canceled,
        OrderStatus.WaitRefund,
        OrderStatus.SendRefund,
        OrderStatus.CompletedRefund,
    ];

    return arrStatusForbiddenUpdate.includes(data.status);
};

export const canCreateVisaDocument = (data: SaleOrderDto) => {
    if (!data.status) return false;

    const listStatusCanWork = [OrderStatus.Confirmed, OrderStatus.Deposited, OrderStatus.Paid];
    return listStatusCanWork.includes(data.status);
};

export const removeID = (formData: AnyObject[], defaultID: string) => {
    const dataList = formData.map(item => {
        if (item?.id?.startsWith(defaultID)) {
            delete item.id;
        }
        return item;
    });

    return dataList;
};

export const removeDefaultID = (values: { [x: string]: { [y: string]: string } }, defaultID: string) => {
    const formData = convertValues(values);
    const dataList = removeID(formData, defaultID);

    return dataList;
};

export const transformDataForm = (form: FormInstance, defaultID: string) => {
    if (!isEmpty(form.getFieldsValue())) {
        const convertData = convertValues(form.getFieldsValue());
        const data = removeID(convertData, defaultID);
        return data;
    }
    return [];
};

export const calculateRemainAmountForRefundSO = (saleOrder: SaleOrderDto) => {
    const chargeAmount = (saleOrder.nonRefundableVisaFees ?? 0) + (saleOrder.penaltyFee ?? 0);
    const paymentAmt = saleOrder.paymentAmt ?? 0;
    const totalReturnAmt = saleOrder.totalReturnAmt ?? 0;

    return chargeAmount > paymentAmt ? 0 : chargeAmount - paymentAmt + totalReturnAmt;
};

export const checkIsRefundSO = (SOStatus: OrderStatus | null | undefined) => {
    return SOStatus === OrderStatus.CompletedRefund || SOStatus === OrderStatus.WaitRefund;
};

export const isOnlyOneStatus = (status: OrderStatus, rowSelected: React.Key[], saleOrderData: SaleOrderSearchDto[]) => {
    if (rowSelected?.length === 0) return false;

    const filterStatus = saleOrderData?.filter(
        item => item.id && rowSelected.includes(item.id) && item.status === status,
    );

    return filterStatus.length === rowSelected.length;
};

export const checkStatusSO = (rowSelected: React.Key[], saleOrderData: SaleOrderSearchDto[]) => {
    if (isOnlyOneStatus(OrderStatus.Confirming, rowSelected, saleOrderData)) {
        return OrderStatus.Confirming;
    } else if (isOnlyOneStatus(OrderStatus.New, rowSelected, saleOrderData)) {
        return OrderStatus.New;
    }
};

export const shouldDisableAllForm = (SOStatus: OrderStatus | null | undefined) => {
    return (
        SOStatus === OrderStatus.Canceled ||
        SOStatus === OrderStatus.WaitRefund ||
        SOStatus === OrderStatus.SendRefund ||
        SOStatus === OrderStatus.CompletedRefund
    );
};

export const findTourScheduleFares = (
    tourScheduleFares: TourScheduleFareDto[],
    travellerInfo: SaleOrderLineTravellerDto,
) => {
    return tourScheduleFares?.find(x => travellerInfo.passengerTypeId === x.passengerTypeId);
};

export const statusShowCountDown = [OrderStatus.New, OrderStatus.Confirming];

export const calculateSecondsToEnd = (endDateISO: string): number => {
    // Convert the end date to a Date object
    const endDate = dayjs(endDateISO).unix();

    // Get the current date and time
    const currentDate = dayjs().unix();

    // Calculate the remain time in seconds
    const timeRemain: number = endDate - currentDate;

    return timeRemain > 0 ? parseInt(timeRemain.toFixed()) : 0;
};

export const splitNamePassengerType = (name: string): TitleSplitPassengerType => {
    const indexOfSlice = name.indexOf('(');
    return {
        title: name.slice(0, indexOfSlice),
        subTitle: name.slice(indexOfSlice, name.length),
    };
};
