import { Button, Divider, Flex, Modal } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

import { DiscountDto, DiscountOnType, EstimateDiscountItemModel, EstimateDiscountResponse } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { useTourScheduleStore } from '@store/tourScheduleStore';

import { handleToogleCode } from '../../features';
import { DiscountItem } from '../DiscountItem';

interface DiscountModalProps {
    isOpenModal: boolean;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
    listCodeELWithDiscountPrice: EstimateDiscountItemModel[];
    listCodeGroupWithDiscountPrice: EstimateDiscountItemModel[];
    dataPromotionsApplied: EstimateDiscountResponse;
    listCodeDetail: DiscountDto[];
    // eslint-disable-next-line no-unused-vars
    handleChangePromotion: (listELCode: string[], listGroupCode: string[]) => void;
}

export const DiscountModal: React.FC<DiscountModalProps> = props => {
    const {
        isOpenModal,
        listCodeELWithDiscountPrice,
        listCodeGroupWithDiscountPrice,
        setIsOpenModal,
        handleChangePromotion,
        dataPromotionsApplied,
        listCodeDetail,
    } = props;

    // Store
    const { tourSchedule } = useTourScheduleStore(state => state);

    // State
    // data promotion applying
    const [listCodeGroupApplying, setListCodeGroupApplying] = useState<string[]>([]);
    const [listCodeELApplying, setListCodeELApplying] = useState<string[]>([]);
    // check first time init data promotion applying from parent
    const [isFirstTimeFillGroupApplied, setIsFirstTimeFillGroupApplied] = useState<boolean>(true);
    const [isFirstTimeFillELApplied, setIsFirstTimeFillELApplied] = useState<boolean>(true);
    // data promotion original + promotions applied but not exist in list promotion original anymore (out of stock, out date, ..)
    const [listPromotionsGroup, setListPromotionsGroup] = useState<EstimateDiscountItemModel[]>([]);
    const [listPromotionsEL, setListPromotionsEL] = useState<EstimateDiscountItemModel[]>([]);
    // check first time init data promotions
    const [isFirstTimeFillListGroup, setIsFirstTimeFillListGroup] = useState<boolean>(true);
    const [isFirstTimeFillListEL, setIsFirstTimeFillListEL] = useState<boolean>(true);

    const totalPromotions = listCodeGroupApplying.length + listCodeELApplying.length;

    const tourDiscountType = tourSchedule.discountOnTypes;

    useEffect(() => {
        return () => {
            setListCodeGroupApplying([]);
            setListCodeELApplying([]);
            setIsFirstTimeFillGroupApplied(true);
            setIsFirstTimeFillELApplied(true);
            setListPromotionsGroup([]);
            setListPromotionsEL([]);
            setIsFirstTimeFillListGroup(true);
            setIsFirstTimeFillListEL(true);
        };
    }, []);

    useEffect(() => {
        // init data to list when component mounted
        if (!isEmpty(listCodeGroupWithDiscountPrice) && isFirstTimeFillListGroup) {
            listCodeGroupWithDiscountPrice.forEach(item => {
                const isExist = listPromotionsGroup.find(x => x.discountCode === item.discountCode);
                if (isEmpty(isExist)) {
                    setListPromotionsGroup(prev => [...prev, item]);
                }
            });
            setIsFirstTimeFillListGroup(false);
        }
    }, [isFirstTimeFillListGroup, listCodeGroupWithDiscountPrice, listPromotionsGroup]);

    useEffect(() => {
        // init data to list when component mounted
        if (!isEmpty(listCodeELWithDiscountPrice) && isFirstTimeFillListEL) {
            listCodeELWithDiscountPrice.forEach(item => {
                const isExist = listPromotionsEL.find(x => x.discountCode === item.discountCode);
                if (isEmpty(isExist)) {
                    setListPromotionsEL(prev => [...prev, item]);
                }
            });
            setIsFirstTimeFillListEL(false);
        }
    }, [isFirstTimeFillListEL, listCodeELWithDiscountPrice, listPromotionsEL]);

    useEffect(() => {
        // init promotion applied into list to checked in UI
        if (
            isEmpty(listCodeGroupApplying) &&
            isFirstTimeFillGroupApplied &&
            !isEmpty(dataPromotionsApplied.items) &&
            isOpenModal
        ) {
            setIsFirstTimeFillGroupApplied(false);
            dataPromotionsApplied.items?.forEach(y => {
                if (DiscountOnType.Group === y.discountType) {
                    setListCodeGroupApplying([y.discountCode ?? '']);

                    // check if promotion applied not exist in original list, then add it to list promotion
                    const isExist = listPromotionsGroup.find(x => x.discountCode === y.discountCode);

                    if (isEmpty(isExist)) {
                        setListPromotionsGroup(prev => [...prev, y]);
                    }
                }
            });
        }
    }, [
        dataPromotionsApplied.items,
        isFirstTimeFillGroupApplied,
        isOpenModal,
        listCodeGroupApplying,
        listPromotionsGroup,
    ]);

    useEffect(() => {
        // init promotion applied into list to checked in UI
        if (
            isEmpty(listCodeELApplying) &&
            isFirstTimeFillELApplied &&
            !isEmpty(dataPromotionsApplied.items) &&
            isOpenModal
        ) {
            setIsFirstTimeFillELApplied(false);
            dataPromotionsApplied.items?.forEach(y => {
                if (DiscountOnType.EarlyBirdLastMinute === y.discountType) {
                    setListCodeELApplying([y.discountCode ?? '']);

                    // check if promotion applied not exist in original list, then add it to list promotion
                    const isExist = listPromotionsEL.find(x => x.discountCode === y.discountCode);

                    if (isEmpty(isExist)) {
                        setListPromotionsEL(prev => [...prev, y]);
                    }
                }
            });
        }
    }, [dataPromotionsApplied.items, isFirstTimeFillELApplied, isOpenModal, listCodeELApplying, listPromotionsEL]);

    // handle click change promotion
    const handleApplyPromotions = () => {
        setIsOpenModal(false);
        handleChangePromotion(listCodeELApplying, listCodeGroupApplying);
    };

    const handleClickPromotion = (item: EstimateDiscountItemModel) => () => {
        const discountCode = item.discountCode ?? '';

        switch (item.discountType) {
            case DiscountOnType.EarlyBirdLastMinute:
                // Toggle the selected state of the coupon
                setListCodeELApplying(prevList => handleToogleCode(prevList, discountCode));

                // check tour isn't allow use multiple type promotions
                if ((tourDiscountType?.length ?? 0) < 2 && listCodeGroupApplying.length > 0) {
                    setListCodeGroupApplying([]);
                }
                break;
            case DiscountOnType.Group:
                // Toggle the selected state of the coupon
                setListCodeGroupApplying(prevList => handleToogleCode(prevList, discountCode));

                // check tour isn't allow use multiple type promotions
                if ((tourDiscountType?.length ?? 0) < 2 && listCodeELApplying.length > 0) {
                    setListCodeELApplying([]);
                }
                break;
        }
    };

    const resetCheckFillData = useCallback(() => {
        setIsFirstTimeFillELApplied(true);
        setIsFirstTimeFillGroupApplied(true);
        setListCodeGroupApplying([]);
        setListCodeELApplying([]);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpenModal(false);
    }, [setIsOpenModal]);

    const getDiscountPrice = useCallback(() => {
        const itemEL = listCodeELWithDiscountPrice.find(x => x.discountCode === listCodeELApplying[0]);
        const itemGroup = listCodeGroupWithDiscountPrice.find(x => x.discountCode === listCodeGroupApplying[0]);
        return (itemEL?.discountAmount ?? 0) + (itemGroup?.discountAmount ?? 0);
    }, [listCodeELApplying, listCodeGroupApplying, listCodeELWithDiscountPrice, listCodeGroupWithDiscountPrice]);

    useEffect(() => {
        if (!isOpenModal) {
            resetCheckFillData();
        }
    }, [isOpenModal, resetCheckFillData]);

    return (
        <Modal open={isOpenModal} closeIcon={false} footer={null} destroyOnClose={true} width={500} centered>
            <h6 className="mb-3">Danh sách CTKM</h6>
            <div className="max-h-[55vh] overflow-auto py-1">
                {listPromotionsGroup.map(item => {
                    const isChecked = listCodeGroupApplying.includes(item.discountCode ?? '');
                    return (
                        <DiscountItem
                            key={item.discountId}
                            item={item}
                            isChecked={isChecked}
                            handleCouponChangeGroup={handleClickPromotion}
                            listPromotionFormData={listCodeGroupWithDiscountPrice}
                            type={DiscountOnType.Group}
                            detail={listCodeDetail.find(x => x.id === item.discountId)}
                        />
                    );
                })}
                {listPromotionsEL.map(item => {
                    const isChecked = listCodeELApplying.includes(item.discountCode ?? '');
                    return (
                        <DiscountItem
                            key={item.discountId}
                            item={item}
                            isChecked={isChecked}
                            handleCouponChangeGroup={handleClickPromotion}
                            listPromotionFormData={listCodeELWithDiscountPrice}
                            type={DiscountOnType.EarlyBirdLastMinute}
                            detail={listCodeDetail.find(x => x.id === item.discountId)}
                        />
                    );
                })}
            </div>
            <Divider />
            {totalPromotions ? (
                <div className="min-h-[44px] flex flex-col sm:flex-row justify-between gap-3 items-end sm:items-center">
                    <Flex vertical>
                        <p>{totalPromotions} CTKM đã được áp dụng</p>
                        <p>
                            <span>Tổng ưu đãi: </span>
                            <span className="text-green-500">
                                {Intl.NumberFormat('en-US').format(Number(getDiscountPrice()))}
                            </span>
                        </p>
                    </Flex>
                    <Flex justify="end" gap={12}>
                        <Button type="primary" onClick={handleApplyPromotions}>
                            Áp dụng
                        </Button>
                        <Button onClick={handleClose}>{i18n.t('action.close')}</Button>
                    </Flex>
                </div>
            ) : (
                <div className="min-h-[44px] flex flex-col sm:flex-row sm:items-center items-end justify-end gap-3">
                    <Button type="primary" onClick={handleApplyPromotions}>
                        Tiếp tục và không sử dụng CTKM
                    </Button>
                    <Button onClick={handleClose}>{i18n.t('action.close')}</Button>
                </div>
            )}
        </Modal>
    );
};
