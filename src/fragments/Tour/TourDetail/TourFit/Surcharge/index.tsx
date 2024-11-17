import {
    CreateTourScheduleSurchargeRequest,
    TourGitDto,
    TourScheduleDto,
    TourScheduleSurchargeDto,
    UpdateTourScheduleSurchargeRequest,
} from '@sdk/tour-operations';
import { Flex, Form, FormInstance } from 'antd';
import { Pattern, convertValues } from '@utils/formHelper';
import Table, { ColumnsType } from 'antd/es/table';
import { useCallback, useEffect, useState } from 'react';
import {
    useCreateTourScheduleSurcharge,
    useDeleteTourScheduleSurcharge,
    useUpdateTourScheduleSurcharge,
} from '@hooks/queries/useTourScheduleSurcharge';

import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import Can from '@components/common/Can';
import { CreateActionButton } from '@components/customizes/Button/CreateActionButton';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { DeleteOutlined } from '@ant-design/icons';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { ProductSelect } from '@components/customizes/Select/ProductSelect';
import { VatSelect } from '@components/customizes/Select/Vat';
import i18n from '@src/i18n';
import isInteger from 'lodash/isInteger';
import { toastSuccess } from '@components/ui/Toast/Toast';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTourFormStore } from '@store/tourFormStore';
import { useTourSurchargeStore } from '@store/tourSurchargeStore';

interface FareProps {
    typeAmount: string;
    tourSchedule?: TourScheduleDto | TourGitDto;
    form: FormInstance;
    surchargeForm: FormInstance;
}

