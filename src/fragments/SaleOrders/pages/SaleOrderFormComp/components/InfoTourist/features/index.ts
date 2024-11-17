import isNumber from 'lodash/isNumber';

import {
    ApproveOverloadStatus,
    OrderStatus,
    SaleOrderDto,
    SaleOrderLineTravellerDto,
    TourGitDto,
    TourScheduleDto,
    TourScheduleFareDto,
    TravellerOrderStatus,
} from '@sdk/tour-operations';
import { TourScheduleFareGroupingDto } from '@store/tourFareStore';

export const checkIsTravellersCountOnOrder = (code: string | undefined) => {
    return code !== 'INF';
};

export const getTourFareQuantity = (data: SaleOrderLineTravellerDto[], record: SaleOrderLineTravellerDto) => {
    return data
        .filter(x => x.id != record.id && x.passengerType?.code == record.passengerType?.code)
        .reduce(a => a + 1, 0);
};

export const getDataSelect = (tourFares: TourScheduleFareDto[], record: SaleOrderLineTravellerDto) => {
    return tourFares
        .filter(x => x.passengerTypeCode == record.passengerType?.code)
        .map(item => ({
            label: item.passengerTypeName ?? '',
            value: item.passengerTypeId ?? '',
        }));
};

export const getOutstandingTourFareCount = (data: SaleOrderLineTravellerDto[]) => {
    return data
        .filter(
            x =>
                checkIsTravellersCountOnOrder(x.passengerType?.code) &&
                (x.orderStatus == null || x.orderStatus == TravellerOrderStatus.Waiting),
        )
        .reduce(a => a + 1, 0);
};

export const getTravellerAmount = (data: SaleOrderLineTravellerDto[]) => {
    return data.reduce((total, record) => total + (record.tourPrice ?? 0), 0);
};

export const resStatusTouristAfterClone = (remainingCapacity: number, tourFareCode: string) => {
    if (remainingCapacity >= 0 || !checkIsTravellersCountOnOrder(tourFareCode)) return TravellerOrderStatus.Reserve;
    return TravellerOrderStatus.Waiting;
};

export const getListNewTravellerCloned = (resData: SaleOrderLineTravellerDto[], remainingCapacity: number) => {
    const dataFetch =
        resData?.map((item, index) => ({
            ...item,
            id: `soTravellerId-${index}`,
            orderStatus: resStatusTouristAfterClone(
                (remainingCapacity ?? 0) - (index + 1),
                item?.passengerType?.code ?? '',
            ),
            order: index,
        })) ?? [];
    return dataFetch;
};

export const getListNewTravellerFromTourDeparture = (resData: TourScheduleFareDto[], remainingCapacity: number) => {
    const dataFetch =
        resData?.map((item, index) => ({
            ...item,
            id: `soTravellerId-${index}`,
            orderStatus: resStatusTouristAfterClone(
                (remainingCapacity ?? 0) - (index + 1),
                item?.passengerTypeCode ?? '',
            ),
            order: index,
            passengerType: {
                code: item?.passengerTypeCode,
                id: item?.passengerTypeId,
            },
        })) ?? [];
    return dataFetch;
};

export const checkShowWarningOverloadModal = (
    data: SaleOrderLineTravellerDto[],
    tourSchedule: TourScheduleDto | TourGitDto,
    saleOrder: SaleOrderDto,
    isConfirmOverload: boolean,
    currentTourId: string | undefined,
    tourId: string | undefined,
    numberOfTravellers: number,
) => {
    const isOverloadCapacity = isNumber(tourSchedule?.remainingCapacity)
        ? numberOfTravellers > tourSchedule?.remainingCapacity
        : false;
    const statusCanShowWarning = [OrderStatus.New, OrderStatus.Confirming];
    const statusShouldShow = (saleOrder.status && statusCanShowWarning.includes(saleOrder.status)) || !saleOrder.status;
    const isApproveOverload = saleOrder.approveOverloadStatus === ApproveOverloadStatus.Allow;

    if (
        isOverloadCapacity &&
        !isApproveOverload &&
        statusShouldShow &&
        !isConfirmOverload &&
        currentTourId === tourId &&
        tourSchedule.id === tourId
    ) {
        const outstandingTourFareCount = getOutstandingTourFareCount(data);

        if (outstandingTourFareCount > 0) {
            return true;
        }
    }

    return false;
};

