import { Form, FormInstance, Input, InputNumber } from 'antd';
import { ObjectType, TourScheduleDto } from '@sdk/tour-operations';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { calculateComissionAmount } from './features';
import i18n from '@src/i18n';
import { shouldDisableAllForm } from '@fragments/SaleOrders/features';
import { useCheckSOTN } from '@fragments/SaleOrders/hooks/useCheckSOTN';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useGetVats } from '@components/customizes/Select/Vat/useVat';
import { useParams } from 'react-router-dom';
import { useSaleOrderDetailStore } from '@fragments/SaleOrders/store/saleOrderDetailStore';
import { useSaleOrderFormStore } from '@fragments/SaleOrders/store/saleOrderFormStore';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';

interface CommissionProps {
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    totalAmountForm: FormInstance;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CommissionModel {
    presenter?: string;
    presenterPhone?: string;
    commissionAmount?: number;
    agencyCommissionAmt?: number;
    integrationCommissionAmt?: number;
}

export const CommissionComponent: React.FC<CommissionProps> = props => {
    const { isFirstTimeDirty, totalAmountForm, setIsFirstTimeDirty, setIsEnableEdit } = props;
    const [form] = Form.useForm();
    const vatIdFormWatch = Form.useWatch('vatId', totalAmountForm);

    const [percentageComission, setPercentageComission] = useState<number | undefined>(undefined);
    const [percentageComissionAgent, setPercentageComissionAgent] = useState<number | undefined>(undefined);
    const isSOTN = useCheckSOTN();
    const { soId } = useParams<string>();

    const { data: personInfo } = useFetchPersonalIdentityInfo();
    //queries
    const { data: dataVAT } = useGetVats();

    const isOwner = personInfo?.isGlobal;

    // Store
    const { tourSchedule } = useTourScheduleStore(state => state);
    const { travellerTotalAmount, surchargeTotalAmount } = useSaleOrderFormStore(state => state);
    const { saleOrder } = useSaleOrderStore(state => state);
    const {
        travellers,
        commission,
        actions: { setCommission },
    } = useSaleOrderDetailStore(state => state);

    const onValuesChange = (_: AnyObject, values: AnyObject) => {
        setCommission(values);

        if (isFirstTimeDirty && !props.isEnableEdit) {
            setIsFirstTimeDirty(false);
            setIsEnableEdit(true);
        }
    };

    const renderCommissionAgent = () => {
        return (
            <Form.Item
                name="agencyCommissionAmt"
                className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                label={
                    <p className="mb-1 font-semibold">
                        {i18n.t(`saleorder.commission.commission`)}{' '}
                        {percentageComissionAgent && <>({percentageComissionAgent * 100}%)</>}
                    </p>
                }
            >
                <InputNumber
                    className="w-full"
                    formatter={value => Intl.NumberFormat('en-US').format(Number(value))}
                    disabled
                />
            </Form.Item>
        );
    };

    const renderCommissionAgentBookedHNH = () => {
        return (
            <>
                <Form.Item
                    name="agencyCommissionAmt"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={
                        <p className="mb-1 font-semibold">
                            {i18n.t(`Hoa hồng đại lý`)}{' '}
                            {percentageComissionAgent && <>({percentageComissionAgent * 100}%)</>}
                        </p>
                    }
                    initialValue={saleOrder?.agencyCommissionAmt}
                >
                    <InputNumber
                        className="w-full"
                        formatter={value => Intl.NumberFormat('en-US').format(Number(value))}
                        disabled
                    />
                </Form.Item>
            </>
        );
    };

    const renderCommissionAgentBookedTN = () => {
        return (
            <>
                <Form.Item
                    name="commissionAmount"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={
                        <p className="mb-1 font-semibold">
                            {i18n.t(`Hoa hồng được nhận`)} {percentageComission && <>({percentageComission * 100}%)</>}
                        </p>
                    }
                    initialValue={saleOrder?.commissionAmt}
                >
                    <InputNumber
                        className="w-full"
                        formatter={value => Intl.NumberFormat('en-US').format(Number(value))}
                        disabled
                    />
                </Form.Item>
                <Form.Item
                    name="agencyCommissionAmt"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={
                        <p className="mb-1 font-semibold">
                            {i18n.t(`Hoa hồng đại lý`)}{' '}
                            {percentageComissionAgent && <>({percentageComissionAgent * 100}%)</>}
                        </p>
                    }
                    initialValue={saleOrder?.agencyCommissionAmt}
                >
                    <InputNumber
                        className="w-full"
                        formatter={value => Intl.NumberFormat('en-US').format(Number(value))}
                        disabled
                    />
                </Form.Item>
                <Form.Item
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={<p className="mb-1 font-semibold">{i18n.t(`Lợi nhuận`)}</p>}
                >
                    <InputNumber
                        className="w-full"
                        disabled
                        value={Intl.NumberFormat('en-US').format(
                            Number((saleOrder?.commissionAmt ?? 0) - (saleOrder?.agencyCommissionAmt ?? 0)),
                        )}
                    />
                </Form.Item>
            </>
        );
    };

    const renderCommissionTourTNForHNH = () => {
        return (
            <>
                <Form.Item
                    name="integrationCommissionAmt"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={
                        <p className="mb-1 font-semibold">
                            {i18n.t(`Hoa hồng được nhận`)} {percentageComission && <>({percentageComission * 100}%)</>}
                        </p>
                    }
                >
                    <InputNumber
                        className="w-full"
                        formatter={value => Intl.NumberFormat('en-US').format(Number(value))}
                        disabled
                        value={saleOrder.integrationCommissionAmt}
                    />
                </Form.Item>
            </>
        );
    };

    const renderCommissionDefault = () => {
        return (
            <>
                <Form.Item
                    name="presenter"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={<p className="mb-1 font-semibold">{i18n.t(`saleorder.commission.referrer`)}</p>}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="presenterPhone"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={<p className="mb-1 font-semibold">{i18n.t(`saleorder.commission.phone`)}</p>}
                    rules={[
                        {
                            pattern: AppConfig.PhoneRegex,
                            message: i18n.t('validation.default.errorPhone'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="commissionAmount"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                    label={
                        <p className="mb-1 font-semibold">
                            {i18n.t(`saleorder.commission.commission`)}{' '}
                            {percentageComission && <>({percentageComission * 100}%)</>}
                        </p>
                    }
                >
                    <InputNumber
                        className="w-full"
                        formatter={value => Intl.NumberFormat('en-US').format(Number(value))}
                        disabled
                    />
                </Form.Item>
            </>
        );
    };

    useEffect(() => {
        if (commission) {
            form.setFieldsValue(commission);
        }
    }, [form, commission]);

    useEffect(() => {
        if (shouldDisableAllForm(saleOrder.status) || (saleOrder.id && (!isOwner || isSOTN))) {
            setCommission({
                commissionAmount: saleOrder.commissionAmt,
                integrationCommissionAmt: saleOrder.integrationCommissionAmt,
                agencyCommissionAmt: saleOrder.agencyCommissionAmt,
            });
        } else if (tourSchedule.id && !(saleOrder.id && (tourSchedule as TourScheduleDto)?.hasTourThienNhien)) {
            const vat = dataVAT?.data?.find(x => x.id === vatIdFormWatch)?.value ?? 0;
            const commissionAmount = calculateComissionAmount(
                tourSchedule,
                travellerTotalAmount,
                surchargeTotalAmount,
                setPercentageComission,
                setPercentageComissionAgent,
                travellers,
                vat,
                ObjectType.Referrer,
            );

            const commissionAmountAgent = calculateComissionAmount(
                tourSchedule,
                travellerTotalAmount,
                surchargeTotalAmount,
                setPercentageComission,
                setPercentageComissionAgent,
                travellers,
                vat,
                ObjectType.Agent,
            );

            setCommission({
                ...(isOwner && !(tourSchedule as TourScheduleDto)?.hasTourThienNhien
                    ? { commissionAmount: commissionAmount }
                    : {}),
                ...(!isOwner ? { agencyCommissionAmt: commissionAmountAgent } : {}),
            });
        }
    }, [
        dataVAT?.data,
        isOwner,
        isSOTN,
        saleOrder.agencyCommissionAmt,
        saleOrder.commissionAmt,
        saleOrder.id,
        saleOrder.integrationCommissionAmt,
        saleOrder.status,
        setCommission,
        surchargeTotalAmount,
        tourSchedule,
        travellerTotalAmount,
        travellers,
        vatIdFormWatch,
    ]);

    return (
        <Form
            form={form}
            initialValues={commission}
            className="bg-white w-full col-span-12 lg:col-span-7 p-4 border border-solid border-gray-100 overflow-hidden"
            layout="vertical"
            onValuesChange={onValuesChange}
            disabled={shouldDisableAllForm(saleOrder.status) || isSOTN}
        >
            <div className="grid gap-4">
                {isOwner &&
                    soId &&
                    !saleOrder.isGroupGlobal &&
                    !(tourSchedule as TourScheduleDto)?.hasTourThienNhien &&
                    renderCommissionAgentBookedHNH()}
                {isOwner &&
                    soId &&
                    !saleOrder.isGroupGlobal &&
                    (tourSchedule as TourScheduleDto)?.hasTourThienNhien &&
                    renderCommissionAgentBookedTN()}
                {isOwner &&
                    (saleOrder.isGroupGlobal || !soId) &&
                    !(tourSchedule as TourScheduleDto)?.hasTourThienNhien &&
                    renderCommissionDefault()}
                {isOwner &&
                    (saleOrder.isGroupGlobal || !soId) &&
                    (tourSchedule as TourScheduleDto)?.hasTourThienNhien &&
                    renderCommissionTourTNForHNH()}
                {!isOwner && renderCommissionAgent()}
            </div>
        </Form>
    );
};
