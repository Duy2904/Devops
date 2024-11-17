import 'dayjs/locale/vi';

import {
    CreateVisaTourServiceRequest,
    TourGitDto,
    TourScheduleDto,
    UpdateVisaTourServiceRequest,
} from '@sdk/tour-operations';
import { Form, FormInstance } from 'antd';
import {
    useCreateVisaTourService,
    useDeleteTourService,
    useUpdateVisaTourService,
} from '@hooks/queries/useTourService';

import { AnyObject } from 'antd/es/_util/type';
import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { TourType } from '@src/types/TypeEnum';
import { TourVisaCondition } from '../../TourFit/TourCondition/TourVisaCondition';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { useEffect } from 'react';
import { useProductTypesStore } from '@store/productTypeStore';
import { useTourFormStore } from '@store/tourFormStore';

export interface TourServiceVisaProps {
    tourSchedule?: TourScheduleDto | TourGitDto;
    listCodeProductType: AnyObject;
    tourVisaForm: FormInstance;
    infoForm?: FormInstance;
    hasModifyTourFITPermission?: boolean;
    tourType?: TourType;
}

export const TourServiceVisa: React.FC<TourServiceVisaProps> = props => {
    const valuesInfoForm = Form.useWatch([], props.infoForm);
    const valuesVisaForm = Form.useWatch([], props.tourVisaForm);

    const { ProductTypes } = useProductTypesStore(state => state);
    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus },
    } = useTourFormStore(state => state);

    const { mutateAsync: createVisaTourService } = useCreateVisaTourService();
    const { mutateAsync: updateVisaTourService } = useUpdateVisaTourService();
    const { mutateAsync: deleteTourService } = useDeleteTourService();

    const changeValue = (value: AnyObject) => {
        if (value.visaSubmissionDate) {
            props.tourVisaForm.setFieldsValue({
                visaSubmissionToConsulateDate: undefined,
                visaResultReturnDate: undefined,
            });
        } else if (value.visaSubmissionToConsulateDate) {
            props.tourVisaForm.setFieldsValue({
                visaResultReturnDate: undefined,
            });
        }
    };

    const onFinish = async (values: AnyObject) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;
        if (!tourScheduleId) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourVisaFormSuccess: true,
            });
            return;
        }

        try {
            if (props.listCodeProductType.includes('Visa')) {
                const listDateEdited = {
                    visaSubmissionDate: dayjs(values.visaSubmissionDate).startOf('day').utc().toDate(),
                    visaSubmissionToConsulateDate: dayjs(values.visaSubmissionToConsulateDate)
                        .startOf('day')
                        .utc()
                        .toDate(),
                    visaResultReturnDate: dayjs(values.visaResultReturnDate).startOf('day').utc().toDate(),
                };
                if (!props.tourSchedule?.visaTourService?.id) {
                    const productId = ProductTypes.find(item => item.code == 'Visa')?.id;
                    const dataFetch: CreateVisaTourServiceRequest = {
                        ...values,
                        ...listDateEdited,
                        tourScheduleId,
                        productTypeId: productId,
                    };
                    await createVisaTourService(dataFetch);
                } else {
                    const dataUpdate: UpdateVisaTourServiceRequest = {
                        ...values,
                        ...listDateEdited,
                    };
                    await updateVisaTourService(dataUpdate);
                }
            } else {
                await deleteTourService(values?.id);
            }
        } finally {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourVisaFormSuccess: true,
            });
        }
    };

    useEffect(() => {
        if (props.tourSchedule) {
            const tourScheduleFetch = props.tourSchedule;
            const visaService = tourScheduleFetch?.visaTourService;
            props.tourVisaForm.setFieldsValue({
                ...visaService,
                visaSubmissionDate: visaService?.visaSubmissionDate
                    ? dayjs(visaService?.visaSubmissionDate)
                    : undefined,
                visaSubmissionToConsulateDate: visaService?.visaSubmissionToConsulateDate
                    ? dayjs(visaService?.visaSubmissionToConsulateDate)
                    : undefined,
                visaResultReturnDate: visaService?.visaResultReturnDate
                    ? dayjs(visaService?.visaResultReturnDate)
                    : undefined,
            });
        }
    }, [props.tourSchedule, props.tourVisaForm]);

    return (
        <Form form={props.tourVisaForm} onFinish={onFinish} onValuesChange={changeValue} layout="vertical">
            <BaseInput name="id" isForm isHidden />
            <BaseInput name="tourScheduleId" isForm isHidden />
            <BaseInput name="productTypeId" isForm isHidden />
            <fieldset className="p-4 rounded-md border-gray-100/40 my-4 relative">
                <legend className="!text-sm !px-2 !w-fit text-gray-500 !mb-0 !border-none">
                    {i18n.t('tour.passengerType.visa')}
                </legend>
                <div className="grid grid-cols-3 gap-4 w-full">
                    <BaseDatePicker
                        className="col-span-3 lg:col-span-1 mb-0"
                        name="visaSubmissionDate"
                        label={<p className="text-xs font-medium">{i18n.t('tour.passengerType.visaSubmissionDate')}</p>}
                        rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                        format="date"
                        placeholder={i18n.t('tour.passengerType.visaSubmissionDate')}
                        disabledDate={current =>
                            current > dayjs(valuesInfoForm?.departureDate) || current <= valuesInfoForm?.saleStartDate
                        }
                        disabled={!valuesInfoForm?.departureDate || !props.hasModifyTourFITPermission}
                        customDefaultValue={valuesInfoForm?.saleStartDate}
                    />
                    <BaseDatePicker
                        className="col-span-3 lg:col-span-1 mb-0"
                        name="visaSubmissionToConsulateDate"
                        label={
                            <p className="text-xs font-medium">
                                {i18n.t('tour.passengerType.visaSubmissionToConsulateDate')}
                            </p>
                        }
                        rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                        format="date"
                        placeholder={i18n.t('tour.passengerType.visaSubmissionToConsulateDate')}
                        disabledDate={current =>
                            current <= dayjs(valuesVisaForm?.visaSubmissionDate) ||
                            current > dayjs(valuesInfoForm?.departureDate)
                        }
                        disabled={
                            !valuesVisaForm?.visaSubmissionDate ||
                            !valuesInfoForm?.departureDate ||
                            !props.hasModifyTourFITPermission
                        }
                        customDefaultValue={valuesVisaForm?.visaSubmissionDate}
                    />
                    <BaseDatePicker
                        className="col-span-3 lg:col-span-1 mb-0"
                        name="visaResultReturnDate"
                        label={
                            <p className="text-xs font-medium">{i18n.t('tour.passengerType.visaResultReturnDate')}</p>
                        }
                        rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                        format="date"
                        placeholder={i18n.t('tour.passengerType.visaResultReturnDate')}
                        disabledDate={current =>
                            current <= dayjs(valuesVisaForm?.visaSubmissionToConsulateDate) ||
                            current > dayjs(valuesInfoForm?.departureDate)
                        }
                        disabled={
                            !valuesVisaForm?.visaSubmissionDate ||
                            !valuesVisaForm?.visaSubmissionToConsulateDate ||
                            !valuesInfoForm?.departureDate ||
                            !props.hasModifyTourFITPermission
                        }
                        customDefaultValue={valuesVisaForm?.visaSubmissionToConsulateDate}
                    />
                </div>
            </fieldset>
            {props.tourType == TourType.FIT && (
                <fieldset className="p-4 rounded-md border-gray-100/40 my-4 relative">
                    <legend className="!text-sm !px-2 !w-fit text-gray-500 !mb-0 !border-none">
                        {i18n.t('tour.tourDetail.visaCondition')}
                    </legend>
                    <TourVisaCondition tourSchedule={props.tourSchedule} />
                </fieldset>
            )}
        </Form>
    );
};
