import isEmpty from 'lodash/isEmpty';

import { TourScheduleDto, TourScheduleFareDto } from '@sdk/tour-operations';
import { splitNamePassengerType, TitleSplitPassengerType } from '@src/new/fragments/SaleOrders/features';
import Format from '@src/new/shared/utils/format';

import { TravellerSub } from '../../../../type';

export const splitTourFareWithVisa = (dataTourSchedule: TourScheduleDto, dataPrev: TravellerSub[]) => {
    const newData: TravellerSub[] = [];
    const tourFaresSort: TourScheduleFareDto[] = Format.formatSortListByOrder(dataTourSchedule?.tourScheduleFares);

    tourFaresSort?.forEach(item => {
        const dataNameSplit: TitleSplitPassengerType = splitNamePassengerType(item.passengerTypeName ?? '');

        let quantity = undefined;

        if (!isEmpty(dataPrev)) {
            quantity =
                dataPrev.find(x => x.passengerTypeId?.includes(item.passengerTypeId ?? ''))?.quantity ?? undefined;
        }

        newData.push({
            ...item,
            id: item.passengerTypeId,
            hasVisa: false,
            title: dataNameSplit.title,
            subTitle: dataNameSplit.subTitle,
            price: item.taxInclusivePrice,
            quantity: quantity ? Number(quantity) : undefined,
        });
    });

    return { newData };
};
