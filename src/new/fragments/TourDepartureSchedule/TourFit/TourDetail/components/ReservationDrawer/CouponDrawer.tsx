import { Button, Col, ConfigProvider, Flex } from 'antd';
import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EstimateDiscountItemModel } from '@sdk/tour-operations';
import CouponList from '@src/new/components/common/CouponList';
import { IconClose } from '@src/new/components/common/SvgIcon';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import Format from '@src/new/shared/utils/format';

import { togglePromotionInMutilList } from './features';

interface CouponDrawerProps {
    couponList: EstimateDiscountItemModel[];
    isOpen: boolean;
    hasIncentives?: boolean;
    dataPromotionsApplied: EstimateDiscountItemModel[];
    maxPromotionsCanApply: number;
    setDataPromotionsApplied: Dispatch<SetStateAction<EstimateDiscountItemModel[]>>;
    onClose: () => void;
}

const CouponDrawer: React.FC<CouponDrawerProps> = props => {
    const {
        couponList,
        isOpen,
        hasIncentives = true,
        dataPromotionsApplied,
        maxPromotionsCanApply,
        onClose,
        setDataPromotionsApplied,
    } = props;
    const { t } = useTranslation();
    const [dataPromotionsTemp, setDataPromotionsTemp] = useState<EstimateDiscountItemModel[]>([]);

    const handleChoosePromotion = (item: EstimateDiscountItemModel) => () => {
        // Empty list applied
        if (isEmpty(dataPromotionsTemp)) {
            setDataPromotionsTemp([item]);
            return;
        } else {
            const findItem = dataPromotionsTemp.find(promotion => promotion.discountId === item.discountId);
            if (!isEmpty(findItem)) {
                setDataPromotionsTemp(dataPromotionsTemp.filter(promotion => promotion.discountId !== item.discountId));
            } else {
                if (maxPromotionsCanApply === 1) {
                    setDataPromotionsTemp([item]);
                } else if (maxPromotionsCanApply >= 2) {
                    const typeSelectedItem = item.discountType;

                    const newListApplied = togglePromotionInMutilList({
                        item,
                        dataPromotionsTemp,
                        typeSelectedItem,
                    });
                    setDataPromotionsTemp(newListApplied);
                }
            }
        }
    };

    const handleApplyPromotion = useCallback(() => {
        setDataPromotionsApplied(dataPromotionsTemp);
        onClose();
    }, [dataPromotionsTemp, onClose, setDataPromotionsApplied]);

    const totalPromotions = useCallback(() => {
        let total: number = 0;
        if (!isEmpty(dataPromotionsTemp)) {
            dataPromotionsTemp.forEach(item => (total += item.discountAmount ?? 0));
        }
        return total;
    }, [dataPromotionsTemp]);

    const handleClose = () => {
        setDataPromotionsTemp(dataPromotionsApplied);
        onClose();
    };

    useEffect(() => {
        setDataPromotionsTemp(dataPromotionsApplied);
    }, [dataPromotionsApplied]);

    return (
        <aside
            className={clsx(
                `${Color.bg_F6F7FA} absolute w-full h-full top-0 right-0 transition-all duration-300 ease-in-out`,
                {
                    'translate-x-0': isOpen,
                    'translate-x-full': !isOpen,
                },
            )}
        >
            <header className="sticky top-0 h-[53px] flex items-center justify-between bg-white shadow z-10">
                <div />
                <h3 className={`${Color.text_2A2A2A} relative left-7 uppercase text-[18px] font-extrabold`}>
                    {t('Ưu đãi')}
                </h3>
                <button
                    className="bg-transparent cursor-pointer py-3 px-4 border-none flex items-center justify-center"
                    onClick={handleClose}
                >
                    <IconClose />
                </button>
            </header>

            <Col className="h-[calc(100%-153px)] overflow-y-auto pb-5 no-scrollbar">
                <CouponList
                    data={couponList}
                    handleChoosePromotion={handleChoosePromotion}
                    dataPromotionsApplied={dataPromotionsTemp}
                />
            </Col>

            <footer
                className={clsx('bg-white absolute bottom-0 left-0 right-0 px-6 py-4 shadow', {
                    'opacity-40': !hasIncentives,
                })}
            >
                <Flex justify="space-between" align="center" gap={16}>
                    {hasIncentives ? (
                        <>
                            {!isEmpty(dataPromotionsTemp) && (
                                <p className={`${Color.text_black_45} text-xs line-clamp-1`}>
                                    {t('Đã áp dụng')}{' '}
                                    <span className={`${Color.text_2A2A2A} font-bold`}>
                                        {dataPromotionsTemp?.length} {'chương trình ưu đãi'}
                                    </span>
                                </p>
                            )}
                            {!isEmpty(dataPromotionsTemp) && (
                                <p className={`${Color.text_169B3B} font-bold text-sm shrink-0`}>
                                    {t('Giảm')} {Format.formatNumber(totalPromotions())}₫
                                </p>
                            )}
                        </>
                    ) : (
                        <p className={`${Color.text_black_45} font-light text-xs line-clamp-1`}>
                            {t('Chưa có ưu đãi nào được áp dụng')}
                        </p>
                    )}
                </Flex>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                borderColorDisabled: 'none',
                                colorBgContainerDisabled: 'primary',
                                colorTextDisabled: 'white',
                            },
                        },
                    }}
                >
                    <Button
                        type="primary"
                        disabled={!hasIncentives}
                        className="mt-3 h-10 w-full text-[18px] font-bold"
                        onClick={handleApplyPromotion}
                    >
                        {t('Áp dụng')}
                    </Button>
                </ConfigProvider>
            </footer>
        </aside>
    );
};

export default CouponDrawer;
