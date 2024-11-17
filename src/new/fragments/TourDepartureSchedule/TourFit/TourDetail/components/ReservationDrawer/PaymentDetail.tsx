import { Col, Flex } from 'antd';

import { Color } from '@src/new/components/ui/Color/CustomColor';
import Format from '@src/new/shared/utils/format';
import { useTranslation } from 'react-i18next';

interface PaymentDetailProps {
    quantityOfAdult: number;
    quantityOfChild: number;
    quantityOfInfant: number;
    totalPriceOfAdult: number;
    totalPriceOfChild: number;
    totalPriceOfInfant: number;
}

const PaymentDetail: React.FC<PaymentDetailProps> = props => {
    const {
        quantityOfAdult,
        quantityOfChild,
        quantityOfInfant,
        totalPriceOfAdult,
        totalPriceOfChild,
        totalPriceOfInfant,
    } = props;
    const { t } = useTranslation();

    return (
        <Col>
            <p className={`${Color.text_black_88} text-sm font-bold`}>{t('Chi tiết thanh toán')}</p>
            <Flex vertical gap={4} className="mt-2">
                <Flex align="center" justify="space-between">
                    <p className={`${Color.text_2A2A2A_60} text-sm line-clamp-1`}>
                        {quantityOfAdult}x {t('Người lớn')}
                    </p>
                    <p className={`${Color.text_2A2A2A} text-sm font-bold`}>{Format.formatNumber(totalPriceOfAdult)}</p>
                </Flex>
                <Flex align="center" justify="space-between">
                    <p className={`${Color.text_2A2A2A_60} text-sm line-clamp-1`}>
                        {quantityOfChild}x {t('Trẻ em')}
                    </p>
                    <p className={`${Color.text_2A2A2A} text-sm font-bold`}>{Format.formatNumber(totalPriceOfChild)}</p>
                </Flex>
                <Flex align="center" justify="space-between">
                    <p className={`${Color.text_2A2A2A_60} text-sm line-clamp-1`}>
                        {quantityOfInfant}x {t('Em bé')}
                    </p>
                    <p className={`${Color.text_2A2A2A} text-sm font-bold`}>
                        {Format.formatNumber(totalPriceOfInfant)}
                    </p>
                </Flex>
            </Flex>
        </Col>
    );
};

export default PaymentDetail;
