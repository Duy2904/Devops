import { Flex } from 'antd';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { SaleOrderDto } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';
import { useCheckTourSendGuest } from '@src/new/fragments/SaleOrders/hooks/useCheckTourSendGuest';

interface CommissionCollabProps {
    data?: SaleOrderDto;
}

export const CommissionCollab: React.FC<CommissionCollabProps> = ({ data }) => {
    const { t } = useTranslation();

    // Store
    const { data: personInfo } = useFetchPersonalIdentityInfo();

    const isOwner = useMemo(() => personInfo?.isGlobal, [personInfo?.isGlobal]);
    const isTourSendGuest = useCheckTourSendGuest({ dataSO: data });

    // not isGlobal && !hasTourThienNhien
    const renderCommissionAgentBookedHNH = () => {
        return (
            <Flex vertical className={clsx(`${Color.bg_F6F7FA} p-5 rounded-b-lg`)} gap={20}>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Hoa hồng đại lý')}</p>
                    <Price className="font-bold" value={data?.agencyCommissionAmt} />
                </Flex>
            </Flex>
        );
    };

    // not isGlobal && hasTourThienNhien
    const renderCommissionAgentBookedTN = () => {
        return (
            <Flex vertical className={clsx(`${Color.bg_F6F7FA} p-5 rounded-b-lg`)} gap={20}>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Hoa hồng được nhận')}</p>
                    <Price className="font-bold" value={data?.integrationCommissionAmt} />
                </Flex>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Hoa hồng đại lý')}</p>
                    <Price className="font-bold" value={data?.agencyCommissionAmt} />
                </Flex>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Lợi nhuận')}</p>
                    <Price
                        className="font-bold"
                        value={(data?.integrationCommissionAmt ?? 0) - (data?.agencyCommissionAmt ?? 0)}
                    />
                </Flex>
            </Flex>
        );
    };

    // isGlobal && hasTourThienNhien
    const renderCommissionTourTNForHNH = () => {
        return (
            <Flex vertical className={clsx(`${Color.bg_F6F7FA} p-5 rounded-b-lg`)} gap={20}>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Hoa hồng được nhận')}</p>
                    <Price className="font-bold" value={data?.integrationCommissionAmt} />
                </Flex>
            </Flex>
        );
    };

    // isGlobal && !hasTourThienNhien
    const renderCommissionAgent = () => {
        return (
            <Flex vertical className="p-5" gap={20}>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Hoa hồng')}</p>
                    <Price className="font-bold" value={data?.agencyCommissionAmt} />
                </Flex>
            </Flex>
        );
    };

    return (
        <>
            {isOwner && !data?.isGroupGlobal && !isTourSendGuest && renderCommissionAgentBookedHNH()}
            {isOwner && !data?.isGroupGlobal && isTourSendGuest && renderCommissionAgentBookedTN()}
            {isOwner && data?.isGroupGlobal && isTourSendGuest && renderCommissionTourTNForHNH()}
            {!isOwner && renderCommissionAgent()}
        </>
    );
};
