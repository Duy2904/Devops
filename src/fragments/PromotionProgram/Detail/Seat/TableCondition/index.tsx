import { Col, Form, FormInstance } from 'antd';
import { DepositType, DiscountConditionType, DiscountDetailDto, DiscountLineRequest } from '@sdk/tour-operations';
import {
    IsDisableEndDate,
    IsDisableInput,
    getIdOfLastMinute,
    validateDisableDateEndDate,
    validateDisableDateStartDate,
    validateDisableStartDate,
} from '@fragments/PromotionProgram/Feature';
import Table, { ColumnProps, ColumnsType } from 'antd/es/table';
import { useCallback, useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { ConditionSelect } from './ConditionSelect';
import { CreateActionButton } from '@components/customizes/Button/CreateActionButton';
import { DeleteOutlined } from '@ant-design/icons';
import { DepositTypeSelect } from '@components/customizes/Select/DepositTypeSelect';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { Pattern } from '@utils/formHelper';
import dayjs from 'dayjs';
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
    const isEarlyBirdForm = Form.useWatch('isEarlyBird', infoForm);
    const isLastMinuteForm = Form.useWatch('isLastMinute', infoForm);
    const saleStartDateForm = Form.useWatch('startDate', infoForm);
    const saleEndDateForm = Form.useWatch('endDate', infoForm);
    const discountFormUseWatch = Form.useWatch([], infoForm);

    const isShowAction = false;
    const canDeleteData = useHasAnyPermission([MyPermissions.DiscountCreate, MyPermissions.DiscountUpdate]);

    // state
    const [count, setCount] = useState<number>(0);
    const [dataForm, setDataForm] = useState<AnyObject[]>([]);
    const [listNumber, setListNumber] = useState<AnyObject[]>([]);
    const [endDateOfEB, setEndDateOfEB] = useState<dayjs.Dayjs | null>(null);

    const commonColumns: ColumnsType<DiscountLineRequest> = [
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
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                    disable={IsDisableInput(data, record)}
                    onChange={() => checkDuplicateSeat(record.id!)}
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
                    disabled={IsDisableInput(data, record)}
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
                                    (infoForm.getFieldValue(['discountLineDiscountType', record.id!]) ==
                                        DepositType.Percentage &&
                                        value > 100) ||
                                    value <= 0
                                ) {
                                    return Promise.reject(new Error(''));
                                }
                                return Promise.resolve();
                            },
                        },
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                    disable={IsDisableInput(data, record)}
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
                        rules={[{ required: true, message: '' }]}
                        isRequired
                        className="col-span-2 lg:col-span-1 mb-0"
                        format={'shortDate'}
                        disabled={validateDisableStartDate(data, record)}
                        disabledDate={current =>
                            validateDisableDateStartDate(
                                current,
                                saleStartDateForm,
                                saleEndDateForm,
                                infoForm,
                                record,
                                record.discountConditionType == DiscountConditionType.FirstPlaces ? null : endDateOfEB,
                            )
                        }
                        onChange={() => {
                            infoForm.setFieldValue(['discountLineEndDate', record.id!], undefined);
                            record.discountConditionType == DiscountConditionType.FirstPlaces &&
                                handleChangeStartDateOfEB();
                        }}
                        placeholder={i18n.t('Ngày bắt đầu')}
                        initialValue={record.startDate ? dayjs(record.startDate) : undefined}
                    />
                    <BaseDatePicker
                        name={['discountLineEndDate', record.id!]}
                        rules={[{ required: true, message: '' }]}
                        isRequired
                        className="col-span-2 lg:col-span-1 mb-0"
                        format={'shortDate'}
                        customDefaultValue={infoForm.getFieldValue(['discountLineStartDate', record.id!])}
                        disabled={IsDisableEndDate(infoForm, record, data)}
                        disabledDate={current => validateDisableDateEndDate(current, infoForm, record, saleEndDateForm)}
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

    const actionCol: ColumnProps<DiscountLineRequest> = {
        title: i18n.t('Thao tác'),
        key: 'operation',
        fixed: 'right',
        align: 'center',
        width: 50,
        render: (_, record: DiscountLineRequest) =>
            canDeleteData && !data?.isUsed ? (
                infoForm.getFieldValue(['discountLineConditionType', record.id!]) ==
                    DiscountConditionType.NextPlaces && <DeleteOutlined onClick={() => handleDeleteRowData(record)} />
            ) : (
                <></>
            ),
    };

    const columns: ColumnsType<DiscountLineRequest> = [...commonColumns];
    if (isShowAction) {
        columns.push(actionCol);
    }

    const handleGetEndDateOfEB = (values: dayjs.Dayjs | null) => {
        setEndDateOfEB(values);
        const idOfLastMinute = getIdOfLastMinute(discountFormUseWatch);
        infoForm.setFieldValue(['discountLineStartDate', idOfLastMinute], undefined);
        infoForm.setFieldValue(['discountLineEndDate', idOfLastMinute], undefined);
    };

    const handleChangeStartDateOfEB = () => {
        setEndDateOfEB(null);
        const idOfLastMinute = getIdOfLastMinute(discountFormUseWatch);
        infoForm.setFieldValue(['discountLineStartDate', idOfLastMinute], undefined);
        infoForm.setFieldValue(['discountLineEndDate', idOfLastMinute], undefined);
    };

    const handleAdd = () => {
        const data = {
            id: `discount-${count}`,
            discountConditionType: DiscountConditionType.NextPlaces,
            discountType: DepositType.Percentage,
            startDate: dayjs(),
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
            toastWarning(i18n.t('message.default.warning'), i18n.t('Số chỗ đã được nhập trước đó'));
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
    }, 500);

    const handleSpecialRow = useCallback(() => {
        let newDataForm = [...dataForm];
        if (isEarlyBirdForm) {
            const isFirstPlacesPresent = !isNil(
                dataForm.find(item => item.discountConditionType === DiscountConditionType.FirstPlaces),
            );
            if (!isFirstPlacesPresent) {
                newDataForm.push({
                    id: `discount--FirstPlaces`,
                    discountConditionType: DiscountConditionType.FirstPlaces,
                    discountType: DepositType.Percentage,
                });
            }
        } else {
            newDataForm = newDataForm.filter(item => item.discountConditionType !== DiscountConditionType.FirstPlaces);
            infoForm.setFieldValue(['discountLineStartDate', 'discount--FirstPlaces'], undefined);
            infoForm.setFieldValue(['discountLineEndDate', 'discount--FirstPlaces'], undefined);
            setEndDateOfEB(null);
        }
        if (isLastMinuteForm) {
            const isLastPlacesPresent = !isNil(
                dataForm.find(item => item.discountConditionType === DiscountConditionType.LastPlaces),
            );
            if (!isLastPlacesPresent) {
                newDataForm.push({
                    id: `discount--LastPlaces`,
                    discountConditionType: DiscountConditionType.LastPlaces,
                    discountType: DepositType.Percentage,
                });
            }
        } else {
            infoForm.setFieldValue(['discountLineStartDate', 'discount--LastPlaces'], undefined);
            infoForm.setFieldValue(['discountLineEndDate', 'discount--LastPlaces'], undefined);
            newDataForm = newDataForm.filter(item => item.discountConditionType !== DiscountConditionType.LastPlaces);
        }
        setDataForm(newDataForm);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEarlyBirdForm, isLastMinuteForm]);

    useEffect(() => {
        handleSpecialRow();
    }, [handleSpecialRow]);

    useEffect(() => {
        if (discountId) {
            const sortedData = data?.discountLines?.sort((a, b) => {
                if (a.discountConditionType! < b.discountConditionType!) return -1;
                if (a.discountConditionType! > b.discountConditionType!) return 1;
                return 0;
            });
            setDataForm(sortedData ?? []);
            sortedData?.map(
                item =>
                    !isNil(item.quantity) &&
                    !isNil(item.id) &&
                    item.discountConditionType == DiscountConditionType.NextPlaces &&
                    setListNumber(prevListNumber => [...prevListNumber, { id: item.id, value: item.quantity }]),
            );
            if (sortedData?.find(item => item.discountConditionType == DiscountConditionType.FirstPlaces)) {
                infoForm.setFieldValue('isEarlyBird', true);
                const endDateOfEBTemp = sortedData?.find(
                    item => item.discountConditionType == DiscountConditionType.FirstPlaces,
                )?.endDate;
                setEndDateOfEB(dayjs(endDateOfEBTemp));
            }
            sortedData?.find(item => item.discountConditionType == DiscountConditionType.LastPlaces) &&
                infoForm.setFieldValue('isLastMinute', true);
        }
    }, [data?.discountLines, discountId, infoForm]);

    return (
        <Col className="p-4">
            {!data?.isUsed && isShowAction && <CreateActionButton handleAdd={handleAdd} />}
            <Table
                columns={columns}
                dataSource={dataForm}
                rowKey="id"
                bordered
                pagination={false}
                size="small"
                loading={isLoading}
            />
        </Col>
    );
};
