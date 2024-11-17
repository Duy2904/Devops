import { AnyObject } from 'antd/es/_util/type';

import { SaleOrderLineTravellerDto, TourScheduleDto, TravellerOrderStatus } from '@sdk/tour-operations';
import Format from '@src/new/shared/utils/format';

import { defaultID, TravellerSub } from '../../../../type';

export const checkIsTravellersCountOnOrder = (code: string | undefined) => {
    return code !== 'INF';
};

function addTravellers({
    item,
    quantityShouldCreate,
    index,
    tourRemainingCapacityTemp,
    newData,
}: {
    item: TravellerSub;
    quantityShouldCreate: number;
    index: number;
    tourRemainingCapacityTemp: number;
    newData: SaleOrderLineTravellerDto[];
}) {
    Array.from({ length: quantityShouldCreate ?? 0 }, () => {
        const newItem: SaleOrderLineTravellerDto = {
            id: `${defaultID.travellers}-${index + 1}`,
            passengerTypeId: item.passengerTypeId,
            passengerType: {
                id: item.passengerTypeId,
                code: item.passengerTypeCode,
                name: item.passengerTypeName,
            },
            order: index + 1,
            hasVisa: item.hasVisa,
            tourPrice: item.price,
            orderStatus:
                tourRemainingCapacityTemp > 0 || !checkIsTravellersCountOnOrder(item.passengerTypeCode)
                    ? TravellerOrderStatus.Reserve
                    : TravellerOrderStatus.Waiting,
        };

        newData.push(newItem);
        index++;
        tourRemainingCapacityTemp--;
    });

    return { dataReturn: newData, indexReturn: index, tourRemainingCapacityTempReturn: tourRemainingCapacityTemp };
}

function removeTravellers({
    quantityRendered,
    itemQuantity,
    newData,
    dataSource,
    item,
}: {
    quantityRendered: number;
    itemQuantity: number;
    newData: SaleOrderLineTravellerDto[];
    dataSource: SaleOrderLineTravellerDto[];
    item: TravellerSub;
}) {
    let numberTravellerShouldRemove = quantityRendered - itemQuantity;

    for (let i = dataSource.length - 1; i >= 0; i--) {
        if (
            dataSource[i].passengerTypeId === item.passengerTypeId &&
            !!dataSource[i].hasVisa === !!item.hasVisa &&
            numberTravellerShouldRemove > 0
        ) {
            newData = newData.splice(0, i);
            numberTravellerShouldRemove--;
        }
    }

    return { dataReturn: newData };
}

export function createTravellers({
    dataTotalTravellerForm,
    dataSource,
    lastOrder,
    numberOfTravellers,
    dataTourSchedule,
}: {
    dataTotalTravellerForm: TravellerSub[];
    dataSource: SaleOrderLineTravellerDto[];
    lastOrder: number;
    numberOfTravellers: number;
    dataTourSchedule: TourScheduleDto | undefined;
}) {
    let shouldUpdate = false;
    let newData: SaleOrderLineTravellerDto[] = [];
    let index = lastOrder;
    if (!(numberOfTravellers === dataSource.length && numberOfTravellers === 0)) {
        const numberNewTravellers = dataSource.reduce(
            (count, x) =>
                count +
                (x.id?.includes(defaultID.travellers) && checkIsTravellersCountOnOrder(x.passengerType?.code) ? 1 : 0),
            0,
        );

        let tourRemainingCapacityTemp = (dataTourSchedule?.remainingCapacity ?? 0) - numberNewTravellers;

        dataTotalTravellerForm.forEach(item => {
            const itemQuantity = Number(item?.quantity ?? 0);
            const listEachItem = dataSource.filter(x => x.passengerTypeId === item.passengerTypeId);

            const quantityRendered = listEachItem.length;

            if (quantityRendered === itemQuantity) {
                if (quantityRendered > 0 && listEachItem[0].tourPrice !== item.price) {
                    const newListItem = listEachItem.map(x => {
                        return {
                            ...x,
                            tourPrice: item.price,
                        };
                    });
                    newData = [...newData, ...newListItem];
                    shouldUpdate = true;
                } else if (quantityRendered > 0) {
                    newData = [...newData, ...listEachItem];
                }
                return;
            } else {
                shouldUpdate = true;

                if (itemQuantity === 0) {
                    newData = newData.filter(
                        x => !(x.passengerTypeId === item.passengerTypeId && x.hasVisa === item.hasVisa),
                    );
                } else if (itemQuantity > 0 && itemQuantity > quantityRendered) {
                    const quantityShouldCreate = itemQuantity - quantityRendered;
                    const { dataReturn, indexReturn, tourRemainingCapacityTempReturn } = addTravellers({
                        item,
                        quantityShouldCreate,
                        index,
                        tourRemainingCapacityTemp,
                        newData,
                    });

                    index = indexReturn;
                    tourRemainingCapacityTemp = tourRemainingCapacityTempReturn;
                    newData = [...dataReturn, ...listEachItem];
                } else if (itemQuantity > 0 && itemQuantity < quantityRendered) {
                    const { dataReturn } = removeTravellers({
                        quantityRendered,
                        itemQuantity,
                        newData,
                        dataSource,
                        item,
                    });

                    newData = dataReturn;
                }
            }
        });

        newData = changeStatusTravellers(newData, dataTourSchedule);
        newData = Format.formatSortListByOrder(newData);
    }

    return {
        shouldUpdate: shouldUpdate || newData.length !== dataSource.length,
        newData: newData,
        lastIndex: index,
    };
}

export const checkNumberTravellersReserve = (saleOrderFares: SaleOrderLineTravellerDto[]) => {
    const travellersReserve = saleOrderFares.filter(x => x.orderStatus === TravellerOrderStatus.Reserve);
    return travellersReserve.length;
};

export const changeStatusTravellers = (
    saleOrderFares: SaleOrderLineTravellerDto[],
    tourSchedule: TourScheduleDto | undefined,
) => {
    const newTravellers = [...saleOrderFares];
    const numberReserved = checkNumberTravellersReserve(newTravellers);

    // case tour have 0 slot
    if (tourSchedule?.remainingCapacity === 0) {
        newTravellers.map(item => {
            if (checkIsTravellersCountOnOrder(item.passengerType?.code) && item.id?.includes(defaultID.travellers)) {
                item.orderStatus = TravellerOrderStatus.Waiting;
            }
        });
    } else if (numberReserved < (tourSchedule?.remainingCapacity ?? 0)) {
        // case case traveller reserved < remaining capacity
        let numberRemainingCapacity = (tourSchedule?.remainingCapacity ?? 0) - numberReserved;

        newTravellers.map(item => {
            if (numberRemainingCapacity <= 0) {
                return;
            } else if (numberRemainingCapacity > 0) {
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
                checkIsTravellersCountOnOrder(item.passengerType?.code) &&
                item.id?.includes(defaultID.travellers)
            ) {
                item.orderStatus = TravellerOrderStatus.Waiting;
            }
        });
    }
    return newTravellers;
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

export const mapRoom = (roomType: AnyObject, roomNumber: AnyObject) => {
    const resultObject: { [key: string]: number[] } = {};

    for (const [key, valueFromObject2] of Object.entries(roomType)) {
        if (Object.prototype.hasOwnProperty.call(roomNumber, key)) {
            resultObject[valueFromObject2] = (resultObject[valueFromObject2] || []).concat(roomNumber[key]);
        }
    }

    const result: { key: string; value: number }[] = Object.entries(resultObject).map(([key, values]) => ({
        key,
        value: [...new Set(values)].length,
    }));

    return result;
};
