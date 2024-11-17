import {
    CreateTourScheduleFareRequest,
    PassengerTypeDto,
    TourScheduleDto,
    TourScheduleFareDto,
    UpdateTourScheduleFareRequest,
} from '@sdk/tour-operations';
import { Flex, Form, FormInstance } from 'antd';
import { Pattern, convertValues } from '@utils/formHelper';
import Table, { ColumnsType } from 'antd/es/table';
import {
    useCreateTourScheduleFare,
    useDeleteTourScheduleFare,
    useUpdateTourScheduleFare,
} from '@hooks/queries/useTourScheduleFare';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import Can from '@components/common/Can';
import { CreateActionButton } from '@components/customizes/Button/CreateActionButton';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { DeleteOutlined } from '@ant-design/icons';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PassengerTypeSelect } from '@components/customizes/Select/PassengerType';
import i18n from '@src/i18n';
import isInteger from 'lodash/isInteger';
import { toastSuccess } from '@components/ui/Toast/Toast';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { usePassengerTypeStore } from '@store/passengerTypeStore';
import { useTourFaresStore } from '@store/tourFareStore';
import { useTourFormStore } from '@store/tourFormStore';

interface FareFitProps {
    vatPercent: number;
    typeAmount: string;
    tourSchedule?: TourScheduleDto;
    form: FormInstance;
    tourFareForm: FormInstance;
}

