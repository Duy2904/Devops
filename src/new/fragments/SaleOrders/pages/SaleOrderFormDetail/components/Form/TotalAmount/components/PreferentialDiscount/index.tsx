import { Button, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import { EstimateDiscountItemModel, OrderStatus, SaleOrderDto } from '@sdk/tour-operations';
import { ArrowRightShort, IconCoupon } from '@src/new/components/common/SvgIcon';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import TagCoupon from '@src/new/components/ui/Tag/TagCoupon';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';

interface PreferentialDiscountProps {
    dataSO?: SaleOrderDto;
    dataPromotionsApplied: EstimateDiscountItemModel[];
    isEmptyPromotionsEL: boolean;
    isEmptyPromotionsGroup: boolean;
    isAppliedPromotion: boolean;
    numberOfTravellersWatch: number;
    loadingEstDiscount: boolean;
    onClick: () => void;
}

export const PreferentialDiscount: React.FC<PreferentialDiscountProps> = props => {
    const {
        dataSO,
        dataPromotionsApplied,
        isEmptyPromotionsEL,
        isEmptyPromotionsGroup,
        isAppliedPromotion,
        numberOfTravellersWatch,
        loadingEstDiscount,
        onClick,
    } = props;
    const { t } = useTranslation();

    const shouldShowBtn =
        (dataSO?.status === OrderStatus.New || dataSO?.status === OrderStatus.Overload || !dataSO?.status) &&
        (!isEmptyPromotionsEL || !isEmptyPromotionsGroup);

    return (
        <Flex vertical className="gap-1">
            <Flex justify="space-between" align="center" onClick={onClick} className="cursor-pointer group ">
                <p className={`${Color.text_black_88} text-xs`}>{t('saleorder.totalAmount.discount')}</p>
                {shouldShowBtn && !isAppliedPromotion && (
                    <Button className="text-xs" disabled={numberOfTravellersWatch <= 0} loading={loadingEstDiscount}>
                        {isAppliedPromotion ? 'Danh sách ưu đãi' : 'Áp dụng ưu đãi'}
                    </Button>
                )}
                {shouldShowBtn && isAppliedPromotion && (
                    <button
                        className={`btn-see-more flex items-center ${Color.text_2A2A2A_60} cursor-pointer group-hover group-hover:underline flex items-center border-none bg-transparent gap-1 text-sm`}
                    >
                        <span>{t('Xem thêm')}</span>
                        <ArrowRightShort className={`${Color.text_2A2A2A_60}`} />
                    </button>
                )}
            </Flex>
            <Flex vertical gap={4}>
                {dataPromotionsApplied.map(item => (
                    <Flex align="center" justify="space-between" gap={4} key={item.discountId}>
                        <div className={`${Color.text_2A2A2A_60} flex items-center gap-1 text-sm`}>
                            <TagCoupon
                                name={item?.discountCode ?? ''}
                                icon={<IconCoupon className={`${Color.text_1B3280} w-[10px] h-[10px]`} />}
                                bgColor={Color.bg_1B3280}
                                borderColor={Color.border_1B3280}
                            />
                        </div>
                        <Price value={(item.discountAmount ?? 0) * -1} className="font-bold" />
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};
