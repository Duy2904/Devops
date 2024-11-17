import { Checkbox, Form, FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { useWatch } from 'antd/es/form/Form';
import { ColumnsType } from 'antd/es/table';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { GridTableComponent } from '@components/ui/GridTable';
import { getList, sortFunctionPermissions } from '@fragments/Management/Role/features';
import { useGetListGroupAgent, useGetRole } from '@fragments/Management/Role/hooks/queries';
import { useGetListPermissionsDefault } from '@fragments/Management/Role/hooks/useGetListPermissionsDefault';
import i18n from '@src/i18n';
import { RoleType } from '@src/types/TypeEnum';
import { defaultPermissions } from '@utils/defaultPermissions';
import { isEmptyString } from '@utils/formHelper';

interface FormSettingPermissionProps {
    form: FormInstance;
    type: RoleType;
}

export const FormSettingPermission: React.FC<FormSettingPermissionProps> = props => {
    const { form, type } = props;
    const { roleId } = useParams<string>();
    const groupIdDataWatch = useWatch(['groupId'], form);

    const { data } = useGetListGroupAgent(
        {
            keyword: groupIdDataWatch,
        },
        !isEmptyString(groupIdDataWatch) && type === RoleType.Agent,
    );
    const roleGroupId = !isEmptyString(groupIdDataWatch) ? data?.data?.[0]?.roleId : undefined;
    const listPermissionDefault = useGetListPermissionsDefault(type, roleGroupId ?? '');

    // State
    const [groupFunction, setGroupFunction] = useState<string[]>([]);
    const [groupPermission, setGroupPermission] = useState<string[]>([]);
    const [dataForm, setDataForm] = useState<AnyObject[]>([]);
    const [togglePermissions, setTogglePermissions] = useState<boolean>(!roleId && type === RoleType.Company);

    // Query
    const { data: dataRoleDetail } = useGetRole(roleId ?? '');

    const handleTogglePermission = () => {
        let filterPermissions: string[] = [];
        const permissionList = listPermissionDefault?.permissions ?? [];
        const tempDataForm = groupPermission?.map(x => {
            filterPermissions = permissionList?.filter(y => y.includes(`.${x}.`));
            filterPermissions?.map(item => form.setFieldValue(['permissions', item], !togglePermissions));
            return {
                id: x,
                name: x,
                permissions: filterPermissions,
            };
        });
        setDataForm(tempDataForm);
        setTogglePermissions(!togglePermissions);
    };

    useEffect(() => {
        const listPermission = listPermissionDefault?.permissions ?? [];

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
        } else {
            setGroupPermission([]);
            setGroupFunction([]);
            setDataForm([]);
        }
    }, [listPermissionDefault?.permissions]);

    useEffect(() => {
        if (isEmpty(dataForm) && !isEmpty(groupPermission)) {
            const permissionList =
                !roleId && type === RoleType.Company
                    ? listPermissionDefault?.permissions ?? []
                    : dataRoleDetail?.permissions ?? [];
            const tempDataForm = groupPermission?.map(x => {
                const filterPermissions = permissionList?.filter(y => y.includes(`.${x}.`));
                filterPermissions?.map(item => form.setFieldValue(['permissions', item], true));
                return {
                    id: x,
                    name: x,
                    permissions: filterPermissions,
                };
            });

            setDataForm(tempDataForm);
        }
    }, [dataRoleDetail, dataForm, form, groupPermission]);

    const columnsData: ColumnsType<AnyObject> = [
        {
            title: !form.getFieldValue('id') ? (
                <Checkbox onClick={handleTogglePermission} defaultChecked={togglePermissions} />
            ) : (
                '#'
            ),
            dataIndex: 'id',
            key: 'id',
            width: 50,
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
                    listPermissionDefault?.permissions?.find(item => item.includes(`.${record.name}.${x}`)) ?? '';

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

    const width = useMemo(() => groupFunction?.length * 50 + 200, [groupFunction?.length]);

    return (
        <GridTableComponent
            isHideSelectColumn
            columns={columnsData}
            tableParams={{}}
            dataSource={dataForm}
            bordered={true}
            scrollX={width}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 450 : undefined}
            tableName={i18n.t('Quyền hạn')}
            showAction
            isHidePagination
        />
    );
};