export const FareFit: React.FC<FareFitProps> = props => {
    const [count, setCount] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tourFareForm, setTourFareForm] = useState<PassengerTypeDto[]>([]);
    const [passengerTypeSelected, setPassengerTypeSelected] = useState<AnyObject | []>([]);
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]);

    // Store
    const {
        actions: { setTourFares },
    } = useTourFaresStore(state => state);
    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus, setAmountReducedVisaFees, setAmountDeposit },
    } = useTourFormStore(state => state);
    const { passengersType } = usePassengerTypeStore(state => state);
    const { mutateAsync: deleteTourScheduleFare } = useDeleteTourScheduleFare();
    const { mutateAsync: createTourScheduleFare } = useCreateTourScheduleFare();
    const { mutateAsync: updateTourScheduleFare } = useUpdateTourScheduleFare();

    const columns: ColumnsType<TourScheduleFareDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            align: 'center',
            render: (value: string, record: TourScheduleFareDto, index: number) => (
                <>
                    <BaseInput isForm isHidden type="text" name={['id', record.id!]} initialValue={value} />
                    <BaseInput
                        isForm
                        isHidden
                        name={['tourScheduleId', record.id!]}
                        initialValue={record.tourScheduleId}
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
                    {i18n.t('tour.fare.passengerType')}
                </p>
            ),
            dataIndex: 'passengerTypeId',
            width: 200,
            render: (_: unknown, record: TourScheduleFareDto) => (
                <PassengerTypeSelect
                    isForm
                    className="mb-0"
                    name={['passengerTypeId', record.id!]}
                    initialValue={record?.passengerTypeId}
                    dataSelected={passengerTypeSelected}
                    isDisableOption
                    placeholder={i18n.t('tour.fare.passengerType')}
                    rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                    isFit
                />
            ),
        },
        {
            title: i18n.t('tour.fare.taxInclusivePrice'),
            dataIndex: 'taxInclusivePrice',
            width: 200,
            render: (_: unknown, record: TourScheduleFareDto) => (
                <BaseInput
                    className="mb-0"
                    name={['taxInclusivePrice', record.id!]}
                    initialValue={record?.taxInclusivePrice}
                    addonAfterValue={<p className="text-xs font-medium text-gray-500">{props.typeAmount}</p>}
                    type="number"
                    rules={[{ pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') }]}
                    isForm
                />
            ),
        },
        {
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 50,
            render: (_, record: TourScheduleFareDto) => (
                <Can permissions={[MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]}>
                    <Flex className="gap-4" justify="center">
                        <Form.Item className="mb-0">
                            {!record?.id?.includes('tourFareId') ? (
                                <DeleteButton
                                    titleName={i18n.t('tour.fare.title')}
                                    content={`${i18n.t('tour.fare.title')}: ${record?.passengerTypeName} - ${
                                        record?.taxInclusivePrice
                                    } ${props.typeAmount}`}
                                    onOk={async () => {
                                        await deleteTourScheduleFare(record.id ?? '');
                                        const newArray = tourFareForm.filter(item => item.id !== record.id);
                                        setTourFareForm(newArray);
                                        setPassengerTypeSelected(
                                            passengerTypeSelected.filter(
                                                (item: string) => item !== record.passengerTypeId,
                                            ),
                                        );
                                        toastSuccess(
                                            i18n.t('message.default.deleteContentSuccess'),
                                            `${record.passengerTypeName}`,
                                        );
                                    }}
                                />
                            ) : (
                                <DeleteOutlined
                                    onClick={() => {
                                        const newArray = tourFareForm.filter(item => item.id !== record.id);
                                        setTourFareForm(newArray);
                                        setPassengerTypeSelected(prevPassengerType => {
                                            const result = prevPassengerType.filter(
                                                (item: string) => item !== record.passengerTypeId,
                                            );
                                            return result;
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                    </Flex>
                </Can>
            ),
        },
    ];

    const onChangeValues = (_: AnyObject, values: AnyObject) => {
        if (values?.taxInclusivePrice) {
            const arrAmount: number[] = Object.values(values?.taxInclusivePrice);
            const minAmount = Math.min.apply(null, arrAmount);
            const maxAmount = Math.max.apply(null, arrAmount);
            setAmountReducedVisaFees(minAmount ?? 0);
            setAmountDeposit(maxAmount ?? 0);
        }
        if (values.passengerTypeId) {
            const selectedList = Object.values(values.passengerTypeId).filter(value => value !== '');
            setPassengerTypeSelected(selectedList);
            if (values.taxInclusivePrice || values.reducedVisaFees) {
                const tourScheduleFareMap = tourFareForm.map(record => ({
                    ...record,
                    passengerTypeName: passengersType.find(item => item.id == values.passengerTypeId[record?.id ?? ''])
                        ?.name,
                    passengerTypeId: values.passengerTypeId[record?.id ?? ''],
                    taxInclusivePrice: values.taxInclusivePrice[record?.id ?? ''],
                }));
                setTourFares(tourScheduleFareMap);
                setTourFareForm(tourScheduleFareMap);
            }
        }
    };

    const handleAdd = () => {
        const data: TourScheduleFareDto = {
            id: `tourFareId-${count}`,
            passengerTypeId: '',
            taxInclusivePrice: 0,
            order: count + 1,
        };
        const newData = data ?? [];
        setCount(count + 1);
        setTourFareForm([...tourFareForm, newData]);
    };

    const onFinish = async (values: { [x: string]: { [y: string]: string } }) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;
        if (!values?.id || !tourScheduleId) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourFareFormSuccess: true,
            });
            return;
        }
        const formData = convertValues(values);
        const dataList = formData.map(item => {
            item.tourScheduleId = tourScheduleId;
            if (item.id.startsWith('tourFareId')) {
                delete item.id;
                item.vatId = props.form.getFieldValue('vatId');
                return createTourScheduleFare(item as CreateTourScheduleFareRequest);
            } else {
                return updateTourScheduleFare(item as UpdateTourScheduleFareRequest);
            }
        });

        try {
            await Promise.all(dataList);
        } finally {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourFareFormSuccess: true,
            });
        }
    };

    useEffect(() => {
        if (props.tourSchedule) {
            setTourFares(props.tourSchedule?.tourScheduleFares ?? []);
            const numArray = (props.tourSchedule?.tourScheduleFares ?? []).map(item => item.order ?? 0);
            setCount(isInteger(Math.max(...numArray)) ? Math.max(...numArray) : 1);
            setTourFareForm(Format.formatSortListByOrder(props.tourSchedule?.tourScheduleFares));
            setPassengerTypeSelected(props.tourSchedule?.tourScheduleFares?.map(item => item.passengerTypeId) ?? []);
            setIsLoading(false);
        }
    }, [props.tourSchedule, setTourFareForm, setTourFares]);

    return (
        <Form
            form={props.tourFareForm}
            onValuesChange={onChangeValues}
            onFinish={onFinish}
            disabled={!hasModifyTourFITPermission}
        >
            <div className="px-5 my-3">
                <CreateActionButton title={i18n.t('tour.fare.title')} handleAdd={handleAdd} />
                <Table
                    dataSource={tourFareForm}
                    columns={columns}
                    rowKey="id"
                    bordered
                    pagination={false}
                    size="small"
                    scroll={{ x: 500 }}
                    loading={isLoading}
                />
            </div>
        </Form>
    );
};
