import { CommissionConditionDto, DepositType } from '@sdk/tour-operations';

export enum TourCommissionType {
    AgentType = 'AgentType',
    ReferrerType = 'ReferrerType',
}

export interface TransformedCommissionConditionDto {
    id: string;
    commissionTypeId: string;
    depositType: DepositType | undefined;
    tourScheduleId: string | undefined;
    commissionTypeName: string | undefined;
    commissionTypeCode: string | undefined;
    commissionTypeObjectType: string | undefined;
    value: number;
    passengerList: {
        id: string;
        passengerTypeId: string;
        passengerTypeCode: string;
        passengerTypeName: string;
        value: number;
    }[];
}

export const mapToTransformedCommissionCondition = (
    commissionConditions: CommissionConditionDto[],
): TransformedCommissionConditionDto[] => {
    const transformedCommissions: Record<string, TransformedCommissionConditionDto> = {};

    commissionConditions.forEach(condition => {
        const {
            id = '',
            tourScheduleId,
            commissionTypeName,
            commissionTypeCode,
            commissionTypeObjectType,
            commissionTypeId,
            depositType,
            passengerTypeId = '',
            passengerTypeCode = '',
            passengerTypeName = '',
            value = 0,
        } = condition;

        if (commissionTypeId === undefined) return;

        const key = commissionTypeId;

        if (condition.depositType == DepositType.Cash) {
            if (!transformedCommissions[key]) {
                transformedCommissions[key] = {
                    id,
                    commissionTypeId,
                    depositType,
                    tourScheduleId,
                    commissionTypeName,
                    commissionTypeCode,
                    commissionTypeObjectType,
                    value: 0,
                    passengerList: [],
                };
            }

            transformedCommissions[key].passengerList.push({
                id,
                passengerTypeId: passengerTypeId ?? '',
                passengerTypeCode,
                passengerTypeName,
                value,
            });
        } else {
            transformedCommissions[key] = {
                id,
                commissionTypeId,
                depositType,
                tourScheduleId,
                commissionTypeName,
                commissionTypeCode,
                commissionTypeObjectType,
                value: 0,
                passengerList: [],
            };
        }

        transformedCommissions[key].value += value;
    });

    return Object.values(transformedCommissions);
};
