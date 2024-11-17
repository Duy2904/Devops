import { Collapse, CollapseProps, Flex, Form, FormInstance } from 'antd';
import { t } from 'i18next';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { SaleOrderDto } from '@sdk/tour-operations';
import { useCheckTourSendGuest } from '@src/new/fragments/SaleOrders/hooks/useCheckTourSendGuest';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useQueryGetTourScheduleUseId } from '@src/new/fragments/SaleOrders/hooks/queries';
import i18n from '@src/i18n';

import { RouteChangeTourSOState, RouteCloneSOState } from '../../../features';
import { CommissionCollab } from '../../Form/CommissionCollab';
import { CommissionRef } from '../../Form/CommissionRef';
import { TotalAmount } from '../../Form/TotalAmount';

interface RightBlockProps {
    dataSO?: SaleOrderDto;
    totalAmountForm: FormInstance;
    commissionRefForm: FormInstance;
    commissionCollabForm: FormInstance;
    invoiceForm: FormInstance;
    tourInfoForm: FormInstance;
    totalTravellerForm: FormInstance;
    surchargeForm: FormInstance;
    numberOfTotalForm: FormInstance;
    travellersForm: FormInstance;
    reduceForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
}

export const RightBlock: React.FC<RightBlockProps> = props => {
    const {
        dataSO,
        totalAmountForm,
        commissionRefForm,
        commissionCollabForm,
        invoiceForm,
        tourInfoForm,
        totalTravellerForm,
        numberOfTotalForm,
        surchargeForm,
        travellersForm,
        reduceForm,
        isEnableEdit,
        setIsEnableEdit,
    } = props;

    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;

    const { data: personInfo } = useFetchPersonalIdentityInfo();

    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);
    const { data: dataTourSchedule } = useQueryGetTourScheduleUseId(tourIdWatch);

    const isTourSendGuest = useCheckTourSendGuest({ dataTourSchedule });
    const isOwner = personInfo?.isGlobal;

    const itemCollapseTotalAmount: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <p className="font-bold">{i18n.t('TỔNG TIỀN ĐƠN HÀNG')}</p>,
                children: (
                    <TotalAmount
                        dataSO={dataSO}
                        totalAmountForm={totalAmountForm}
                        invoiceForm={invoiceForm}
                        tourInfoForm={tourInfoForm}
                        totalTravellerForm={totalTravellerForm}
                        surchargeForm={surchargeForm}
                        numberOfTotalForm={numberOfTotalForm}
                        reduceForm={reduceForm}
                        isEnableEdit={isEnableEdit}
                        setIsEnableEdit={setIsEnableEdit}
                    />
                ),
            },
        ],
        [
            dataSO,
            invoiceForm,
            isEnableEdit,
            numberOfTotalForm,
            reduceForm,
            setIsEnableEdit,
            surchargeForm,
            totalAmountForm,
            totalTravellerForm,
            tourInfoForm,
        ],
    );

    const itemCollapseCommissionCollab: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: (
                    <p className="font-bold">
                        {isTourSendGuest && isOwner ? t('HOA HỒNG TOUR GỬI KHÁCH') : t('HOA HỒNG')}
                    </p>
                ),
                children: (
                    <CommissionCollab
                        dataSO={dataSO}
                        commissionCollabForm={commissionCollabForm}
                        tourInfoForm={tourInfoForm}
                        totalAmountForm={totalAmountForm}
                        travellersForm={travellersForm}
                    />
                ),
            },
        ],
        [commissionCollabForm, dataSO, isOwner, isTourSendGuest, totalAmountForm, tourInfoForm, travellersForm],
    );

    const itemCollapseCommissionRef: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <p className="font-bold">{i18n.t('HOA HỒNG NGƯỜI GIỚI THIỆU')}</p>,
                children: (
                    <CommissionRef
                        commissionRefForm={commissionRefForm}
                        tourInfoForm={tourInfoForm}
                        totalAmountForm={totalAmountForm}
                        travellersForm={travellersForm}
                        isEnableEdit={isEnableEdit}
                        setIsEnableEdit={setIsEnableEdit}
                    />
                ),
            },
        ],
        [commissionRefForm, isEnableEdit, setIsEnableEdit, totalAmountForm, tourInfoForm, travellersForm],
    );

    return (
        <Flex vertical gap={20}>
            <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseTotalAmount} />
            {((isOwner && isTourSendGuest) || (isOwner && dataSO?.id && !dataSO?.isGroupGlobal) || !isOwner) && (
                <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseCommissionCollab} />
            )}
            {isOwner && (isEmpty(dataSO) || dataSO?.isGroupGlobal || changeTourSOId || clonedId) && (
                <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseCommissionRef} />
            )}
        </Flex>
    );
};
