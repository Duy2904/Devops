import { Collapse, CollapseProps, Flex } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { SaleOrderDto } from '@sdk/tour-operations';
import { useCheckTourSendGuest } from '@src/new/fragments/SaleOrders/hooks/useCheckTourSendGuest';

import { CommissionCollab } from './CommissionCollab';
import { CommissionRef } from './CommissionRef';
import { TotalAmount } from './TotalAmount';

interface RightBlockProps {
    data?: SaleOrderDto;
}

export const RightBlock: React.FC<RightBlockProps> = ({ data }) => {
    const { t } = useTranslation();
    const { data: personInfo } = useFetchPersonalIdentityInfo();
    const isOwner = personInfo?.isGlobal;
    const isTourSendGuest = useCheckTourSendGuest({ dataSO: data });

    const totalAmountCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('TỔNG TIỀN ĐƠN HÀNG'),
            children: <TotalAmount data={data} />,
        },
    ];
    const commissionCollabCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: isTourSendGuest ? t('HOA HỒNG TOUR GỬI KHÁCH') : t('HOA HỒNG'),
            children: <CommissionCollab data={data} />,
        },
    ];
    const CommissionRefCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('HOA HỒNG NGƯỜI GIỚI THIỆU'),
            children: <CommissionRef data={data} />,
        },
    ];

    return (
        <Flex vertical gap={20}>
            <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={totalAmountCollapse} />
            {((isOwner && isTourSendGuest) || (isOwner && data?.id && !data?.isGroupGlobal) || !isOwner) && (
                <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={commissionCollabCollapse} />
            )}
            {isOwner && (isEmpty(data) || data?.isGroupGlobal) && (
                <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={CommissionRefCollapse} />
            )}
        </Flex>
    );
};
