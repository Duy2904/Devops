import { Form, FormInstance } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { ObjectType, SaleOrderDto, SaleOrderLineTravellerDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';
import { useCheckTourSendGuest } from '@src/new/fragments/SaleOrders/hooks/useCheckTourSendGuest';
import { convertValues } from '@utils/formHelper';

import { calculateComissionAmount, RouteChangeTourSOState } from '../../../features';
import { useQueryGetTourScheduleUseId } from '../../../hooks/queries';

interface CommissionCollabProps {
    dataSO?: SaleOrderDto;
    commissionCollabForm: FormInstance;
    tourInfoForm: FormInstance;
    totalAmountForm: FormInstance;
    travellersForm: FormInstance;
}

export const CommissionCollab: React.FC<CommissionCollabProps> = props => {
    const { dataSO, commissionCollabForm, tourInfoForm, totalAmountForm, travellersForm } = props;

    const { soId } = useParams<string>();
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;

    // Store
    const { data: personInfo } = useFetchPersonalIdentityInfo();

    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);
    const integrationCommissionAmtWatch = Form.useWatch('integrationCommissionAmt', commissionCollabForm);
    const agencyCommissionAmtWatch = Form.useWatch('agencyCommissionAmt', commissionCollabForm);
    const totalIncludeVatAmtWatch = Form.useWatch('totalIncludeVatAmt', totalAmountForm);

    const travellersFormWatch = Form.useWatch([], travellersForm);
    const dataTravellersConvert: SaleOrderLineTravellerDto[] = convertValues(travellersFormWatch);

    // State
    const [percentageComission, setPercentageComission] = useState<number | undefined>(undefined);
    const [percentageComissionAgent, setPercentageComissionAgent] = useState<number | undefined>(undefined);

    // Query
    const { data: dataTourSchedule } = useQueryGetTourScheduleUseId(tourIdWatch);

    const isTourSendGuest = useCheckTourSendGuest({ dataTourSchedule });

    const isOwner = useMemo(() => personInfo?.isGlobal, [personInfo?.isGlobal]);

    const renderCommissionAgent = () => {
        return (
            <div className="grid grid-cols-2 gap-2">
                <p>
                    {i18n.t(`saleorder.commission.commission`)}{' '}
                    {percentageComissionAgent && <>({percentageComissionAgent * 100}%)</>}
                </p>
                <Form.Item
                    name="agencyCommissionAmt"
                    className="col-span-4 lg:col-span-1 mb-0"
                    initialValue={dataSO?.agencyCommissionAmt}
                >
                    <Price value={agencyCommissionAmtWatch} className="font-bold text-right" />
                </Form.Item>
            </div>
        );
    };

    const renderCommissionAgentBookedHNH = () => {
        return (
            <>
                <div className="grid grid-cols-2 gap-2">
                    <p>
                        {i18n.t(`Hoa hồng đại lý`)}{' '}
                        {percentageComissionAgent && <>({percentageComissionAgent * 100}%)</>}
                    </p>
                    <Form.Item
                        name="agencyCommissionAmt"
                        className="col-span-4 lg:col-span-1 mb-0"
                        initialValue={dataSO?.agencyCommissionAmt}
                    >
                        <Price value={agencyCommissionAmtWatch} className="font-bold text-right" />
                    </Form.Item>
                </div>
            </>
        );
    };

    const renderCommissionAgentBookedTN = () => {
        return (
            <>
                <div className="grid grid-cols-2 gap-2">
                    <p>
                        {i18n.t(`Hoa hồng được nhận`)} {percentageComission && <>({percentageComission * 100}%)</>}
                    </p>
                    <Form.Item
                        name="integrationCommissionAmt"
                        className="col-span-4 lg:col-span-1 mb-0"
                        initialValue={dataSO?.integrationCommissionAmt}
                    >
                        <Price value={integrationCommissionAmtWatch} className="font-bold text-right" />
                    </Form.Item>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <p>
                        {i18n.t(`Hoa hồng đại lý`)}{' '}
                        {percentageComissionAgent && <>({percentageComissionAgent * 100}%)</>}
                    </p>
                    <Form.Item name="agencyCommissionAmt" className="col-span-4 lg:col-span-1 mb-0">
                        <Price value={agencyCommissionAmtWatch} className="font-bold text-right" />
                    </Form.Item>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <p>{i18n.t(`Lợi nhuận`)}</p>
                    <Price
                        className="font-bold text-right"
                        value={Number((integrationCommissionAmtWatch ?? 0) - (agencyCommissionAmtWatch ?? 0))}
                    />
                </div>
            </>
        );
    };

    const renderCommissionTourTNForHNH = () => {
        return (
            <>
                <div className="grid grid-cols-2 gap-2">
                    <p>
                        {i18n.t(`Hoa hồng được nhận`)} {percentageComission && <>({percentageComission * 100}%)</>}
                    </p>
                    <Form.Item
                        name="integrationCommissionAmt"
                        className="col-span-4 lg:col-span-1 mb-0"
                        initialValue={dataSO?.commissionAmt}
                    >
                        <Price value={0} className="font-bold text-right" />
                    </Form.Item>
                </div>
            </>
        );
    };

    useEffect(() => {
        if (dataTourSchedule?.id && !(soId && isTourSendGuest)) {
            const commissionAmount = calculateComissionAmount(
                dataTourSchedule,
                totalIncludeVatAmtWatch,
                setPercentageComission,
                dataTravellersConvert,
                ObjectType.Referrer,
            );

            const commissionAmountAgent = calculateComissionAmount(
                dataTourSchedule,
                totalIncludeVatAmtWatch,
                setPercentageComissionAgent,
                dataTravellersConvert,
                ObjectType.Agent,
            );

            isOwner && !isTourSendGuest && commissionCollabForm.setFieldValue('commissionAmt', commissionAmount);
            !isOwner && commissionCollabForm.setFieldValue('agencyCommissionAmt', commissionAmountAgent);
        }
    }, [
        changeTourSOId,
        commissionCollabForm,
        dataTourSchedule,
        dataTravellersConvert,
        isOwner,
        isTourSendGuest,
        soId,
        totalIncludeVatAmtWatch,
    ]);

    return (
        <Form form={commissionCollabForm} className="p-5">
            <div className="grid gap-4">
                {isOwner &&
                    (soId || changeTourSOId) &&
                    !dataSO?.isGroupGlobal &&
                    !isTourSendGuest &&
                    renderCommissionAgentBookedHNH()}
                {isOwner &&
                    (soId || changeTourSOId) &&
                    !dataSO?.isGroupGlobal &&
                    isTourSendGuest &&
                    renderCommissionAgentBookedTN()}
                {isOwner &&
                    (dataSO?.isGroupGlobal || !(soId || changeTourSOId)) &&
                    isTourSendGuest &&
                    renderCommissionTourTNForHNH()}
                {!isOwner && renderCommissionAgent()}
            </div>
        </Form>
    );
};