export const Surcharge: React.FC<FareProps> = props => {
    const [count, setCount] = useState(1);
    const [tourSurchargeForm, setTourSurchargeForm] = useState<TourScheduleSurchargeDto[]>([]);
    const [surchargeSelected, setSurchargeSelected] = useState<AnyObject | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]);

    // Store
    const {
        actions: { setTourSurcharge },
    } = useTourSurchargeStore(state => state);
    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus },
    } = useTourFormStore(state => state);

    // Mutate
    const { mutateAsync: deleteTourScheduleSurcharge } = useDeleteTourScheduleSurcharge();
    const { mutateAsync: createTourScheduleSurcharge } = useCreateTourScheduleSurcharge();
    const { mutateAsync: updateTourScheduleSurcharge } = useUpdateTourScheduleSurcharge();

    const handleDeleteSurcharge = useCallback(
        (record: TourScheduleSurchargeDto) => async () => {
            const newArray = tourSurchargeForm.filter(item => item.id !== record.id);
            const newSurchargeList = surchargeSelected.filter((item: string) => item !== record.productId);

            if (!record?.id?.includes('tourSurchargeId')) {
                await deleteTourScheduleSurcharge(record.id ?? '');
                toastSuccess(i18n.t('message.default.deleteContentSuccess'), `${record.productName}`);
            }
            setSurchargeSelected(newSurchargeList);
            setTourSurchargeForm(newArray);
            setTourSurcharge(newArray);
        },
        [tourSurchargeForm, surchargeSelected, setTourSurcharge, deleteTourScheduleSurcharge],
    );

    const columns: ColumnsType<TourScheduleSurchargeDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            align: 'center',
            render: (value: string, record: TourScheduleSurchargeDto, index: number) => (
                <>
                    <BaseInput isForm isHidden name={['id', record.id!]} initialValue={value} />
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
                    {i18n.t('tour.surcharge.subTitle')}
                </p>
            ),
            dataIndex: 'productId',
            width: 200,
            render: (_: unknown, record: TourScheduleSurchargeDto) => (
                <ProductSelect
                    isForm
                    className="mb-0"
                    name={['productId', record.id ?? '']}
                    initialValue={record?.productId}
                    dataSelected={surchargeSelected}
                    isDisableOption
                    rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                />
            ),
        },
        {
            title: i18n.t('tour.surcharge.taxInclusivePrice'),
            dataIndex: 'taxInclusivePrice',
            width: 200,
            render: (_: unknown, record: TourScheduleSurchargeDto) => (
                <BaseInput
                    className="mb-0"
                    name={['taxInclusivePrice', record.id ?? '']}
                    initialValue={record?.taxInclusivePrice}
                    addonAfterValue={<p className="text-xs font-medium text-gray-500">{props.typeAmount}</p>}
                    type="number"
                    rules={[{ pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') }]}
                    isForm
                />
            ),
        },
        {
            title: i18n.t('vat.title'),
            dataIndex: 'vatId',
            width: 150,
            render: (_: unknown, record: TourScheduleSurchargeDto) => (
                <VatSelect isForm className="mb-0" name={['vatId', record.id ?? '']} initialValue={record?.vatId} />
            ),
        },
        {
            title: i18n.t('default.note'),
            dataIndex: 'description',
            width: 200,
            render: (_: unknown, record: TourScheduleSurchargeDto) => (
                <BaseInput
                    className="mb-0"
                    name={['description', record.id ?? '']}
                    initialValue={record?.description}
                    type="text"
                    isForm
                />
            ),
        },
        {
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 50,
            render: (_, record: TourScheduleSurchargeDto) => (
                <Can permissions={[MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]}>
                    <Flex className="gap-4" justify="center">
                        <Form.Item className="mb-0">
                            {!record?.id?.includes('tourSurchargeId') ? (
                                <DeleteButton
                                    titleName={i18n.t('tour.surcharge.title')}
                                    content={`${record?.productName} - ${record?.taxInclusivePrice} ${props.typeAmount}`}
                                    onOk={handleDeleteSurcharge(record)}
                                />
                            ) : (
                                <DeleteOutlined onClick={handleDeleteSurcharge(record)} />
                            )}
                        </Form.Item>
                    </Flex>
                </Can>
            ),
        },
    ];

    const onChangeValues = (_: AnyObject, values: AnyObject) => {
        if (values.productId) {
            const selectedList = Object.values(values.productId).filter(value => value !== '');
            setSurchargeSelected(selectedList);
            if (values.taxInclusivePrice && values.vatId) {
                const fetchTourScheduleSurchage = tourSurchargeForm.map(record => ({
                    ...record,
                    productId: values.productId[record?.id ?? ''],
                    taxInclusivePrice: values.taxInclusivePrice[record?.id ?? ''],
                    vatId: values.vatId[record?.id ?? ''],
                    description: values.description[record?.id ?? ''],
                }));
                setTourSurcharge(fetchTourScheduleSurchage);
                setTourSurchargeForm(fetchTourScheduleSurchage);
            }
        }
    };

    const handleAdd = () => {
        const data: TourScheduleSurchargeDto = {
            id: `tourSurchargeId-${count}`,
            taxInclusivePrice: 0,
            order: count + 1,
        };
        const newData = data ?? [];
        setCount(count + 1);
        setTourSurchargeForm([...tourSurchargeForm, newData]);
    };

    const onFinish = async (values: { [x: string]: { [y: string]: string } }) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;
        if (!values?.id || !tourScheduleId) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isSurchargeFormSuccess: true,
            });
            return;
        }

        const formData = convertValues(values);
        const dataList = formData.map(item => {
            if (item.id.startsWith('tourSurchargeId')) {
                delete item.id;
                item.tourScheduleId = tourScheduleId;
                return createTourScheduleSurcharge(item as CreateTourScheduleSurchargeRequest);
            } else {
                return updateTourScheduleSurcharge(item as UpdateTourScheduleSurchargeRequest);
            }
        });

        try {
            await Promise.all(dataList);
        } finally {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isSurchargeFormSuccess: true,
            });
        }
    };

    useEffect(() => {
        if (props.tourSchedule) {
            setTourSurchargeForm(Format.formatSortListByOrder(props.tourSchedule.tourScheduleSurcharges));
            setTourSurcharge(props.tourSchedule.tourScheduleSurcharges ?? []);
            const numArray = (props.tourSchedule?.tourScheduleSurcharges ?? []).map(item => item.order ?? 0);
            setCount(isInteger(Math.max(...numArray)) ? Math.max(...numArray) : 1);
            setSurchargeSelected(props.tourSchedule.tourScheduleSurcharges?.map(item => item.productId) ?? []);
            setIsLoading(false);
        }
    }, [props.tourSchedule, setTourSurcharge]);

    return (
        <div className="px-5 my-3">
            <CreateActionButton title={i18n.t('tour.surcharge.title')} handleAdd={handleAdd} />
            <Form
                form={props.surchargeForm}
                onValuesChange={onChangeValues}
                onFinish={onFinish}
                disabled={!hasModifyTourFITPermission}
            >
                <Table
                    dataSource={tourSurchargeForm}
                    columns={columns}
                    rowKey="id"
                    bordered
                    pagination={false}
                    size="small"
                    scroll={{ x: 500 }}
                    loading={isLoading}
                />
            </Form>
        </div>
    );
};
