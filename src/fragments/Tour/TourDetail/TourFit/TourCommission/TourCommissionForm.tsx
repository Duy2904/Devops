import { Commission, CommissionTypeSelect } from '@components/customizes/Select/CommissionTypeSelect';
import {
    CommissionConditionDto,
    DepositType,
    TourScheduleDto,
    TourScheduleFareDto,
    TourScheduleStatus,
    UpdateCommissionConditionRequest,
} from '@sdk/tour-operations';
import { Flex, Form, FormInstance } from 'antd';
import { Pattern, convertValues } from '@utils/formHelper';
import Table, { ColumnsType } from 'antd/es/table';
import { TourCommissionType, TransformedCommissionConditionDto, mapToTransformedCommissionCondition } from './Feature';
import {
    useCreateCommissionConditionAgent,
    useCreateCommissionConditionCollectionAgent,
    useCreateCommissionConditionCollectionReferrer,
    useCreateCommissionConditionReferrer,
    useDeleteCommissionConditionAgentByType,
    useDeleteCommissionConditionReferrerByType,
    useUpdateCommissionConditionAgent,
    useUpdateCommissionConditionReferrer,
} from '@hooks/queries/useCommissionCondition';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import Can from '@components/common/Can';
import { CreateActionButton } from '@components/customizes/Button/CreateActionButton';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { DeleteOutlined } from '@ant-design/icons';
import { DepositTypeSelect } from '@components/customizes/Select/DepositTypeSelect';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { canEditData } from '../../Feature';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTourFaresStore } from '@store/tourFareStore';
import { useTourFormStore } from '@store/tourFormStore';

interface TourCommissionFormProps {
    isType?: Commission;
    formItem: FormInstance;
    tourSchedule?: TourScheduleDto;
}

