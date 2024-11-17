import { SetStateAction } from 'react';

import { DepositType, ObjectType, SaleOrderLineTravellerDto, TourScheduleDto } from '@sdk/tour-operations';

export const calculateComissionAmount = (
    tourSchedule: TourScheduleDto,
    travellerTotalAmount: number,
    surchargeTotalAmount: number,
    // eslint-disable-next-line no-unused-vars
    setPercentageComission: (value: SetStateAction<number | undefined>) => void,
    // eslint-disable-next-line no-unused-vars
    setPercentageComissionAgent: (value: SetStateAction<number | undefined>) => void,
    travellers: SaleOrderLineTravellerDto[],
    vat: number,
    commissionType: ObjectType,
) => {
    let commissionAmount = 0;

    const tourFit = tourSchedule;
    const tourFITCommissions = tourFit.commissionConditions?.filter(x => x.commissionTypeObjectType == commissionType);

    const percentageCommission = tourFITCommissions?.filter(
        x => x.depositType == DepositType.Percentage && x.commissionTypeObjectType == commissionType,
    )[0];

    if (percentageCommission) {
        // This total amount should calculate with voucher amount
        const totalAmount = (travellerTotalAmount ?? 0) + (surchargeTotalAmount ?? 0);
        commissionAmount = (percentageCommission.value ?? 0) * (totalAmount + totalAmount * vat);
        console.log(vat);
        if (commissionType === ObjectType.Agent) {
            setPercentageComissionAgent(percentageCommission.value);
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
