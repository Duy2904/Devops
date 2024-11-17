import { ApprovalSettingDto, ApproverDto, ApproverRequest } from '@sdk/tour-operations';
import { Form, FormInstance, Switch, Table } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useGetApprovalSetting, useUpdateApprovalSetting } from '../../hooks/useApprovalSetting';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { ColumnsType } from 'antd/es/table';
import { GridTableComponent } from '@components/ui/GridTable';
import { Loading } from '@components/customizes/Loading/Loading';
import { SelectApprovers } from '../SelectApprovers/SelectApprovers';
import { convertValues } from '@utils/formHelper';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { localeCompare } from '@utils/localeHelper';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useDebouncedCallback } from 'use-debounce';
import { useQueryClient } from 'react-query';

interface SettingDefaultApproveFormProps {
    form: FormInstance;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    isEnableEdit: boolean;
}
export const SettingDefaultApproveForm: React.FC<SettingDefaultApproveFormProps> = props => {
    const queryClient = useQueryClient();
    const { form, isEnableEdit, setIsEnableEdit } = props;
    const [dataForm, setDataForm] = useState<ApprovalSettingDto[]>();

    // query
    const { data: dataApprovalSetting, isLoading: isLoadingApprovalSetting } = useGetApprovalSetting();

    // mutate
    const { mutateAsync: updateApprovalSetting } = useUpdateApprovalSetting();

    useEffect(() => {
        if (dataApprovalSetting) {
            setDataForm(dataApprovalSetting);
        }
    }, [dataApprovalSetting]);

    const columnsData: ColumnsType<AnyObject> = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            width: 0,
            render: (value: string, record) => (
                <>
                    <BaseInput isForm isHidden type="text" name={['id', record.id!]} initialValue={value} />
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['approverName', record.id!]}
                        initialValue={record.approverName}
                    />
                </>
            ),
        },
        {
            title: i18n.t('setting.table.processName'),
            dataIndex: 'approverType',
            key: 'approverType',
            fixed: 'left',
            sorter: (aCode, bCode) => localeCompare(aCode.approverType, bCode.approverType),
            width: 200,
            render: (value: string, record) => (
                <Form.Item className="mb-0" name={['approverType', record.id!]} initialValue={value}>
                    <p>{record.approverName}</p>
                </Form.Item>
            ),
        },
        {
            title: i18n.t('setting.table.aprrove'),
            dataIndex: 'isActive',
            key: 'isActive',
            width: 80,
            render: (value, record) => (
                <Form.Item className="mb-0" name={['isActive', record.id!]} initialValue={value}>
                    <Switch
                        defaultChecked={value}
                        size="small"
                        disabled={dataApprovalSetting?.find(x => x.id === record.id)?.isActive}
                    />
                </Form.Item>
            ),
        },
        {
            title: i18n.t('setting.table.approveBy'),
            dataIndex: 'approvers',
            key: 'approvers',
            width: 490,
            render: (value, record) => {
                const newValue = value.map((x: ApproverDto) => x.userId);

                const totalApproval = !isNil(form.getFieldValue(['approvers', record.id!]))
                    ? form.getFieldValue(['approvers', record.id!]).length ?? 0
                    : dataApprovalSetting?.find(x => x.id === record.id)?.approvers?.length ?? 0;

                return (
                    <SelectApprovers
                        name={['approvers', record.id!]}
                        disable={!record.isActive}
                        isRequired={record.isActive}
                        dependencies={['isActive']}
                        className="mb-0"
                        initialValue={newValue}
                        MAX_COUNT={5}
                        totalApproval={totalApproval}
                        approveName={record.approverName}
                    />
                );
            },
        },
        {
            title: i18n.t('setting.table.updateAt'),
            dataIndex: 'updateAt',
            key: 'updateAt',
            width: 130,
            sorter: (aCusName, bCusName) => localeCompare(aCusName.updateAt, bCusName.updateAt),
            render: (_, record) => <>{dayjs(record.updateAt).format(AppConfig.DateTimeFormat)}</>,
        },
    ];

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    const debounceSetTravellersData = useDebouncedCallback(values => {
        const dataList = convertValues(values);

        setDataForm(dataList);
    }, 300);

    const handleValuesChange = (_value: AnyObject, values: AnyObject) => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }

        if (_value.aprrove) {
            const index = Object.keys(_value.aprrove);
            const id = index[0];
            if (!_value.aprrove[id]) {
                form.setFieldValue(['approveBy', id], []);
            }
        }
        debounceSetTravellersData(values);
    };

    const onFinish = async (values: AnyObject) => {
        const dataList = convertValues(values);
        const approvers: ApproverRequest[] = [];

        dataList.forEach(x => {
            if (!isEmpty(x.approvers)) {
                x.approvers.forEach((y: string) =>
                    approvers.push({ id: x.id, approverType: x.approverType, userId: y }),
                );
            }
        });

        const res = await updateApprovalSetting({ approvers: approvers });
        if (res.status === 200) {
            toastSuccess('', 'Cập nhật thành công!');
            queryClient.invalidateQueries({ queryKey: ['fetchMyApprovalSetting'] });
            queryClient.invalidateQueries({ queryKey: ['fetchApprovalSetting'] });
        }
    };

    if (isLoadingApprovalSetting) {
        return <Loading />;
    }

    return (
        <Form className="pb-4" form={form} onValuesChange={handleValuesChange} onFinish={onFinish}>
            <div className="h-[calc(100vh_-_143px)] overflow-auto">
                <GridTableComponent
                    tableParams={{}}
                    columns={columnsData}
                    dataSource={dataForm}
                    bordered={false}
                    scrollX={1152}
                    scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
                    tableName={i18n.t('setting.table.tableName')}
                    summary={handleSummary}
                    isHidePagination={true}
                />
            </div>
        </Form>
    );
};
