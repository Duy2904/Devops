import { FormInstance } from 'antd';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { History } from '@fragments/History';
import { RouteChangeTourSOState, RouteCloneSOState } from '@fragments/SaleOrders/features';
import { useGenerateSaleOrderCode } from '@hooks/queries/useSaleOrders';
import { TravellerDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

import { CollapseComission } from './CollapseComission';
import { CollapseInfo } from './CollapseInfo';
import { CollapseSurcharge } from './CollapseSurcharge';
import { CollapseTotalAmount } from './CollapseTotalAmount';
import { CollapseTourInfo } from './CollapseTourInfo';
import { CollapseTouristInfo } from './CollapseTouristInfo';

interface SODetailForm {
    tourInfoForm: FormInstance;
    totalCustomerForm: FormInstance;
    touristForm: FormInstance;
    infoForm: FormInstance;
    surchargeForm: FormInstance;
    totalAmountForm: FormInstance;
    personContactForm: FormInstance;
    isEnableEdit: boolean;
    isOpenHistory: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    setIsOpenHistory: Dispatch<SetStateAction<boolean>>;
    setInvalidQuerySOList: () => void;
    handleDataPersonContact: (traveller: TravellerDto) => void;
}

export const SODetailForm: React.FC<SODetailForm> = props => {
    const { soId } = useParams<string>();
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { changeTourSOId } = (useLocation().state ?? { cloneId: false }) as RouteChangeTourSOState;
    const id = soId ?? clonedId ?? changeTourSOId;

    const [paymentMethod, setPaymentMethod] = useState<{ id: string; value: number }>({ id: '', value: 0 });
    const [soCode, setSoCode] = useState<string | undefined>(undefined);
    const [isFirstTimeDirty, setIsFirstTimeDirty] = useState<boolean>(true);
    const [isModalWarningOpen, setIsModalWarningOpen] = useState<boolean>(false);
    const [isConfirmOverload, setIsConfirmOverload] = useState<boolean>(false);

    // Mutate
    const { mutateAsync: generateSoCode } = useGenerateSaleOrderCode();

    const fetchSoCode = useCallback(async () => {
        const response = await generateSoCode();
        setSoCode(response);
    }, [generateSoCode]);

    useEffect(() => {
        if (!soId) {
            fetchSoCode();
        }
    }, [fetchSoCode, soId]);

    return (
        <div className="flex flex-col relative bg-white">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-4 xl:col-span-4 lg:h-[calc(100vh_-_225px)] overflow-auto pb-5">
                    {/* Thông tin tour */}
                    <CollapseTourInfo
                        form={props.tourInfoForm}
                        soCode={soCode}
                        soId={id}
                        setIsEnableEdit={props.setIsEnableEdit}
                        isEnableEdit={props.isEnableEdit}
                        isFirstTimeDirty={isFirstTimeDirty}
                        setIsFirstTimeDirty={setIsFirstTimeDirty}
                        setIsConfirmOverload={setIsConfirmOverload}
                    />

                    {/* Tổng số tiền */}
                    <CollapseTotalAmount
                        soId={id}
                        form={props.totalAmountForm}
                        infoForm={props.infoForm}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        setIsEnableEdit={props.setIsEnableEdit}
                        isEnableEdit={props.isEnableEdit}
                        isFirstTimeDirty={isFirstTimeDirty}
                        setIsFirstTimeDirty={setIsFirstTimeDirty}
                    />

                    {/* Tiền hoa hồng */}
                    <CollapseComission
                        setIsEnableEdit={props.setIsEnableEdit}
                        isEnableEdit={props.isEnableEdit}
                        isFirstTimeDirty={isFirstTimeDirty}
                        setIsFirstTimeDirty={setIsFirstTimeDirty}
                        totalAmountForm={props.totalAmountForm}
                    />
                </div>
                <div className="col-span-12 lg:col-span-8 xl:col-span-8 lg:h-[calc(100vh_-_225px)] overflow-auto w-full pb-4">
                    {/* Số lượng vé - khách đi tour */}
                    <CollapseTouristInfo
                        totalCustomerForm={props.totalCustomerForm}
                        personContactForm={props.personContactForm}
                        setIsEnableEdit={props.setIsEnableEdit}
                        isEnableEdit={props.isEnableEdit}
                        isFirstTimeDirty={isFirstTimeDirty}
                        setIsFirstTimeDirty={setIsFirstTimeDirty}
                        touristForm={props.touristForm}
                        setIsModalWarningOpen={setIsModalWarningOpen}
                        isConfirmOverload={isConfirmOverload}
                        soId={id}
                        setInvalidQuerySOList={props.setInvalidQuerySOList}
                    />

                    {/* Thông tin Phụ thu */}
                    <CollapseSurcharge
                        form={props.surchargeForm}
                        setIsEnableEdit={props.setIsEnableEdit}
                        isEnableEdit={props.isEnableEdit}
                        isFirstTimeDirty={isFirstTimeDirty}
                        setIsFirstTimeDirty={setIsFirstTimeDirty}
                        soId={id}
                    />

                    {/* Thông tin Khách hàng */}
                    <CollapseInfo
                        form={props.infoForm}
                        personContactForm={props.personContactForm}
                        touristForm={props.touristForm}
                        totalAmountForm={props.totalAmountForm}
                        surchargeForm={props.surchargeForm}
                        soCode={soCode}
                        paymentMethod={paymentMethod}
                        setSoCode={setSoCode}
                        setIsEnableEdit={props.setIsEnableEdit}
                        isEnableEdit={props.isEnableEdit}
                        isFirstTimeDirty={isFirstTimeDirty}
                        setIsFirstTimeDirty={setIsFirstTimeDirty}
                        isModalWarningOpen={isModalWarningOpen}
                        setIsModalWarningOpen={setIsModalWarningOpen}
                        isConfirmOverload={isConfirmOverload}
                        setIsConfirmOverload={setIsConfirmOverload}
                        setIsSubmitting={props.setIsSubmitting}
                        setInvalidQuerySOList={props.setInvalidQuerySOList}
                        handleDataPersonContact={props.handleDataPersonContact}
                    />
                </div>
                {/* Lịch sử thao tác */}
                {soId && (
                    <History
                        tableName="SaleOrder"
                        title={i18n.t('Lịch sử thao tác')}
                        id={soId}
                        isOpenHistory={props.isOpenHistory}
                        setIsOpenHistory={props.setIsOpenHistory}
                    />
                )}
            </div>
        </div>
    );
};