export const TourCommissionForm: React.FC<TourCommissionFormProps> = props => {
    const isAgent = props.isType == 'agent';
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitUpdate]);
    const canEdit = (record: TransformedCommissionConditionDto | CommissionConditionDto) => {
        if (!props.tourSchedule?.id) return false;
        return (
            props.tourSchedule?.status !== TourScheduleStatus.New &&
            record.commissionTypeId?.startsWith(
                isAgent ? TourCommissionType.AgentType : TourCommissionType.ReferrerType,
            )
        );
    };

    const [count, setCount] = useState<number>(0);
    const [rowChecked, setRowChecked] = useState<{ id: string; depositType: string }[]>([]);
    const [dataCommission, setDataCommission] = useState<AnyObject[]>([]);
    const [dataRefCommission, setDataRefCommission] = useState<AnyObject[]>([]);
    const [listSelected, setListSelected] = useState<AnyObject | []>([]);
    const [listRefSelected, setListRefSelected] = useState<AnyObject | []>([]);

    const { tourFares } = useTourFaresStore(state => state);
    const {
        tourScheduleFormStatus,
        actions: { setTourScheduleFormStatus },
    } = useTourFormStore(state => state);

    const { mutateAsync: createCommissionConditionAgent } = useCreateCommissionConditionAgent();
    const { mutateAsync: createCommissionConditionCollectionAgent } = useCreateCommissionConditionCollectionAgent();
    const { mutateAsync: updateCommissionConditionAgent } = useUpdateCommissionConditionAgent();
    const { mutateAsync: deleteCommissionConditionAgentByType } = useDeleteCommissionConditionAgentByType();
    const { mutateAsync: createCommissionConditionReferrer } = useCreateCommissionConditionReferrer();
    const { mutateAsync: createCommissionConditionCollectionAgentReferrer } =
        useCreateCommissionConditionCollectionReferrer();
    const { mutateAsync: updateCommissionConditionReferrer } = useUpdateCommissionConditionReferrer();
    const { mutateAsync: deleteCommissionConditionReferrerByType } = useDeleteCommissionConditionReferrerByType();

    const columns: ColumnsType<CommissionConditionDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            align: 'center',
            render: (value: string, record: CommissionConditionDto, index: number) => (
                <>
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['id', record.id!]}
                        initialValue={value ?? record.id}
                    />
                    <BaseInput
                        isForm
                        isHidden
                        name={['tourScheduleId', record.id!]}
                        initialValue={record.tourScheduleId ?? props.tourSchedule?.id}
                    />
                    <>{index + 1}</>
                </>
            ),
        },
        {
            title: (
                <p>
                    <span className="text-red-500 mr-1">*</span>
                    {isAgent ? i18n.t('tour.commission.agent') : i18n.t('tour.commission.referrer')}
                </p>
            ),
            dataIndex: 'commissionTypeId',
            key: 'commissionTypeId',
            width: 200,
            render: (value: string, record: CommissionConditionDto) => (
                <CommissionTypeSelect
                    isForm
                    name={['commissionTypeId', record.id!]}
                    className="mb-0"
                    type={props.isType}
                    rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                    isDisableOption
                    dataSelected={isAgent ? listSelected : listRefSelected}
                    initialValue={record.commissionTypeId ?? value}
                    disabled={record.commissionTypeId !== undefined}
                />
            ),
        },
        {
            title: i18n.t('tour.commission.typeValue'),
            dataIndex: 'depositType',
            width: 130,
            render: (value: string, record: CommissionConditionDto) => (
                <DepositTypeSelect
                    isForm
                    className="mb-0"
                    name={['depositType', record.id!]}
                    initialValue={value ?? record?.depositType}
                    rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                    onChange={(value: string) => handleDepositTypeChange(value, record.id!)}
                    disableCash={tourFares.length == 0}
                    disabled={!canEditData(props.tourSchedule?.status) && record.commissionTypeId !== undefined}
                />
            ),
        },
        {
            title: (
                <p>
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('tour.commission.value')}
                </p>
            ),
            width: 300,
            render: (value: string, record: CommissionConditionDto | TransformedCommissionConditionDto) =>
                rowChecked.find(item => item.id == record.id!) &&
                (rowChecked.find(item => item.id == record.id!)?.depositType == DepositType.Percentage
                    ? renderPercentageInput(record, value)
                    : render(record)),
        },
        {
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 50,
            render: (_, record: CommissionConditionDto) => (
                <Can permissions={[MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]}>
                    <Flex className="gap-4" justify="center">
                        <Form.Item className="mb-0">
                            {(isAgent && !record?.id?.includes(TourCommissionType.AgentType)) ||
                            (!isAgent && !record?.id?.includes(TourCommissionType.ReferrerType))
                                ? deleteButtonItem(record)
                                : deleteButtonOutline(record)}
                        </Form.Item>
                    </Flex>
                </Can>
            ),
        },
    ];

    // Render Value %
    const renderPercentageInput = (
        record: TransformedCommissionConditionDto | CommissionConditionDto,
        value: string,
    ) => (
        <BaseInput
            className="mb-0"
            name={['value', record.id!]}
            initialValue={record?.value && +record.value <= 1 ? +record.value * 100 : value}
            type="number"
            min={0}
            rules={[
                {
                    required: true,
                    message: i18n.t('validation.default.errorValue'),
                },
                { pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') },
                {
                    validator(_, inputValue) {
                        if (
                            rowChecked.find(item => item.id == record.id!)?.depositType == DepositType.Percentage &&
                            inputValue > 100
                        ) {
                            return Promise.reject(new Error(i18n.t('validation.default.errorValue')));
                        }
                        return Promise.resolve();
                    },
                },
            ]}
            disable={!hasModifyTourFITPermission || canEdit(record)}
            isForm
        />
    );

    // Render Value Passenger
    const renderPassengerInput = (record: TransformedCommissionConditionDto, item: TourScheduleFareDto) => (
        <BaseInput
            className="mb-0"
            name={['value', record.id, item.passengerTypeId!]}
            initialValue={
                record.passengerList?.find(data => data.passengerTypeId === item.passengerTypeId)?.value ?? ''
            }
            type="number"
            label={<small className="font-semibold">{item.passengerTypeName}</small>}
            min={0}
            rules={[
                {
                    required: true,
                    message: i18n.t('validation.default.errorValue'),
                },
                {
                    validator(_, inputValue: string) {
                        const checkValue = ruleCheckValueInput(inputValue, record, item);
                        return checkValue
                            ? Promise.reject(new Error(i18n.t('validation.default.errorValue')))
                            : Promise.resolve();
                    },
                },
            ]}
            disable={!hasModifyTourFITPermission || canEdit(record)}
            isForm
        />
    );
    const renderFares = (record: TransformedCommissionConditionDto) => (
        <div className="grid grid-cols-1 gap-2">
            {tourFares
                .filter(item => (item?.taxInclusivePrice ?? 0) > 0)
                .map(item => (
                    <div key={record.id + item.id}>
                        {record?.passengerList && record?.passengerList.length > 0
                            ? record?.passengerList
                                  .filter(passengerItem => passengerItem.passengerTypeId == item.passengerTypeId)
                                  .map(data => (
                                      <div key={record.id + data.id}>{renderPassengerInput(record, data)}</div>
                                  ))
                            : renderPassengerInput(record, item)}
                    </div>
                ))}
        </div>
    );
    const render = (record: CommissionConditionDto | TransformedCommissionConditionDto) =>
        rowChecked.find(item => item.id == record.id!) && renderFares(record as TransformedCommissionConditionDto);

    // Rule check value
    const ruleCheckValueInput = (value: string, record: AnyObject, item: AnyObject) => {
        const isTrue =
            rowChecked.find(item => item.id == record.id!)?.depositType == DepositType.Cash &&
            item.taxInclusivePrice &&
            value > item.taxInclusivePrice;
        return isTrue;
    };

    // Render Button Delete
    const deleteButtonItem = (record: CommissionConditionDto) => (
        <DeleteButton
            titleName={i18n.t('tour.commission.commission')}
            content={`${record?.commissionTypeName}`}
            onOk={async () => {
                const deleteCommissionConditionByType = isAgent
                    ? deleteCommissionConditionAgentByType
                    : deleteCommissionConditionReferrerByType;

                const commissionTypeFilter = isAgent ? setDataCommission : setDataRefCommission;
                const listSelectedFilter = isAgent ? setListSelected : setListRefSelected;

                await deleteCommissionConditionByType({
                    tourScheduleId: record.tourScheduleId,
                    commissionTypeId: record.commissionTypeId,
                });

                const newArray = isAgent
                    ? dataCommission.filter(item => item.id !== record.id)
                    : dataRefCommission.filter(item => item.id !== record.id);

                commissionTypeFilter(newArray);
                listSelectedFilter(list => list.filter((item: string) => item !== record.commissionTypeId));
                toastSuccess(i18n.t('message.default.deleteContentSuccess'), `${record.commissionTypeName}`);
            }}
        />
    );
    const deleteButtonOutline = (record: CommissionConditionDto) => (
        <DeleteOutlined
            onClick={async () => {
                const newArray = (isAgent ? dataCommission : dataRefCommission).filter(item => item.id !== record.id);
                isAgent ? setDataCommission(newArray) : setDataRefCommission(newArray);
                setListSelected(
                    (isAgent ? listSelected : listRefSelected).filter(
                        (item: string) => item !== props.formItem.getFieldValue(['commissionTypeId', record.id!]),
                    ),
                );
            }}
        />
    );

    // Handle Add new row
    const handleAdd = () => {
        const data: CommissionConditionDto = {
            id: isAgent ? `AgentType-${count}` : `ReferrerType-${count}`,
        };
        const newData = data ?? [];
        setCount(count + 1);
        isAgent
            ? setDataCommission([...dataCommission, newData])
            : setDataRefCommission([...dataRefCommission, newData]);
    };

    // Handle Deposit Type con per row change
    const handleDepositTypeChange = (value: string, id: string) => {
        const depositTypeOnDataResponse = (isAgent ? dataCommission : dataRefCommission).find(item => item.id === id);
        if (depositTypeOnDataResponse?.depositType !== value) {
            props.formItem.setFieldValue(['id', id], isAgent ? `AgentType-${count}` : `ReferrerType-${count}`);
        } else {
            props.formItem.setFieldValue(['id', id], depositTypeOnDataResponse?.id);
        }

        setRowChecked(prevRowChecked => {
            const indexToUpdate = prevRowChecked.findIndex(obj => obj.id === id);
            if (indexToUpdate === -1) {
                return [...prevRowChecked, { id: id, depositType: value }];
            } else {
                return prevRowChecked.map((obj, index) =>
                    index === indexToUpdate ? { ...obj, depositType: value } : obj,
                );
            }
        });
    };

    // Handle Change Form Value
    const onValuesChange = (_: AnyObject, values: AnyObject) => {
        if (values.commissionTypeId) {
            const selectedList = Object.values(values.commissionTypeId).filter(value => value !== '');
            isAgent ? setListSelected(selectedList) : setListRefSelected(selectedList);
        }
    };

    // Change Status on Form Store to move next step
    const changeStatusForm = () => {
        if (isAgent) {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourAgentComFormSuccess: true,
            });
        } else {
            setTourScheduleFormStatus({
                ...tourScheduleFormStatus,
                isTourReferrerComFormSuccess: true,
            });
        }
    };

    // Delete Commission
    const deleteFetch = (data: AnyObject[], tourScheduleId: string) => {
        if (data.length === 0) return;
        const dataFetch = data.map(item => {
            return isAgent
                ? deleteCommissionConditionAgentByType({
                      tourScheduleId: tourScheduleId,
                      commissionTypeId: item.commissionTypeId,
                  })
                : deleteCommissionConditionReferrerByType({
                      tourScheduleId: tourScheduleId,
                      commissionTypeId: item.commissionTypeId,
                  });
        });
        return dataFetch;
    };

    // Create New Commission
    const createFetch = (data: AnyObject[], tourScheduleId: string) => {
        if (data.length === 0) return;
        const dataFetch = data.map(item => {
            delete item.id;

            if (item.depositType == DepositType.Percentage) {
                const dataObj = {
                    ...item,
                    tourScheduleId: tourScheduleId,
                };
                return isAgent ? createCommissionConditionAgent(dataObj) : createCommissionConditionReferrer(dataObj);
            } else {
                const dataObj: { [key: string]: number } = item?.value;
                const results = Object.entries(dataObj).map(([key, value]) => ({
                    ...item,
                    tourScheduleId: tourScheduleId,
                    passengerTypeId: key,
                    value: value,
                }));

                return isAgent
                    ? createCommissionConditionCollectionAgent({ createCommissionConditionRequests: results })
                    : createCommissionConditionCollectionAgentReferrer({ createCommissionConditionRequests: results });
            }
        });
        return dataFetch;
    };

    // Update Commission
    const processPercentageItem = (item: AnyObject, isAgent: boolean) => {
        return isAgent
            ? updateCommissionConditionAgent(item as UpdateCommissionConditionRequest)
            : updateCommissionConditionReferrer(item as UpdateCommissionConditionRequest);
    };

    const processNonPercentageItem = (item: AnyObject, isAgent: boolean, dataChangeType: AnyObject[]) => {
        const dataObj: { [key: string]: number } = item?.value;
        const itemInDataCommission = isAgent
            ? dataCommission.find(value => value.id == item.id)
            : dataRefCommission.find(value => value.id == item.id);

        Object.entries(dataObj).forEach(([key, value]) => {
            const idVal = (itemInDataCommission as TransformedCommissionConditionDto).passengerList.find(
                val => val.passengerTypeId == key,
            )?.id;
            const dataFetch = {
                ...item,
                passengerTypeId: key,
                value: value,
                id: (itemInDataCommission as TransformedCommissionConditionDto).passengerList.find(
                    val => val.passengerTypeId == key,
                )?.id,
            };
            if (idVal) {
                return isAgent
                    ? updateCommissionConditionAgent(dataFetch as UpdateCommissionConditionRequest)
                    : updateCommissionConditionReferrer(dataFetch as UpdateCommissionConditionRequest);
            } else {
                return dataChangeType.push(dataFetch);
            }
        });
    };

    const updateFetch = (data: AnyObject[]) => {
        if (data.length === 0) return;
        const dataChangeType: AnyObject[] = [];

        const dataFetch = data.map(item => {
            if (item.depositType === DepositType.Percentage) {
                return processPercentageItem(item, isAgent);
            } else {
                return processNonPercentageItem(item, isAgent, dataChangeType);
            }
        });

        return dataFetch;
    };

    // work finish Form
    const onFinish = async (values: { [x: string]: { [y: string]: string } }) => {
        const tourScheduleId = tourScheduleFormStatus.tourScheduleId ?? props.tourSchedule?.id;
        if (!values?.id || !tourScheduleId) {
            changeStatusForm();
            return;
        }
        const formData = convertValues(values);

        const dataDelete = (isAgent ? dataCommission : dataRefCommission).filter(item => {
            const matchingCommission = formData.find(value => value.commissionTypeId == item.commissionTypeId);
            return item.depositType !== matchingCommission?.depositType;
        });

        const dataIdRemoved = dataDelete
            .filter(
                item => item.depositType === (isAgent ? TourCommissionType.AgentType : TourCommissionType.ReferrerType),
            )
            .map(item => item.id);

        const dataCreate = formData
            .filter(item => {
                const isAgentType = isAgent ? TourCommissionType.AgentType : TourCommissionType.ReferrerType;
                return item?.id?.startsWith(isAgentType);
            })
            .filter(item => !dataIdRemoved.includes(item.id));

        const dataUpdate = formData
            .filter(item => {
                const isAgentType = isAgent ? TourCommissionType.AgentType : TourCommissionType.ReferrerType;
                return !item?.id?.startsWith(isAgentType);
            })
            .filter(item => !dataIdRemoved.includes(item.id));

        try {
            await Promise.all([deleteFetch(dataDelete, tourScheduleId)]);
            setTimeout(async () => {
                await Promise.all([createFetch(dataCreate, tourScheduleId), updateFetch(dataUpdate)]);
                setTimeout(() => {
                    changeStatusForm();
                }, 1000);
            }, 1000);
        } catch {
            changeStatusForm();
        }
    };

    useEffect(() => {
        if (props.tourSchedule && !isAgent) {
            const uniqueIdsRefSet = new Set<string>();
            const idArray: { id: string; depositType: string }[] = [];
            const idCommissionRefSelected: string[] = [];
            const dataRef = props.tourSchedule?.commissionConditions?.filter(
                item => item.commissionTypeObjectType == 'Referrer',
            );
            const dataFetchRef = mapToTransformedCommissionCondition(dataRef ?? []);
            dataRef?.forEach(obj => {
                if (!uniqueIdsRefSet.has(obj.id!)) {
                    uniqueIdsRefSet.add(obj.id!);
                    idCommissionRefSelected.push(obj.commissionTypeId!);
                    idArray.push({ id: obj.id!, depositType: obj.depositType! });
                }
            });
            setRowChecked(idArray ?? []);
            setListRefSelected(idCommissionRefSelected);
            setDataRefCommission(dataFetchRef ?? []);
        }
    }, [props.tourSchedule, isAgent]);

    useEffect(() => {
        if (props.tourSchedule && isAgent) {
            const uniqueIdsSet = new Set<string>();
            const idArray: { id: string; depositType: string }[] = [];
            const idCommissionSelected: string[] = [];
            const data = props.tourSchedule?.commissionConditions?.filter(
                item => item.commissionTypeObjectType == 'Agent',
            );
            const dataFetch = mapToTransformedCommissionCondition(data ?? []);
            data?.forEach(obj => {
                if (!uniqueIdsSet.has(obj.id!)) {
                    uniqueIdsSet.add(obj.id!);
                    idCommissionSelected.push(obj.commissionTypeId!);
                    idArray.push({ id: obj.id!, depositType: obj.depositType! });
                }
            });
            setRowChecked(idArray ?? []);
            setListSelected(idCommissionSelected);
            setDataCommission(dataFetch ?? []);
        }
    }, [props.tourSchedule, isAgent]);

    return (
        <div className="bg-[#FAFAFA] p-4 rounded-md my-2">
            <CreateActionButton
                title={
                    isAgent
                        ? `${i18n.t('tour.formTour.commission')} ${i18n.t('tour.commission.agent')}`
                        : `${i18n.t('tour.formTour.commission')} ${i18n.t('tour.commission.referrer')}`
                }
                handleAdd={handleAdd}
            />
            <Form form={props.formItem} onValuesChange={onValuesChange} onFinish={onFinish} layout="vertical">
                <Table
                    dataSource={isAgent ? dataCommission : dataRefCommission}
                    columns={columns}
                    rowKey="id"
                    bordered
                    pagination={false}
                    size="small"
                    scroll={{ x: 500 }}
                />
            </Form>
        </div>
    );
};
