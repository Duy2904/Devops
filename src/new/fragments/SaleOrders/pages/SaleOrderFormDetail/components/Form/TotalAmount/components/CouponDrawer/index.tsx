import { Button, Col, ConfigProvider, Drawer, Flex } from 'antd';
import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CloseOutlined } from '@ant-design/icons';
import { EstimateDiscountItemModel } from '@sdk/tour-operations';
import CouponList from '@src/new/components/common/CouponList';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import Format from '@src/new/shared/utils/format';

import { togglePromotionInMutilList } from '../../features';

interface CouponDrawerProps {
    couponList: EstimateDiscountItemModel[];
    isOpen: boolean;
    hasIncentives?: boolean;
    dataPromotionsApplied: EstimateDiscountItemModel[];
    maxPromotionsCanApply: number;
    // eslint-disable-next-line no-unused-vars
    handleApplyPromotion: (listPromotion: EstimateDiscountItemModel[]) => void;
    onClose: () => void;
}

export const CouponDrawer: React.FC<CouponDrawerProps> = props => {
    const {
        couponList,
        isOpen,
        hasIncentives = true,
        dataPromotionsApplied,
        maxPromotionsCanApply,
        onClose,
        handleApplyPromotion,
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

    const onClickApplyPromotion = useCallback(() => {
        handleApplyPromotion(dataPromotionsTemp);
        onClose();
    }, [dataPromotionsTemp, handleApplyPromotion, onClose]);

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

    const CustomHeader = (
        <Flex className="h-[50px] px-3 shadow relative" align="center" justify="center">
            <h1 className={`${Color.text_2A2A2A} font-bold uppercase text-[18px]`}>{t('Ưu đãi')}</h1>
            <Button
                className="absolute right-5"
                icon={<CloseOutlined className="h-4 w-4" />}
                onClick={handleClose}
                type="text"
            />
        </Flex>
    );

    useEffect(() => {
        setDataPromotionsTemp(dataPromotionsApplied);
    }, [dataPromotionsApplied]);

    return (
        <Drawer
            title={CustomHeader}
            open={isOpen}
            width={400}
            height="100%"
            closable={false}
            styles={{
                header: {
                    padding: 0,
                },
                body: {
                    padding: 0,
                },
            }}
            maskClosable={true}
            onClose={onClose}
            mask={true}
        >
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
                        onClick={onClickApplyPromotion}
                    >
                        {t('Áp dụng')}
                    </Button>
                </ConfigProvider>
            </footer>
        </Drawer>
    );
};
