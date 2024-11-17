import { Col, Flex } from 'antd';

import { Color } from '@src/new/components/ui/Color/CustomColor';
import { PageName } from '@src/types/TypeEnum';
import { SaleOrderSearchDto } from '@sdk/tour-operations';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface InfoProps {
    data?: SaleOrderSearchDto;
}

export const Info: React.FC<InfoProps> = ({ data }) => {
    const { t } = useTranslation();
    return (
        <Flex align="center" justify="space-between" className={clsx(Color.bg_F2F3F7, 'rounded-xl py-3 px-5 mb-6')}>
            <Col>
                <p className="text-sm mb-1">{t('Đơn hàng bán')}</p>
                <p className={clsx(Color.text_2F80ED, 'text-lg font-bold')}>{data?.orderNo}</p>
            </Col>
            <Col>
                <p className="text-sm font-medium mb-1">{data?.contactName}</p>
                <p className={clsx(Color.bg_EDEDED, 'text-xs text-black/50 px-1 py-[2px] rounded-md')}>
                    {data?.contactPhone}
                </p>
            </Col>
            <TagStatus text={t(`OrderStatus.${data?.status}`)} page={PageName.SaleOrder} status={`${data?.status}`} />
        </Flex>
    );
};
