import { Form, FormInstance, Input } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ObjectType, SaleOrderLineTravellerDto, TourScheduleDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';
import { AppConfig } from '@src/new/shared/utils/config';
import { convertValues } from '@utils/formHelper';

import { calculateComissionAmount } from '../../../features';
import { useQueryGetTourScheduleUseId } from '../../../hooks/queries';

interface CommissionRefProps {
    commissionRefForm: FormInstance;
    tourInfoForm: FormInstance;
    totalAmountForm: FormInstance;
    travellersForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
}

export const CommissionRef: React.FC<CommissionRefProps> = props => {
    const { commissionRefForm, tourInfoForm, totalAmountForm, travellersForm, isEnableEdit, setIsEnableEdit } = props;

    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);
    const commissionAmtFormWatch = Form.useWatch('commissionAmt', commissionRefForm);
    const totalIncludeVatAmtWatch = Form.useWatch('totalIncludeVatAmt', totalAmountForm);

    const travellersFormWatch = Form.useWatch([], travellersForm);
    const dataTravellersConvert: SaleOrderLineTravellerDto[] = convertValues(travellersFormWatch);

    // State
    const [percentageComission, setPercentageComission] = useState<number | undefined>(undefined);

    // Query
    const { data: dataTourSchedule } = useQueryGetTourScheduleUseId(tourIdWatch);

    const onValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    useEffect(() => {
        if (!isEmpty(dataTourSchedule)) {
            const commissionAmount = calculateComissionAmount(
                dataTourSchedule as TourScheduleDto,
                totalIncludeVatAmtWatch,
                setPercentageComission,
                dataTravellersConvert,
                ObjectType.Referrer,
            );

            commissionRefForm.setFieldValue('commissionAmt', commissionAmount);
        }
    }, [commissionRefForm, dataTourSchedule, dataTravellersConvert, totalIncludeVatAmtWatch]);

    return (
        <Form form={commissionRefForm} className="p-5" onValuesChange={onValuesChange}>
            <div className="grid grid-cols-2 gap-2">
                <p className="mb-1">{i18n.t(`saleorder.commission.phone`)}</p>
                <Form.Item
                    name="presenterPhone"
                    className="col-span-4 lg:col-span-1"
                    rules={[
                        {
                            pattern: AppConfig.PhoneRegex,
                            message: i18n.t('validation.default.errorPhone'),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <p className="mb-1">{i18n.t(`saleorder.commission.referrer`)}</p>
                <Form.Item name="presenter" className="col-span-4 lg:col-span-1">
                    <Input />
                </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <p className="mb-1">
                    {i18n.t(`saleorder.commission.commission`)}{' '}
                    {percentageComission && <>({percentageComission * 100}%)</>}
                </p>
                <Form.Item name="commissionAmt" className="col-span-4 lg:col-span-1 mb-0">
                    <Price value={commissionAmtFormWatch} className="font-bold text-right" />
                </Form.Item>
            </div>
        </Form>
    );
};
