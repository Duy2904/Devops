import { Col, FormInstance } from 'antd';
import { DepositType, DiscountConditionType, DiscountDetailDto, DiscountLineRequest } from '@sdk/tour-operations';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CreateActionButton } from '@components/customizes/Button/CreateActionButton';
import { DeleteOutlined } from '@ant-design/icons';
import { DepositTypeSelect } from '@components/customizes/Select/DepositTypeSelect';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { Pattern } from '@utils/formHelper';
import i18n from '@src/i18n';
import isNil from 'lodash/isNil';
import { toastWarning } from '@components/ui/Toast/Toast';
import { useDebouncedCallback } from 'use-debounce';
import useHasAnyPermission from '@hooks/useHasAnyPermission';

interface TableConditionProps {
    discountId: string;
    data?: DiscountDetailDto;
    isLoading: boolean;
    infoForm: FormInstance;
}

export const TableCondition: React.FC<TableConditionProps> = props => {
    const { discountId, data, isLoading, infoForm } = props;
    const canDeleteData = useHasAnyPermission([MyPermissions.DiscountCreate, MyPermissions.DiscountUpdate]);
    // state
    const [count, setCount] = useState<number>(0);
    const [dataForm, setDataForm] = useState<AnyObject[]>([]);
    const [listNumber, setListNumber] = useState<AnyObject[]>([]);

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
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['discountLineConditionType', record.id!]}
                        initialValue={record.discountConditionType}
                    />
                    <>{index + 1}</>
                </>
            ),
        },
        {
            title: i18n.t('Số lượng'),
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
                    rules={[
                        {
                            validator(_, value) {
                                if (value <= 0) {
                                    return Promise.reject(new Error(i18n.t('validation.default.errorValue')));
                                }
                                return Promise.resolve();
                            },
                        },
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                    onChange={() => checkDuplicateSeat(record.id!)}
                    disable={data?.isUsed}
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
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                    ]}
                    disabled={data?.isUsed}
                />
            ),
        },
        {
            title: i18n.t('Giảm giá'),
            dataIndex: 'value',
            width: 200,
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
                                    (infoForm.getFieldValue(['discountLineDiscountType', record.id!]) ==
                                        DepositType.Percentage &&
                                        value > 100) ||
                                    value <= 0
                                ) {
                                    return Promise.reject(new Error(i18n.t('validation.default.errorValue')));
                                }
                                return Promise.resolve();
                            },
                        },
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                    disable={data?.isUsed}
                />
            ),
        },
        {
            title: i18n.t('Thao tác'),
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 50,
            render: (_, record: DiscountLineRequest) => (
                <>{canDeleteData && !data?.isUsed && <DeleteOutlined onClick={() => handleDeleteRowData(record)} />}</>
            ),
        },
    ];

    const handleAdd = () => {
        const data = {
            id: `discount-${count}`,
            discountConditionType: DiscountConditionType.NextPlaces,
            discountType: DepositType.Percentage,
        };
        const newData = data ?? [];
        setCount(count + 1);
        setDataForm([...dataForm, newData]);
    };

    const handleDeleteRowData = (record: DiscountLineRequest) => {
        const newArray = dataForm.filter(item => item.id !== record.id);
        setDataForm(newArray);
    };

    const checkDuplicateSeat = useDebouncedCallback((rowId: string) => {
        const tempItem = infoForm.getFieldValue(['discountLineQuantity', rowId]);
        if (
            listNumber.find(item => item.id != rowId && item.value == tempItem) &&
            infoForm.getFieldValue(['discountLineConditionType', rowId]) == DiscountConditionType.NextPlaces
        ) {
            toastWarning(i18n.t('message.default.warning'), i18n.t('Số lượng đã được nhập trước đó'));
            infoForm.setFieldValue(['discountLineQuantity', rowId], null);
            return;
        }
        const updatedList = listNumber.map(item => {
            if (item.id == rowId) return { ...item, value: tempItem };
            return item;
        });

        if (
            !listNumber.some(item => item.id === rowId) &&
            infoForm.getFieldValue(['discountLineConditionType', rowId]) == DiscountConditionType.NextPlaces
        ) {
            updatedList.push({ id: rowId, value: tempItem });
        }

        setListNumber(updatedList);
    }, 200);

    useEffect(() => {
        if (discountId) {
            setDataForm(data?.discountLines ?? []);
            data?.discountLines?.map(
                item =>
                    !isNil(item.quantity) &&
                    !isNil(item.id) &&
                    item.discountConditionType == DiscountConditionType.NextPlaces &&
                    setListNumber(prevListNumber => [...prevListNumber, { id: item.id, value: item.quantity }]),
            );
        }
    }, [data?.discountLines, discountId]);

    return (
        <Col className="p-4">
            {!data?.isUsed && <CreateActionButton handleAdd={handleAdd} />}
            <Table
                columns={columns}
                dataSource={dataForm}
                rowKey="id"
                bordered
                pagination={false}
                size="small"
                scroll={{ x: 600 }}
                loading={isLoading}
            />
        </Col>
    );
};
