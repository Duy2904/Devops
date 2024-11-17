import { Checkbox, Col, Form, FormInstance, Table } from 'antd';
import { DepositType, DiscountConditionType, DiscountLineRequest, TourScheduleDto } from '@sdk/tour-operations';
import {
    getIdOfLastMinute,
    mappingData,
    validateDisableDateEndDate,
    validateDisableDateStartDate,
    validateDisableEndDate,
    validateDisableForm,
    validateDisableInput,
    validateDisableStartDate,
} from './Feature';
import { isEmpty, size } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useCreatePromotionDetail, useUpdatePromotionDetail } from '@fragments/PromotionProgram/hook/usePromoteProgram';

import { AnyObject } from 'antd/es/_util/type';
import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { ColumnsType } from 'antd/es/table';
import { ConditionSelect } from '@fragments/PromotionProgram/Detail/Seat/TableCondition/ConditionSelect';
import { DepositTypeSelect } from '@components/customizes/Select/DepositTypeSelect';
import { MyPermissions } from '@utils/Permissions/index.ts';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { useFetchPromotionProgramsOnTour } from '@fragments/Tour/hooks/useTourFit';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTourFormStore } from '@store/tourFormStore';

interface TourDiscountProps {
    form: FormInstance;
    tourDiscountForm: FormInstance;
    tourSchedule?: TourScheduleDto;
}

