import { Flex } from 'antd';
import { t } from 'i18next';

import { SaleOrderDto } from '@sdk/tour-operations';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';

interface CommissionRefProps {
    data?: SaleOrderDto;
}

export const CommissionRef: React.FC<CommissionRefProps> = ({ data }) => {
    return (
        <Flex vertical className="p-5" gap={20}>
            <Flex align="center" justify="space-between">
                <p className="text-sm">{t('Số điện thoại')}</p>
                <p>{data?.presenterPhone}</p>
            </Flex>
            <Flex align="center" justify="space-between">
                <p className="text-sm">{t('Họ và tên')}</p>
                <p>{data?.presenter}</p>
            </Flex>
            <Flex align="center" justify="space-between">
                <p className="text-sm">{t('Hoa hồng')}</p>
                <Price className="font-bold" value={data?.commissionAmt} />
            </Flex>
        </Flex>
    );
};
