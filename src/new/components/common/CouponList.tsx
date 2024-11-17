import { Col, Flex } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import EmptyCouponImage from '@assets/images/empty-coupon.png';
import { EstimateDiscountItemModel } from '@sdk/tour-operations';

import CouponCard from '../ui/Card/CouponCard';
import { Color } from '../ui/Color/CustomColor';

interface CouponListProps {
    data?: EstimateDiscountItemModel[];
    dataPromotionsApplied: EstimateDiscountItemModel[];
    // eslint-disable-next-line no-unused-vars
    handleChoosePromotion: (item: EstimateDiscountItemModel) => () => void;
}

const EmptyCoupon = () => {
    const { t } = useTranslation();

    return (
        <Col className="w-full h-full flex flex-col justify-center">
            <Col className="text-center">
                <img src={EmptyCouponImage} alt={t('Không có khuyến mãi khả dụng')} className="w-[120px] h-[120px]" />
                <p className={`${Color.text_6787B0} mt-2 font-bold text-center text-gray-400 text-base/[22px]`}>
                    {t('Không có khuyến mãi khả dụng')}
                </p>
            </Col>
        </Col>
    );
};

const CouponList: React.FC<CouponListProps> = props => {
    const { data, dataPromotionsApplied, handleChoosePromotion } = props;

    if (isEmpty(data)) return <EmptyCoupon />;

    return (
        <Col className="w-full h-full">
            {/* <Col className="px-3 py-4 mt-0 bg-white">
                <CouponInput />
            </Col> */}

            <Col className="p-3">
                <p className={`${Color.text_black_45} text-xs`}>
                    Có <strong className="font-bold text-black">{data?.length}</strong> ưu đãi
                </p>

                <Flex vertical gap={12} className="mt-5">
                    {data?.map(coupon => {
                        return (
                            <CouponCard
                                couponItem={coupon}
                                key={coupon.discountId}
                                isApply={
                                    !isEmpty(dataPromotionsApplied?.find(item => item.discountId === coupon.discountId))
                                }
                                handleChoosePromotion={handleChoosePromotion}
                            />
                        );
                    })}
                </Flex>
            </Col>
        </Col>
    );
};

export default CouponList;
