import { Checkbox, Form, FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { isEmpty } from 'lodash';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { GridTableComponent } from '@components/ui/GridTable';
import { useGetGroupAgent } from '@hooks/identity-next/queries/useGroup';
import { useFetchAgentPermissions } from '@hooks/identity-next/queries/useRole';
import { SaleOrderDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { RoleType } from '@src/types/TypeEnum';
import { useSearchTableStore } from '@store/searchTableStore';
import { defaultPermissions } from '@utils/defaultPermissions';
import { isEmptyString } from '@utils/formHelper';

import { getList, sortFunctionPermissions } from '../../Feature';

interface FormSettingPermissionProps {
    form: FormInstance;
    setSubmittable: Dispatch<SetStateAction<boolean>>;
}

export const FormSettingPermission: React.FC<FormSettingPermissionProps> = props => {
    const { form, setSubmittable } = props;
    const { agentId } = useParams<string>();

    // State
    const [groupFunction, setGroupFunction] = useState<string[]>([]);
    const [groupPermission, setGroupPermission] = useState<string[]>([]);
    const [dataForm, setDataForm] = useState<AnyObject[]>([]);
    const [togglePermissions, setTogglePermissions] = useState<boolean>(false);

    // Store
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    // Query
    const { data: listPermissionAgent } = useFetchAgentPermissions(RoleType.Agent);
    const { data: dataAgent } = useGetGroupAgent(agentId ?? '');

    const handleTogglePermission = () => {
        let filterPermissions: string[] = [];
        const permissionAgent = listPermissionAgent?.permissions ?? [];
        const tempDataForm = groupPermission?.map(x => {
            filterPermissions = permissionAgent?.filter(y => y.includes(`.${x}.`));
            filterPermissions?.map(item => form.setFieldValue(['permissions', item], !togglePermissions));
            return {
                id: x,
                name: x,
                permissions: filterPermissions,
            };
        });
        setDataForm(tempDataForm);
        setTogglePermissions(!togglePermissions);
        setSubmittable(true);
    };

    useEffect(() => {
        const listPermission = listPermissionAgent?.permissions ?? [];

        if (!isEmpty(listPermission)) {
            const tempListPermission: string[] = [];
            const tempListFunction: string[] = [];
            let listFunctionWithSort: string[] = [];
            listPermission.forEach(x => {
                const permissionName = x.split('.')[1];
                const functionName = x.split('.')[2];

                const findPermissionDefault = defaultPermissions.find(x => x.endsWith(`.${permissionName}`));

                if (isEmptyString(findPermissionDefault)) {
                    getList(functionName, tempListFunction);
                    getList(permissionName, tempListPermission);
                }
            });

            listFunctionWithSort = sortFunctionPermissions(tempListFunction, listFunctionWithSort);

            setGroupPermission(tempListPermission);
            setGroupFunction(listFunctionWithSort);
        }
    }, [listPermissionAgent?.permissions]);

    useEffect(() => {
        if (isEmpty(dataForm) && !isEmpty(groupPermission)) {
            const permissionAgent = dataAgent?.permissions ?? [];
            const tempDataForm = groupPermission?.map(x => {
                const filterPermissions = permissionAgent?.filter(y => y.includes(x));
                filterPermissions?.map(item => form.setFieldValue(['permissions', item], true));
                return {
                    id: x,
                    name: x,
                    permissions: filterPermissions,
                };
            });
            setDataForm(tempDataForm);
        }
    }, [dataAgent, dataForm, form, groupPermission]);

    const columnsData: ColumnsType<AnyObject> = [
        {
            title: !form.getFieldValue('id') ? (
                <Checkbox onClick={handleTogglePermission} defaultChecked={togglePermissions} />
            ) : (
                '#'
            ),
            dataIndex: 'id',
            key: 'id',
            width: 30,
            align: 'center',
            render: (_, _record, index: number) => <>{index + 1}</>,
        },
        {
            title: i18n.t('Chức năng'),
            dataIndex: 'name',
            key: 'name',
            width: 150,
            render(value) {
                return <p>{i18n.t(`permissions.${value}`)}</p>;
            },
        },
        ...(groupFunction.map(x => ({
            title: <p>{i18n.t(`agent.permission.function.${x}`)}</p>,
            dataIndex: x,
            key: x,
            width: 50,
            render(_value: boolean, record: AnyObject) {
                const permissionName =
                    listPermissionAgent?.permissions?.find(item => item.includes(`.${record.name}.${x}`)) ?? '';
                if (!permissionName) {
                    return;
                }

                return (
                    <Form.Item
                        className="flex justify-center mb-0"
                        name={['permissions', permissionName]}
                        key={permissionName}
                        valuePropName="checked"
                    >
                        <Checkbox />
                    </Form.Item>
                );
            },
        })) ?? []),
    ];

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SaleOrderDto> | SorterResult<SaleOrderDto>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
            sorter,
        });
    };

    return (
        <GridTableComponent
            isHideSelectColumn
            columns={columnsData}
            tableParams={tableParams}
            dataSource={dataForm}
            onChange={handleTableChange}
            bordered={true}
            scrollX={570}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            tableName={i18n.t('Quyền hạn')}
            showAction
            isHidePagination
        />
    );
};
