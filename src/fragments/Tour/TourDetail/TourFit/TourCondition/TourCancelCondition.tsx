import {
    CancellationConditionDto,
    CreateCancellationConditionCollectionRequest,
    DepositType,
    TourScheduleDto,
    UpdateCancellationConditionRequest,
} from '@sdk/tour-operations';
import { Col, Flex, Form, FormInstance, Table } from 'antd';
import { Pattern, convertValues } from '@utils/formHelper';
import { dateChange, disabledDate, handleDateValue, isHidden, numberOfDateChange } from './Feature';
import {
    getPaymentOption,
    useCreateCancellationConditionCollection,
    useDeleteCancellationCondition,
    useUpdateCancellationCondition,
} from '@hooks/queries/useCancellationCondition';
import { useCallback, useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import Can from '@components/common/Can';
import { CancellationTypeSelect } from '@components/customizes/Select/CancellationType';
import { ColumnsType } from 'antd/es/table';
import { CreateActionButton } from '@components/customizes/Button/CreateActionButton';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { DeleteOutlined } from '@ant-design/icons';
import { DepositTypeSelect } from '@components/customizes/Select/DepositTypeSelect';
import { EnumOptionSelect } from '@components/customizes/Select/EnumOptionSelect';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import isInteger from 'lodash/isInteger';
import isNil from 'lodash/isNil';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useCancellationTypeStore } from '@store/cancellationTypeStore';
import { useDebouncedCallback } from 'use-debounce';
import { useGetCancellationType } from '@hooks/queries/useCancellationType';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTourFormStore } from '@store/tourFormStore';

interface TourCancelConditionProps {
    tourCancelForm: FormInstance;
    tourSchedule?: TourScheduleDto;
    form: FormInstance;
    isCloned?: boolean;
}