export const createNewTravellers = (
    tourFare: TourScheduleFareGroupingDto,
    tourFares: TourScheduleFareDto[],
    count: number,
    tourRemainingCapacity: number,
    numberTravellersCurrent: number,
    lastOrder: number,
) => {
    const newTravellers: SaleOrderLineTravellerDto[] = [];
    const newItemCount = tourFare.value - count;
    let tourRemainingCapacityTemp =
        tourRemainingCapacity - (checkIsTravellersCountOnOrder(tourFare.code) ? numberTravellersCurrent : 0);

    for (let index = 0; index < newItemCount; index++) {
        const order = lastOrder + index + 1;
        const newItem: SaleOrderLineTravellerDto = {
            id: `soTravellerId-${order}`,
            passengerTypeId: tourFare.id,
            passengerType: {
                id: tourFare.id,
                code: tourFare.code,
            },
            order: order,
        };
        newItem.orderStatus = resStatusTouristAfterClone(tourRemainingCapacityTemp, tourFare.code);

        if (tourRemainingCapacityTemp > 0 && checkIsTravellersCountOnOrder(tourFare.code)) {
            tourRemainingCapacityTemp--;
        }

        const tourScheduleFare = tourFares.filter(x => x.passengerTypeId == tourFare.id)[0];
        if (tourScheduleFare) {
            newItem.tourPrice = tourScheduleFare.taxInclusivePrice;
        }

        newTravellers.push(newItem);
    }

    return {
        newTravellers: newTravellers,
        tourRemainingCapacityTemp: tourRemainingCapacityTemp,
    };
};

export const checkNumberTravellersReserve = (saleOrderFares: SaleOrderLineTravellerDto[]) => {
    const travellersReserve = saleOrderFares.filter(x => x.orderStatus === TravellerOrderStatus.Reserve);
    return travellersReserve.length;
};

export const changeStatusTravellers = (
    saleOrderFares: SaleOrderLineTravellerDto[],
    tourSchedule: TourScheduleDto | TourGitDto | null,
) => {
    const newTravellers = [...saleOrderFares];
    const numberReserved = checkNumberTravellersReserve(newTravellers);

    // case tour have 0 slot
    if (tourSchedule?.remainingCapacity === 0) {
        newTravellers.map(item => {
            if (checkIsTravellersCountOnOrder(item.passengerType?.code)) {
                item.orderStatus = TravellerOrderStatus.Waiting;
            }
        });
    } else if (numberReserved < (tourSchedule?.remainingCapacity ?? 0)) {
        // case case traveller reserved < remaining capacity
        let numberRemainingCapacity = (tourSchedule?.remainingCapacity ?? 0) - numberReserved;

        newTravellers.map(item => {
            if (numberRemainingCapacity <= 0) {
                return;
            } else if (item.orderStatus === TravellerOrderStatus.Waiting && numberRemainingCapacity > 0) {
                item.orderStatus = TravellerOrderStatus.Reserve;
                numberRemainingCapacity--;
            }
        });
    } else if (tourSchedule?.remainingCapacity && numberReserved > tourSchedule?.remainingCapacity) {
        // case case traveller reserved > remaining capacity
        newTravellers.map((item, index) => {
            if (
                tourSchedule?.remainingCapacity &&
                index + 1 > tourSchedule?.remainingCapacity &&
                checkIsTravellersCountOnOrder(item.passengerType?.code)
            ) {
                item.orderStatus = TravellerOrderStatus.Waiting;
            }
        });
    }
    return newTravellers;
};
