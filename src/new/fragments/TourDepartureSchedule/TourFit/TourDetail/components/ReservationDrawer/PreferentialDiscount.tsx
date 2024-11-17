import { Col, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import { EstimateDiscountItemModel } from '@sdk/tour-operations';
import { ArrowRightShort, IconCoupon } from '@src/new/components/common/SvgIcon';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import TagCoupon from '@src/new/components/ui/Tag/TagCoupon';
import Format from '@utils/format';

interface PreferentialDiscountProps {
    dataPromotionsApplied: EstimateDiscountItemModel[];
    onClick: () => void;
}

const PreferentialDiscount: React.FC<PreferentialDiscountProps> = props => {
    const { dataPromotionsApplied, onClick } = props;
    const { t } = useTranslation();

    return (
        <Col>
            <Flex justify="space-between" align="center" onClick={onClick} className="cursor-pointer group ">
                <p className={`${Color.text_black_88} text-sm font-bold`}>{t('Giảm giá ưu đãi')}</p>
                <button
                    className={`btn-see-more flex items-center ${Color.text_2A2A2A_60} cursor-pointer group-hover group-hover:underline flex items-center border-none bg-transparent gap-1 text-sm`}
                >
                    <span>{t('Xem thêm')}</span>
                    <ArrowRightShort className={`${Color.text_2A2A2A_60}`} />
                </button>
            </Flex>
            <Flex className="my-4" vertical gap={4}>
                {dataPromotionsApplied.map(item => (
                    <Flex align="center" justify="space-between" gap={4} key={item.discountId}>
                        <p className={`${Color.text_2A2A2A_60} flex items-center gap-1 text-sm`}>
                            <TagCoupon
                                name={item?.discountCode ?? ''}
                                icon={<IconCoupon className={`${Color.text_1B3280} w-[10px] h-[10px]`} />}
                                bgColor={Color.bg_1B3280}
                                borderColor={Color.border_1B3280}
                            />
                        </p>
                        <p className={`${Color.text_2A2A2A} shrink-0 text-sm font-bold`}>
                            {Format.formatNegativeNumber((item?.discountAmount ?? 0) * -1)}
                        </p>
                    </Flex>
                ))}
            </Flex>
        </Col>
    );
};

export default PreferentialDiscount;