export const TourDiscount: React.FC<TourDiscountProps> = props => {
    const { form, tourDiscountForm, tourSchedule } = props;
    const numberOfRow = 2;
    const canWorkOnDiscount = useHasAnyPermission([
        !form.getFieldValue('id') ? MyPermissions.DiscountCreate : MyPermissions.DiscountUpdate,
    ]);
    const saleStartDate = Form.useWatch('saleStartDate', form);
    const saleEndDate = Form.useWatch('saleEndDate', form);
    const currencyId = Form.useWatch('currencyId', form);
    const discountFormUseWatch = Form.useWatch([], tourDiscountForm);

    const [dataForm, setDataForm] = useState<AnyObject[]>([]);
    const [endDateOfEB, setEndDateOfEB] = useState<dayjs.Dayjs | null>(null);

    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus },
    } = useTourFormStore(state => state);

    const { data: dataDetail, isLoading, refetch } = useFetchPromotionProgramsOnTour(tourSchedule?.id ?? tourScheduleFormStatus.tourScheduleId ?? '');
    const { mutateAsync: createDiscountDetail } = useCreatePromotionDetail();
    const { mutateAsync: updateDiscountDetail } = useUpdatePromotionDetail(dataDetail?.id ?? '');

    const handleGetEndDateOfEB = (values: dayjs.Dayjs | null) => {
        setEndDateOfEB(values);
        const idOfLastMinute = getIdOfLastMinute(discountFormUseWatch);
        tourDiscountForm.setFieldValue(['discountLineStartDate', idOfLastMinute], undefined);
        tourDiscountForm.setFieldValue(['discountLineEndDate', idOfLastMinute], undefined);
    };

    const handleChangeStartDateOfEB = () => {
        setEndDateOfEB(null);
        const idOfLastMinute = getIdOfLastMinute(discountFormUseWatch);
        tourDiscountForm.setFieldValue(['discountLineStartDate', idOfLastMinute], undefined);
        tourDiscountForm.setFieldValue(['discountLineEndDate', idOfLastMinute], undefined);
    };

    const columns: ColumnsType<DiscountLineRequest> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            align: 'center',
            render: (_, record: DiscountLineRequest, index: number) => (
                <>
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['discountLineId', record.id!]}
                        initialValue={record.id}
                    />
                    <>{index + 1}</>
                </>
            ),
        },
        {
            title: i18n.t('Điều kiện'),
            dataIndex: 'discountConditionType',
            key: 'discountConditionType',
            width: 100,
            render: (_, record: DiscountLineRequest) => (
                <ConditionSelect
                    name={['discountLineConditionType', record.id!]}
                    initialValue={record.discountConditionType}
                />
            ),
        },
        {
            title: i18n.t('Số chỗ'),
            dataIndex: 'quantity',
            key: 'quantity',
            width: 50,
            render: (_: number, record: DiscountLineRequest) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    name={['discountLineQuantity', record.id!]}
                    initialValue={record.quantity}
                    type="number"
                    disable={validateDisableInput(dataDetail, record, tourSchedule) || !canWorkOnDiscount}
                />
            ),
        },
        {
            title: i18n.t('Loại giá trị'),
            dataIndex: 'discountType',
            width: 100,
            render: (value: string, record: DiscountLineRequest) => (
                <DepositTypeSelect
                    isForm
                    className="mb-0"
                    name={['discountLineDiscountType', record.id!]}
                    initialValue={value ?? record.discountType}
                    disabled={validateDisableInput(dataDetail, record, tourSchedule) || !canWorkOnDiscount}
                />
            ),
        },
        {
            title: i18n.t('Giảm giá'),
            dataIndex: 'value',
            width: 100,
            render: (value: string, record: DiscountLineRequest) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    name={['discountLineDiscountValue', record.id!]}
                    initialValue={value ?? record.value ?? ''}
                    type="number"
                    rules={[
                        {
                            validator(_, value) {
                                if (
                                    value &&
                                    ((tourDiscountForm.getFieldValue(['discountLineDiscountType', record.id!]) ==
                                        DepositType.Percentage &&
                                        value > 100) ||
                                        value <= 0)
                                ) {
                                    return Promise.reject(new Error(''));
                                }
                                return Promise.resolve();
                            },
                        },
                        {
                            required: !!discountFormUseWatch?.discountLineQuantity?.[record.id!],
                            message: '',
                        },
                    ]}
                    disable={validateDisableInput(dataDetail, record, tourSchedule) || !canWorkOnDiscount}
                />
            ),
        },
        {
            title: i18n.t('Thời gian hiệu lực'),
            dataIndex: 'dateValid',
            width: 200,
            render: (_, record: DiscountLineRequest) => (
                <Col className="grid grid-cols-2 gap-4">
                    <BaseDatePicker
                        name={['discountLineStartDate', record.id!]}
                        className="col-span-2 lg:col-span-1 mb-0"
                        rules={[
                            {
                                required: !!discountFormUseWatch?.discountLineQuantity?.[record.id!],
                                message: '',
                            },
                        ]}
                        isRequired
                        format={'shortDate'}
                        disabled={
                            validateDisableStartDate(saleStartDate, dataDetail, tourSchedule, record) ||
                            !canWorkOnDiscount
                        }
                        disabledDate={current =>
                            validateDisableDateStartDate(
                                current,
                                saleStartDate,
                                saleEndDate,
                                tourDiscountForm,
                                record,
                                record.discountConditionType == DiscountConditionType.FirstPlaces ? null : endDateOfEB,
                            )
                        }
                        placeholder={i18n.t('Ngày bắt đầu')}
                        initialValue={record.startDate ? dayjs(record.startDate) : undefined}
                        customDefaultValue={saleStartDate}
                        onChange={() => {
                            tourDiscountForm.setFieldValue(['discountLineEndDate', record.id!], undefined);
                            record.discountConditionType == DiscountConditionType.FirstPlaces &&
                                handleChangeStartDateOfEB();
                        }}
                    />
                    <BaseDatePicker
                        name={['discountLineEndDate', record.id!]}
                        className="col-span-2 lg:col-span-1 mb-0"
                        rules={[
                            {
                                required: !!discountFormUseWatch?.discountLineQuantity?.[record.id!],
                                message: '',
                            },
                        ]}
                        isRequired
                        format={'shortDate'}
                        customDefaultValue={saleEndDate}
                        disabled={
                            validateDisableEndDate(saleEndDate, tourDiscountForm, record, dataDetail, tourSchedule) ||
                            !canWorkOnDiscount
                        }
                        disabledDate={current =>
                            validateDisableDateEndDate(current, tourDiscountForm, record, saleEndDate)
                        }
                        placeholder={i18n.t('Ngày kết thúc')}
                        initialValue={record.endDate ? dayjs(record.endDate) : undefined}
                        onChange={values =>
                            record.discountConditionType == DiscountConditionType.FirstPlaces &&
                            handleGetEndDateOfEB(values)
                        }
                    />
                </Col>
            ),
        },
    ];

    const handleSpecialRow = useCallback(() => {
        const newDataForm = [...dataForm];
        if (!dataForm.find(item => item.discountConditionType == DiscountConditionType.FirstPlaces)) {
            newDataForm.push({
                id: `discount--FirstPlaces`,
                discountConditionType: DiscountConditionType.FirstPlaces,
                discountType: DepositType.Percentage,
            });
        }
        if (!dataForm.find(item => item.discountConditionType == DiscountConditionType.LastPlaces)) {
            newDataForm.push({
                id: `discount--LastPlaces`,
                discountConditionType: DiscountConditionType.LastPlaces,
                discountType: DepositType.Percentage,
            });
        }

        setDataForm(newDataForm);
    }, [dataForm]);

    const onFinish = async (values: AnyObject) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? tourSchedule?.id;
        const tempData = mappingData(values, tourScheduleId ?? '');
        if (!tourScheduleId || size(tempData.discountLines) == 0 || !canWorkOnDiscount) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourDiscountFormSuccess: true,
            });
            return;
        }
        let res;
        if (tempData.id) {
            res = await updateDiscountDetail({ ...tempData, currencyId: currencyId });
        } else {
            res = await createDiscountDetail({ ...tempData, currencyId: currencyId });
            refetch();
        }
        if (res) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourDiscountFormSuccess: true,
            });
        }
    };

    useEffect(() => {
        if (size(dataForm) !== numberOfRow) {
            handleSpecialRow();
        }
    }, [dataForm, handleSpecialRow]);

    useEffect(() => {
        if (!isEmpty(dataDetail)) {
            const sortedData = dataDetail.discountLines?.sort((a, b) => {
                if (a.discountConditionType! < b.discountConditionType!) return -1;
                if (a.discountConditionType! > b.discountConditionType!) return 1;
                return 0;
            });
            const dataDetailTemp = { ...dataDetail, discountLines: sortedData };
            tourDiscountForm.setFieldsValue(dataDetailTemp);
            setDataForm(dataDetail.discountLines ?? []);
            const endDateOfEB = dataDetail.discountLines?.find(
                item => item.discountConditionType == DiscountConditionType.FirstPlaces,
            )?.endDate;
            if (endDateOfEB) {
                setEndDateOfEB(dayjs(endDateOfEB));
            }
        }
    }, [dataDetail, tourDiscountForm]);

    return (
        <div className="mb-10">
            <p className="text-blue-600 mb-4">{i18n.t('CTKM EarlyBird, LastMinute')}</p>
            <Form form={tourDiscountForm} layout="vertical" onFinish={onFinish}>
                <Col className="grid grid-cols-5 gap-5 items-end pb-5">
                    <BaseInput isForm name="id" isHidden />
                    <BaseInput
                        isForm
                        name="code"
                        className="col-span-5 lg:col-span-2 mb-0"
                        label={i18n.t('Mã CTKM')}
                        disable
                    />
                    <BaseInput
                        className=" col-span-5 lg:col-span-2 mb-0"
                        isForm
                        name="name"
                        label={i18n.t('Tên CTKM')}
                        disable={dataDetail?.isUsed || validateDisableForm(tourSchedule) || !canWorkOnDiscount}
                    />
                    <Col className="flex justify-center">
                        <Form.Item className="mb-0" name="isActive" valuePropName="checked">
                            <Checkbox
                                disabled={dataDetail?.isUsed || validateDisableForm(tourSchedule) || !canWorkOnDiscount}
                            >
                                {i18n.t('Sử dụng')}
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Col>
                <div className="bg-[#FAFAFA] p-4 rounded-md my-2">
                    <Table
                        columns={columns}
                        dataSource={dataForm}
                        rowKey="id"
                        bordered
                        pagination={false}
                        size="small"
                        loading={isLoading}
                    />
                </div>
            </Form>
        </div>
    );
};