export const TourCancelCondition: React.FC<TourCancelConditionProps> = props => {
    const cancelFormUseWatch = Form.useWatch([], props.tourCancelForm);
    const departureDate = Form.useWatch('departureDate', props.form);
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitUpdate]);
    const [count, setCount] = useState<number>(0);
    const paymentOption = getPaymentOption();
    const [dataCancel, setDataCancel] = useState<AnyObject[]>([]);
    const [listDateChecked, setListDateChecked] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [firstBeforeDeparture, setFirstBeforeDeparture] = useState<string>();

    const { mutateAsync: createCancellationConditionCollection } = useCreateCancellationConditionCollection();
    const { mutateAsync: updateCancellationCondition } = useUpdateCancellationCondition();
    const { mutateAsync: deleteCancellationCondition } = useDeleteCancellationCondition();
    const { data: fetchDataCancellationType } = useGetCancellationType();
    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus },
    } = useTourFormStore(state => state);
    const {
        cancellationTypeList,
        actions: { setCancellationType },
    } = useCancellationTypeStore(state => state);

    const columns: ColumnsType<CancellationConditionDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            align: 'center',
            render: (value: string, record: CancellationConditionDto, index: number) => (
                <>
                    <BaseInput isForm isHidden name={['id', record.id!]} initialValue={value} />
                    <BaseInput
                        isForm
                        isHidden
                        name={['tourScheduleId', record.id!]}
                        initialValue={
                            record?.tourScheduleId ?? tourScheduleFormStatus?.tourScheduleId ?? props.tourSchedule?.id
                        }
                    />
                    <BaseInput isForm isHidden type="text" name={['order', record.id!]} initialValue={record.order} />
                    <>{index + 1}</>
                </>
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('tour.cancellation.condition')}
                </p>
            ),
            dataIndex: 'cancellationTypeId',
            width: 250,
            render: (value: string, record: CancellationConditionDto) => (
                <CancellationTypeSelect
                    isForm
                    className="mb-0"
                    name={['cancellationTypeId', record.id!]}
                    initialValue={value ?? record?.cancellationTypeId}
                    rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                    disabled
                />
            ),
        },
        {
            title: i18n.t('tour.cancellation.numberOfDate'),
            dataIndex: 'numberOfDate',
            width: 80,
            render: (value: string, record: CancellationConditionDto) => (
                <BaseInput
                    className="mb-0"
                    name={['numberOfDate', record.id!]}
                    initialValue={record?.numberOfDate ?? value}
                    type="number"
                    isForm
                    disable={!departureDate}
                    min={1}
                    isHidden={isHidden(cancellationTypeList, record.cancellationTypeId ?? '')}
                    rules={[
                        {
                            validator(_, value) {
                                if (!value && !isHidden(cancellationTypeList, record.cancellationTypeId ?? '')) {
                                    return Promise.reject(new Error(i18n.t('validation.default.errorValue')));
                                }
                                return Promise.resolve();
                            },
                        },
                        { pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') },
                    ]}
                    onChange={value => handleNumberOfDateChange(value as number, record.id!)}
                />
            ),
        },
        {
            title: i18n.t('tour.cancellation.date'),
            dataIndex: 'date',
            width: 150,
            render: (value: string, record: CancellationConditionDto) => (
                <BaseDatePicker
                    className="mb-0"
                    name={['date', record.id!]}
                    initialValue={value ? dayjs(value) : undefined}
                    format="date"
                    hidden={isHidden(cancellationTypeList, record.cancellationTypeId ?? '')}
                    disabled={!departureDate}
                    disabledDate={current => disabledDate(departureDate, current, props.form, listDateChecked)}
                    customDefaultValue={departureDate}
                    onChange={value => handleDateChange(value, record.id!)}
                />
            ),
        },
        {
            title: i18n.t('tour.cancellation.typeAmount'),
            dataIndex: 'depositType',
            width: 130,
            render: (value: string, record: CancellationConditionDto) => (
                <DepositTypeSelect
                    isForm
                    className="mb-0"
                    name={['depositType', record.id!]}
                    initialValue={value ?? record?.depositType}
                    disabled={true}
                />
            ),
        },
        {
            title: i18n.t('tour.cancellation.chargeFee'),
            dataIndex: 'fine',
            width: 120,
            render: (value: string, record: CancellationConditionDto) => (
                <BaseInput
                    className="mb-0"
                    name={['fine', record.id!]}
                    initialValue={value ?? record?.fine}
                    value={value ?? record?.fine}
                    type="number"
                    min={0}
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                        {
                            validator(_, value) {
                                if (value > 100) {
                                    return Promise.reject(new Error(i18n.t('validation.default.errorValue')));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    max={100}
                    isForm
                />
            ),
        },
        {
            title: '',
            dataIndex: 'paymentOption',
            width: 200,
            render: (value: string, record: CancellationConditionDto) => (
                <EnumOptionSelect
                    isForm
                    className="mb-0"
                    name={['paymentOption', record.id!]}
                    initialValue={value ?? record?.paymentOption}
                    optionValue={paymentOption}
                    rules={[{ required: true, message: '' }]}
                />
            ),
        },
        {
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 50,
            render: (_, record: CancellationConditionDto) => (
                <Can permissions={[MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]}>
                    <Flex className="gap-4" justify="center">
                        <Form.Item className="mb-0">
                            {!record?.id?.includes('cancelId') ? (
                                <DeleteButton
                                    titleName={i18n.t('tour.tourDetail.cancelTourCondition')}
                                    content={`${i18n.t('tour.tourDetail.cancelTourCondition')}: ${
                                        record?.cancellationTypeName
                                    }`}
                                    onOk={async () => {
                                        await deleteCancellationCondition(record.id ?? '');
                                        const newArray = dataCancel.filter(item => item.id !== record.id);
                                        const dateCheckedRemove = listDateChecked.filter(
                                            x => x !== handleDateValue(dayjs(record?.date)),
                                        );
                                        setListDateChecked(dateCheckedRemove);
                                        setDataCancel(newArray);
                                        toastSuccess(
                                            i18n.t('message.default.deleteContentSuccess'),
                                            `${record?.cancellationTypeName}`,
                                        );
                                    }}
                                    disabled={record.order! < 3}
                                />
                            ) : (
                                <Col hidden={record.order! < 3}>
                                    <DeleteOutlined
                                        onClick={() => {
                                            const newArray = dataCancel.filter(item => item.id !== record.id);
                                            const dateCheckedRemove = listDateChecked.filter(
                                                x =>
                                                    x !==
                                                    handleDateValue(
                                                        dayjs(props.tourCancelForm.getFieldValue(['date', record.id])),
                                                    ),
                                            );
                                            setListDateChecked(dateCheckedRemove);
                                            setDataCancel(newArray);
                                        }}
                                    />
                                </Col>
                            )}
                        </Form.Item>
                    </Flex>
                </Can>
            ),
        },
    ];

    const handleAdd = () => {
        const data: AnyObject = {
            id: `cancelId-${count}`,
            cancellationTypeId: cancellationTypeList.find(item => item.isBeforeDeparture)?.id,
            depositType: DepositType.Percentage,
            order: count + 1,
        };
        const newData = data ?? [];
        setCount(count + 1);
        setDataCancel([...dataCancel, newData]);
    };

    const handleNumberOfDateChange = useDebouncedCallback((value: number, recordId: string) => {
        numberOfDateChange(value, recordId, cancelFormUseWatch, props.tourCancelForm, departureDate);
    }, 200);

    const handleDateChange = useDebouncedCallback((value: dayjs.Dayjs | null, recordId: string) => {
        dateChange(value, recordId, cancelFormUseWatch, props.tourCancelForm, departureDate);
    }, 200);

    const onFinish = async (values: { [x: string]: { [y: string]: string } }) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;
        if (!values?.id || !tourScheduleId) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourCancelFormSuccess: true,
            });
            return;
        }

        const formData = convertValues(values);
        const dataCreate = formData.filter(item => item?.id?.includes('cancelId'));
        const dataUpdate = formData.filter(item => !item?.id?.includes('cancelId'));

        const listCreateFetch = createCancellationConditionCollection({
            createCancellationConditionRequests: dataCreate.map(item => ({
                ...item,
                tourScheduleId: tourScheduleId,
            })),
        } as CreateCancellationConditionCollectionRequest);
        const listUpdateFetch = dataUpdate.map(value => {
            value = value as UpdateCancellationConditionRequest;
            return updateCancellationCondition(value);
        });

        try {
            await Promise.all([listCreateFetch, listUpdateFetch]);
        } finally {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourCancelFormSuccess: true,
            });
        }
    };

    const cancellationTypeRes = useCallback(async () => {
        setCancellationType(fetchDataCancellationType?.data?.reverse() ?? []);
    }, [fetchDataCancellationType, setCancellationType]);

    const fetchData = useCallback(async () => {
        let dataForm;
        if (!props.tourSchedule?.id && !props.isCloned) {
            const listCancel =
                cancellationTypeList?.map((item, index: number) => ({
                    id: `cancelId--${index}`,
                    code: item.code,
                    cancellationTypeId: item.id,
                    depositType: DepositType.Percentage,
                    isImmediately: item.isImmediately ?? false,
                    isBeforeDeparture: item.isBeforeDeparture ?? false,
                    isAfterAll: item.isAfterAll ?? false,
                    order: index,
                })) ?? [];
            const tempFirstBeforeDepartureId = listCancel.find(
                x => x.cancellationTypeId == cancellationTypeList.find(item => item.isBeforeDeparture)?.id,
            )?.id;
            if (isNil(firstBeforeDeparture)) {
                setFirstBeforeDeparture(tempFirstBeforeDepartureId);
            }
            setDataCancel(Format.formatSortListByOrder(listCancel));
        } else {
            dataForm = props.tourSchedule?.cancellationConditions ?? [];
            const tempFirstBeforeDepartureId = dataForm.find(
                x => x.cancellationTypeId == cancellationTypeList.find(item => item.isBeforeDeparture)?.id,
            )?.id;
            setFirstBeforeDeparture(tempFirstBeforeDepartureId);
            setDataCancel(Format.formatSortListByOrder(dataForm));
        }
        setIsLoading(false);
    }, [cancellationTypeList, firstBeforeDeparture, props.isCloned, props.tourSchedule]);

    useEffect(() => {
        if (props.tourCancelForm) {
            props.tourCancelForm.setFieldsValue({ ...dataCancel });
        }
    }, [props.tourCancelForm, dataCancel]);

    useEffect(() => {
        cancellationTypeRes();
    }, [cancellationTypeRes]);

    useEffect(() => {
        fetchData();
        const numArray = (props.tourSchedule?.cancellationConditions ?? []).map(item => item.order ?? 0);
        setCount(isInteger(Math.max(...numArray)) ? Math.max(...numArray) : 2);
    }, [fetchData, props.tourSchedule?.cancellationConditions]);

    return (
        <div className="pb-4">
            <p className="text-blue-600 mb-4">{i18n.t('tour.tourDetail.cancelTourCondition')}</p>
            <Form form={props.tourCancelForm} onFinish={onFinish} disabled={!hasModifyTourFITPermission}>
                <div className="bg-[#FAFAFA] p-4 rounded-md my-2">
                    <CreateActionButton title={i18n.t('tour.tourDetail.cancelTourCondition')} handleAdd={handleAdd} />
                    <Table
                        dataSource={dataCancel}
                        columns={columns}
                        rowKey="id"
                        bordered
                        pagination={false}
                        loading={isLoading}
                        size="small"
                        scroll={{ x: 500 }}
                    />
                </div>
            </Form>
        </div>
    );
};
