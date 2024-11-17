import { Col, Flex } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SaleOrderDto } from '@sdk/tour-operations';
import { IconCoupon } from '@src/new/components/common/SvgIcon';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';
import { calculateRemainAmountForRefundSO, checkIsRefundSO } from '@src/new/fragments/SaleOrders/features';
import { calTotalRemainAmt } from '@utils/saleOrderHelper';
import TagCoupon from '@src/new/components/ui/Tag/TagCoupon';

interface TotalAmountProps {
    data?: SaleOrderDto;
}

export const TotalAmount: React.FC<TotalAmountProps> = ({ data }) => {
    const { t } = useTranslation();

    const renderAmount = useMemo(() => {
        if (checkIsRefundSO(data?.status)) {
            const remainRefund = calculateRemainAmountForRefundSO(data!);
            if (remainRefund >= 0) {
                return remainRefund;
            }
            return Math.abs(remainRefund);
        }
        const totalRemainAmt = calTotalRemainAmt(data);
        return totalRemainAmt;
    }, [data]);

    return (
        <Flex vertical className="p-5" gap={24}>
            <Flex align="center" justify="space-between">
                <p className="text-sm">{t('Tổng tiền đơn hàng')}</p>
                <Price className="font-bold" value={data?.totalAmt} />
            </Flex>
            <Col hidden={isEmpty(data?.tourSchedule?.visaTourService)}>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Giảm trừ')}</p>
                    <Price className="font-bold" value={(data?.totalDeductionAmount ?? 0) * -1} />
                </Flex>
            </Col>
            <Col hidden={!data?.hasInvoice}>
                <p className="text-sm mb-2">
                    <span className="text-red-500 mr-1">*</span>
                    {t('Thuế GTGT')}
                </p>
                <Flex align="center" justify="space-between">
                    <p className="text-sm bg-white w-1/2 py-1 px-2 rounded-md">{data?.vat?.description}</p>
                    <Price
                        className="font-bold"
                        value={((data?.totalAmt ?? 0) - (data?.totalDeductionAmount ?? 0)) * (data?.vat?.value ?? 0)}
                    />
                </Flex>
            </Col>
            <Col hidden={isEmpty(data?.discounts)}>
                <p className="text-sm mb-2">{t('Ưu đãi')}</p>
                <Flex vertical gap={4}>
                    {data?.discounts?.map(item => (
                        <Flex align="center" justify="space-between">
                            <TagCoupon
                                key={item?.discountId}
                                name={item?.discountCode ?? ''}
                                icon={<IconCoupon className={`${Color.text_1B3280} w-[10px] h-[10px]`} />}
                                bgColor={Color.bg_1B3280}
                                borderColor={Color.border_1B3280}
                            />
                            <Flex align="center" gap={4}>
                                <Price className="font-bold" value={(item?.discountAmount ?? 0) * -1} />
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Col>
            <Flex align="center" justify="space-between">
                <p className="text-sm">{t('Tổng tiền thanh toán')}</p>
                <Price className="font-bold" value={data?.totalIncludeVatAmt} />
            </Flex>
            <Flex align="center" justify="space-between">
                <p className="text-sm">{t('Tiền cọc')}</p>
                <Price className="font-bold" value={data?.depositAmt} />
            </Flex>
            <Col>
                <p className="text-sm mb-2">{t('Tiền khách trả')}</p>
                <Flex align="center" justify="space-between">
                    <p className="text-sm bg-white w-1/2 py-1 px-2 rounded-md">{data?.paymentMethod?.name}</p>
                    <Price className="font-bold" value={data?.paymentAmt} />
                </Flex>
            </Col>
            <Col hidden={!(checkIsRefundSO(data?.status) && data?.isTourServiceVisa)}>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Phí Visa không hoàn lại')}</p>
                    <Price className="font-bold" value={data?.nonRefundableVisaFees} />
                </Flex>
            </Col>
            <Col hidden={!checkIsRefundSO(data?.status)}>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Phí phạt')}</p>
                    <Price className="font-bold" value={data?.penaltyFee} />
                </Flex>
            </Col>
            <Col>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Tiền còn lại')}</p>
                    <Price
                        className="font-bold"
                        value={checkIsRefundSO(data?.status) ? renderAmount * -1 : renderAmount}
                    />
                </Flex>
            </Col>
            <Col hidden={!checkIsRefundSO(data?.status)}>
                <Flex align="center" justify="space-between">
                    <p className="text-sm">{t('Tiền đã hoàn')}</p>
                    <Price className="font-bold" value={data?.totalReturnAmt} />
                </Flex>
            </Col>
        </Flex>
    );
};
