import { Checkbox, Col, Flex } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { ClockCircleFilled } from '@ant-design/icons';
import { DiscountConditionType, DiscountOnType, EstimateDiscountItemModel } from '@sdk/tour-operations';
import Format from '@src/new/shared/utils/format';
import { AppConfig } from '@utils/config';

import { IconCoupon, IconEarlyBird, IconGroup, IconInfoOutlined } from '../../common/SvgIcon';
import { Color } from '../Color/CustomColor';
import TagCoupon from '../Tag/TagCoupon';
import TagTravelPlan from '../Tag/TagTravelPlan';

interface CouponCardProps {
    couponItem: EstimateDiscountItemModel;
    isApply?: boolean;
    // eslint-disable-next-line no-unused-vars
    handleChoosePromotion: (item: EstimateDiscountItemModel) => () => void;
}

const CouponCard: React.FC<CouponCardProps> = props => {
    const { couponItem, isApply, handleChoosePromotion } = props;
    const {
        discountName,
        discountCode,
        discountType,
        remainingQuantity,
        endDate,
        discountAmount,
        discountConditionType,
    } = couponItem;
    const { t } = useTranslation();

    const daysRemaining = dayjs(endDate).diff(dayjs(), 'days');
    const offerInactive = discountAmount === 0;

    const renderIcon = () => {
        if (discountType === DiscountOnType.Group) {
            return <IconGroup />;
        } else if (
            discountType === DiscountOnType.EarlyBirdLastMinute &&
            discountConditionType === DiscountConditionType.FirstPlaces
        ) {
            return <IconEarlyBird />;
        } else if (
            discountType === DiscountOnType.EarlyBirdLastMinute &&
            discountConditionType === DiscountConditionType.LastPlaces
        ) {
            return <ClockCircleFilled />;
        } else {
            return <IconEarlyBird />;
        }
    };

    const renderName = () => {
        if (discountType === DiscountOnType.Group) {
            return t('discountType.Group');
        } else if (
            discountType === DiscountOnType.EarlyBirdLastMinute &&
            discountConditionType === DiscountConditionType.FirstPlaces
        ) {
            return 'EarlyBird';
        } else if (
            discountType === DiscountOnType.EarlyBirdLastMinute &&
            discountConditionType === DiscountConditionType.LastPlaces
        ) {
            return 'LastMinute';
        } else {
            return 'EarlyBirdLastMinute';
        }
    };

    return (
        <Col>
            <div
                className={`bg-white relative z-10 py-2 px-3 rounded-xl border border-solid ${Color.border_E1E1E1} cursor-pointer`}
                onClick={offerInactive ? undefined : handleChoosePromotion(couponItem)}
            >
                <Col
                    className={clsx({
                        'opacity-50': offerInactive,
                    })}
                >
                    <h3 className={`${Color.text_black_88} text-base/[22px] font-bold`}>{discountName}</h3>

                    <Flex align="center" gap={8} className="mt-1">
                        <TagCoupon
                            name={discountCode ?? ''}
                            icon={<IconCoupon className={`${Color.text_1B3280} w-[10px] h-[10px]`} />}
                            bgColor={Color.bg_1B3280}
                            borderColor={Color.border_1B3280}
                        />

                        <TagTravelPlan name={renderName()} icon={renderIcon()} />
                    </Flex>

                    <Flex align="center" justify={'space-between'} gap={8} className="mt-3">
                        <p className={`${Color.text_black_45} text-xs`}>
                            Số lượng{' '}
                            <span className="font-bold text-black">
                                {discountType === DiscountOnType.Group ? 'Từ' : ''} {remainingQuantity}
                            </span>
                        </p>
                        {daysRemaining > 0 && (
                            <Flex align="center" gap={4}>
                                <p className={`${Color.text_black_45} text-xs`}>
                                    Hết hạn{' '}
                                    <strong className="font-bold text-black">
                                        {dayjs(endDate).format(AppConfig.DateFormat)}
                                    </strong>
                                </p>
                                <Col
                                    className={`${Color.bg_F1C40F} ${Color.text_2A2A2A} text-[10px] py-[2px] px-1 font-medium rounded`}
                                >
                                    <span className="relative top-[1px]">{`Còn ${daysRemaining} ngày`}</span>
                                </Col>
                            </Flex>
                        )}
                        {daysRemaining === 0 && <span className="ml-1 text-state-error">(Hết hạn hôm nay)</span>}
                        {daysRemaining < 0 && <span className="ml-1 text-state-error">(Đã hết hạn)</span>}
                    </Flex>

                    <Flex align="center" justify="space-between" className="mt-4">
                        <p className={`${Color.text_169B3B} text-base/[22px] font-extrabold`}>
                            {!offerInactive && `${Format.formatNumber(discountAmount)}₫`}
                        </p>
                        <label>
                            <Flex align="center" gap={8} className="cursor-pointer">
                                <Checkbox checked={isApply} disabled={offerInactive} />
                                <p className="text-sm">{t('Áp dụng')}</p>
                            </Flex>
                        </label>
                    </Flex>
                </Col>
            </div>

            {offerInactive && (
                <Col className={`${Color.bg_FFEEEB} relative -top-[10px] px-4 pt-4 pb-[10px] rounded-b-xl`}>
                    <Flex align="center" gap={4} className={`${Color.text_C02B1B} text-xs font-medium`}>
                        <span>{t('Ưu đãi chưa khả dụng')}</span>
                        <span className="flex items-center">
                            <IconInfoOutlined />
                        </span>
                    </Flex>
                </Col>
            )}
        </Col>
    );
};

export default CouponCard;
