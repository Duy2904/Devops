import 'dayjs/locale/vi';

import {
    CreateTransportationTourServiceRequest,
    DeleteTransportationTourServiceRequest,
    TourGitDto,
    TourScheduleDto,
    UpdateTransportationTourServiceRequest,
} from '@sdk/tour-operations';
import { Form, FormInstance } from 'antd';
import {
    useCreateTransportationTourService,
    useDeleteTourServiceTransportation,
    useUpdateTransportationTourService,
} from '@hooks/queries/useTourService';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { TransportationCheckbox } from '@fragments/Tour/TourDetail/Components/ProductService/Checkbox/TransportationCheckbox';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { useProductTypesStore } from '@store/productTypeStore';
import { useTourFormStore } from '@store/tourFormStore';
import { useTransportationStore } from '@store/transportationStore';

interface TourServiceTransportationProps {
    tourSchedule?: TourScheduleDto | TourGitDto;
    transportFromTour: AnyObject;
    listCodeProductType: AnyObject;
    setTransportFromTour: React.Dispatch<React.SetStateAction<AnyObject>>;
    tourTransportationForm: FormInstance;
    infoForm?: FormInstance;
    hasModifyTourFITPermission?: boolean;
    isCloneTour?: boolean;
}

export const TourServiceTransportation: React.FC<TourServiceTransportationProps> = props => {
    const valuesInfoForm = Form.useWatch([], props.infoForm);
    const valuesTransportationForm = Form.useWatch([], props.tourTransportationForm);
    const [listCodeTransportationType, setListCodeTransportationType] = useState<AnyObject>([]);
    const { transportations } = useTransportationStore(state => state);
    const { ProductTypes } = useProductTypesStore(state => state);
    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus },
    } = useTourFormStore(state => state);
    const { mutateAsync: createTransportationTourService } = useCreateTransportationTourService();
    const { mutateAsync: updateTransportationTourService } = useUpdateTransportationTourService();
    const { mutateAsync: deleteTourServiceTransportation } = useDeleteTourServiceTransportation();

    const changeListTransport = (checkedValues: CheckboxValueType[]) => {
        props.setTransportFromTour(checkedValues);
        setListCodeTransportationType(
            transportations.filter(item => checkedValues.includes(item.id ?? '')).map(item => item.code),
        );
    };

    const changeValue = (value: AnyObject) => {
        if (value.depositDate) {
            props.tourTransportationForm.setFieldsValue({
                issuanceDate: undefined,
                nameEntryDate: undefined,
            });
        } else if (value.nameEntryDate) {
            props.tourTransportationForm.setFieldsValue({
                issuanceDate: undefined,
            });
        }
    };

    const handlePlane = (tourScheduleId: string, productId: string, values: AnyObject) => {
        const transportationId = transportations.find(item => item.code == 'plane')?.id;
        const listDateEdited = {
            depositDate: dayjs(values.depositDate).startOf('day').utc().toDate(),
            issuanceDate: dayjs(values.issuanceDate).startOf('day').utc().toDate(),
            nameEntryDate: dayjs(values.nameEntryDate).startOf('day').utc().toDate(),
        };
        if (!values.id) {
            const dataFetch: CreateTransportationTourServiceRequest = {
                ...values,
                ...listDateEdited,
                tourScheduleId,
                productTypeId: productId,
                transportationId: transportationId,
            };
            return createTransportationTourService(dataFetch);
        } else {
            const dataFetch: UpdateTransportationTourServiceRequest = {
                ...values,
                ...listDateEdited,
            };
            return updateTransportationTourService(dataFetch);
        }
    };

    const handleOtherTransportation = (value: string, tourScheduleId: string, productId: string, values: AnyObject) => {
        const transportationId = transportations.find(item => item.code === value)?.id ?? '';
        const dataFetch: CreateTransportationTourServiceRequest = {
            ...values,
            tourScheduleId,
            productTypeId: productId,
            transportationId,
        };

        if (
            (props.isCloneTour && !props.tourSchedule?.id) ||
            (props.tourSchedule && !props.tourSchedule.transportationIds?.includes(transportationId))
        ) {
            createTransportationTourService(dataFetch);
        }
    };

    const handleRemoveTransportation = (tourScheduleId: string, transportationId: string) => {
        const dataFetch: DeleteTransportationTourServiceRequest = {
            tourScheduleId,
            transportationId,
        };
        return deleteTourServiceTransportation(dataFetch);
    };

    const onTourTransportationSubmit = async (values: AnyObject) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;

        if (!tourScheduleId) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourTransportationFormSuccess: true,
            });
            return;
        }

        const productId = ProductTypes.find(item => item.code == 'DiChuyen')?.id ?? '';

        const transportationRemoved = props.tourSchedule?.transportationIds?.filter(
            itemInTourSchedule => !props.transportFromTour.includes(itemInTourSchedule),
        );

        const fetchData = listCodeTransportationType.forEach((value: string) => {
            value === 'plane'
                ? handlePlane(tourScheduleId, productId, values)
                : handleOtherTransportation(value, tourScheduleId, productId, values);
        });

        const fetchRemoveData = transportationRemoved?.map((value: string) =>
            handleRemoveTransportation(tourScheduleId, value),
        );

        try {
            await Promise.all([fetchData, fetchRemoveData].filter(Boolean));
        } finally {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourTransportationFormSuccess: true,
            });
        }
    };

    useEffect(() => {
        if (props.transportFromTour) {
            setListCodeTransportationType(
                transportations.filter(item => props.transportFromTour.includes(item.id ?? '')).map(item => item.code),
            );
        }
    }, [props.transportFromTour, transportations]);

    useEffect(() => {
        if (props.tourSchedule) {
            const transportService = props.tourSchedule?.transportationTourServices?.find(
                item => item.transportationCode == 'plane',
            );
            props.tourTransportationForm.setFieldsValue({
                ...transportService,
                depositDate: transportService?.depositDate ? dayjs(transportService?.depositDate) : undefined,
                issuanceDate: transportService?.issuanceDate ? dayjs(transportService?.issuanceDate) : undefined,
                nameEntryDate: transportService?.nameEntryDate ? dayjs(transportService?.nameEntryDate) : undefined,
            });
        }
    }, [props.tourSchedule, props.tourTransportationForm]);

    return (
        <Form
            form={props.tourTransportationForm}
            onFinish={onTourTransportationSubmit}
            onValuesChange={changeValue}
            layout="vertical"
        >
            <TransportationCheckbox
                className="customize-checkbox mt-2"
                onChange={changeListTransport}
                initialValue={props.transportFromTour}
                disable={!props.hasModifyTourFITPermission}
            />
            {listCodeTransportationType.find((item: string) => item === 'plane') && (
                <>
                    <BaseInput name="id" isForm isHidden />
                    <BaseInput name="tourScheduleId" isForm isHidden />
                    <BaseInput name="productTypeId" isForm isHidden />
                    <BaseInput name="transportationId" isForm isHidden />
                    <fieldset className="p-4 rounded-md border-gray-100/40 my-4 relative">
                        <legend className="!text-sm !px-2 !w-fit text-gray-500 !mb-0 !border-none">
                            {i18n.t('tour.passengerType.plane')}
                        </legend>
                        <div className="grid grid-cols-3 gap-4 w-full">
                            <BaseDatePicker
                                className="col-span-3 lg:col-span-1 mb-0"
                                name="depositDate"
                                label={
                                    <p className="text-xs font-medium">{i18n.t('tour.passengerType.depositAmount')}</p>
                                }
                                rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                                format="date"
                                placeholder={i18n.t('tour.passengerType.depositAmount')}
                                disabledDate={current =>
                                    current <= valuesInfoForm?.saleStartDate ||
                                    current > dayjs(valuesInfoForm?.departureDate)
                                }
                                disabled={!valuesInfoForm?.departureDate || !props.hasModifyTourFITPermission}
                                customDefaultValue={valuesInfoForm?.saleStartDate}
                            />
                            <BaseDatePicker
                                className="col-span-3 lg:col-span-1 mb-0"
                                name="nameEntryDate"
                                label={
                                    <p className="text-xs font-medium">{i18n.t('tour.passengerType.includeName')}</p>
                                }
                                rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                                format="date"
                                placeholder={i18n.t('tour.passengerType.includeName')}
                                disabledDate={current =>
                                    current <= dayjs(valuesTransportationForm?.depositDate) ||
                                    current > dayjs(valuesInfoForm?.departureDate)
                                }
                                disabled={!valuesInfoForm?.departureDate || !props.hasModifyTourFITPermission}
                                customDefaultValue={valuesTransportationForm?.depositDate}
                            />
                            <BaseDatePicker
                                className="col-span-3 lg:col-span-1 mb-0"
                                name="issuanceDate"
                                label={<p className="text-xs font-medium">{i18n.t('tour.passengerType.entryDate')}</p>}
                                rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                                format="date"
                                placeholder={i18n.t('tour.passengerType.entryDate')}
                                disabledDate={current =>
                                    current <= dayjs(valuesTransportationForm?.nameEntryDate) ||
                                    current > dayjs(valuesInfoForm?.departureDate)
                                }
                                disabled={
                                    !valuesTransportationForm?.depositDate ||
                                    !valuesTransportationForm?.nameEntryDate ||
                                    !valuesInfoForm?.departureDate ||
                                    !props.hasModifyTourFITPermission
                                }
                                customDefaultValue={valuesTransportationForm?.nameEntryDate}
                            />
                        </div>
                    </fieldset>
                </>
            )}
        </Form>
    );
};
