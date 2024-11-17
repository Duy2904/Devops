import {
    DepositType,
    EstimateDiscountItemModel,
    ObjectType,
    OrderStatus,
    SaleOrderDto,
    SaleOrderLineTravellerDto,
    SaleOrderSearchDto,
    SearchSaleOrderViewDto,
    TourScheduleDto,
    TourScheduleFareDto,
    TourScheduleStatus,
} from '@sdk/tour-operations';
import { FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { SetStateAction } from 'react';

import { convertValues } from '@utils/formHelper';

import { splitNamePassengerType, TitleSplitPassengerType } from '../../../features';
import { TravellerSub } from '../type';

export interface RouteCloneSOState {
    clonedId?: string;
}

export interface RouteChangeTourSOState {
    changeTourSOId?: string;
}

export interface RouteCreateSOFromTourState {
    createSOFromTourId?: string;
}

export interface RouteCreateSOFromTourDepartureSchedule {
    createSOFromTourDepartureSchedule?: string;
    quantityOfGuest?: Record<string, number>;
    dataPromotionsApplied: EstimateDiscountItemModel[];
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

export const calculateRemainAmountForRefundSO = (saleOrder: SaleOrderDto, paymentAmt: number) => {
    const chargeAmount = (saleOrder.nonRefundableVisaFees ?? 0) + (saleOrder.penaltyFee ?? 0);
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

export const calculateComissionAmount = (
    tourSchedule: TourScheduleDto,
    totalPayment: number,
    // eslint-disable-next-line no-unused-vars
    setPercentageComission: (value: SetStateAction<number | undefined>) => void,
    travellers: SaleOrderLineTravellerDto[],
    commissionType: ObjectType,
) => {
    let commissionAmount = 0;

    const tourFit = tourSchedule;
    const tourFITCommissions = tourFit.commissionConditions?.filter(x => x.commissionTypeObjectType == commissionType);

    const percentageCommission = tourFITCommissions?.filter(
        x => x.depositType == DepositType.Percentage && x.commissionTypeObjectType == commissionType,
    )[0];

    if (percentageCommission) {
        commissionAmount = (percentageCommission.value ?? 0) * totalPayment;

        if (commissionType === ObjectType.Agent) {
            setPercentageComission(percentageCommission.value);
        } else if (commissionType === ObjectType.Referrer) {
            setPercentageComission(percentageCommission.value);
        }
    } else {
        // Cash type
        commissionAmount =
            tourFITCommissions?.reduce((total, item) => {
                const passengerCount = travellers.filter(x => x.passengerTypeId == item.passengerTypeId).length;

                return total + (item.value ?? 0) * passengerCount;
            }, 0) ?? 0;
    }

    return commissionAmount;
};

export const fetchDataTravellerMerge = (data?: SaleOrderDto) => {
    const dataSum: TravellerSub[] = [];
    const idInDataSum: string[] = [];

    const dataTravellerSort = data?.saleOrderLineTravellers?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    dataTravellerSort?.forEach(item => {
        if (!idInDataSum.includes(item.passengerTypeId!)) {
            idInDataSum.push(item.passengerTypeId!);
        }
    });

    const dataTemp =
        dataTravellerSort?.map(item => {
            const dataNameSplit: TitleSplitPassengerType = splitNamePassengerType(item.passengerType?.name ?? '');
            return {
                id: item.id,
                passengerTypeId: item.passengerTypeId,
                title: dataNameSplit.title,
                subTitle: dataNameSplit.subTitle,
                hasVisa: isNil(item?.hasVisa) ? false : item?.hasVisa,
                price: item?.tourPrice,
                passengerTypeCode: item.passengerType?.code,
                passengerTypeName: item.passengerType?.name,
            };
        }) ?? [];

    dataTemp.forEach(item => {
        const existingItem = dataSum.find(data => data.passengerTypeId === item.passengerTypeId);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity ?? 0) + 1;
            existingItem.totalPrice = (existingItem.totalPrice ?? 0) + (item.price ?? 0);
        } else {
            dataSum.push({
                ...item,
                quantity: 1,
            });
        }
    });

    return dataSum;
};

export function cloneDataSOLikeNew(dataSO: SaleOrderDto) {
    const newData = { ...dataSO };

    delete newData?.id;
    delete newData?.orderNo;
    delete newData?.discounts;
    delete newData?.discountCodes;
    delete newData?.totalDiscountAmt;
    delete newData?.saleOrderLines;
    delete newData?.status;
    delete newData?.depositAmt;
    delete newData?.integrationCommissionAmt;
    delete newData?.commissionAmt;
    delete newData?.agencyCommissionAmt;
    delete newData?.endCountDown;
    delete newData?.approveGuaranteeBy;
    delete newData?.approveGuaranteeOn;
    delete newData?.approveGuaranteeReason;
    delete newData?.approveGuaranteeStatus;
    delete newData?.approveOverloadStatus;
    delete newData?.approveStatus;
    delete newData?.approvedBy;
    delete newData?.approvedOn;
    delete newData?.approvedOverloadBy;
    delete newData?.approvedOverloadOn;
    delete newData?.isGroupGlobal;

    return newData;
}
