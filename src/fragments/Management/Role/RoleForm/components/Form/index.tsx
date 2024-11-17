import { Form, FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { useWatch } from 'antd/es/form/Form';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { getURLFormNavigate } from '@fragments/Management/Role/features';
import { useCreateRole, useUpdateRole } from '@fragments/Management/Role/hooks/mutates';
import { useGetListGroupAgent, useGetRole } from '@fragments/Management/Role/hooks/queries';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { MyPermissions } from '@src/new/shared/utils/Permissions';
import { TableParams } from '@src/types/SearchResponse';
import { RoleType } from '@src/types/TypeEnum';
import { convertCheckedFormToArray, isEmptyString } from '@utils/formHelper';
import { AgentOnForm } from '@components/customizes/AutoComplete/AgentAutoComplete/AgentOnForm';
import { pageSize } from '@src/new/shared/types/BaseTypes';
import { useGetListAgentDropdown } from '@src/new/components/customs/AutoComplete/AgentAutoComplete/mutation';
import i18n from '@src/i18n';
import useHasAnyPermission from '@hooks/useHasAnyPermission';

import { SwitchActive } from '../SwitchActive';
import { FormSettingPermission } from './FormSettingPermission';
import { FormTabsDetail } from './FormTabsDetail';

interface FormDetailProps {
    form: FormInstance;
    isEnableEdit: boolean;
    isDirty: boolean;
    type: RoleType;
    includeGroupIds: string[];
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setIsDirty: Dispatch<SetStateAction<boolean>>;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    setIncludeGroupIds: Dispatch<SetStateAction<string[]>>;
}

const paramsSearch = {
    sorter: {
        columnKey: 'CreatedOn',
        order: 'descend',
    },
    pageSize: pageSize,
};

export const FormDetail: React.FC<FormDetailProps> = props => {
    const {
        form,
        isEnableEdit,
        isDirty,
        type,
        includeGroupIds,
        setIsEnableEdit,
        setIsDirty,
        setIsSubmitting,
        setIncludeGroupIds,
    } = props;
    const { roleId } = useParams<string>();
    const hasPermissionUpdateRoleCompany = useHasAnyPermission([
        MyPermissions.OwnerRoleUpdate,
        MyPermissions.OwnerRoleCreate,
    ]);
    const hasPermissionUpdateRoleAgent = useHasAnyPermission([
        MyPermissions.AgentRoleUpdate,
        MyPermissions.AgentRoleCreate,
    ]);
    const groupIdDataWatch = useWatch(['groupId'], form);

    const navigate = useNavigate();

    // State
    const [customTableParams, setCustomTableParams] = useState<TableParams<AnyObject>>({
        pagination: {
            pageSize: 10,
        },
    });

    // Query
    const { data: dataRole } = useGetRole(roleId ?? '');
    const { data: dataAgentDetail } = useGetListGroupAgent(
        {
            keyword: groupIdDataWatch,
        },
        !isEmptyString(groupIdDataWatch) && type === RoleType.Agent,
    );
    const dataAgent = useMemo(() => dataAgentDetail?.data?.[0], [dataAgentDetail?.data]);
    const { mutateAsync: getFetchDataList, isLoading } = useGetListAgentDropdown();

    // Mutate
    const { mutateAsync: createRole } = useCreateRole();
    const { mutateAsync: updateRole } = useUpdateRole();

    const { data: personInfo } = useFetchPersonalIdentityInfo();

    const checkFirstTimeEdit = useCallback(() => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
        if (!isDirty) {
            setIsDirty(true);
        }
    }, [isDirty, isEnableEdit, setIsDirty, setIsEnableEdit]);

    const handleOnValuesChange = () => {
        checkFirstTimeEdit();
    };

    const handleCreateRole = async (values: AnyObject) => {
        const response = await createRole(values);

        if (response.status == 200) {
            navigate(`${getURLFormNavigate(type)}/${response.data}`);
            toastSuccess('', 'Thêm mới thành công!');
            return;
        }
    };

    const handleUpdateRole = async (values: AnyObject) => {
        const response = await updateRole(values);

        if (response.status == 200) {
            toastSuccess('', 'Cập nhật thành công!');
            return;
        }
    };

    const onFinish = (values: AnyObject) => {
        const permissions = convertCheckedFormToArray(values.permissions);
        values.permissions = permissions;

        if (type === RoleType.Company) {
            delete values.agentActive;
        }

        if (!values.id) {
            handleCreateRole(values);
        } else {
            handleUpdateRole(values);
        }

        setIsSubmitting(false);
        setIsEnableEdit(false);
    };

    const renderGroupId = () => {
        if (type === RoleType.Agent) {
            return (
                <div className="grid grid-cols-3 gap-x-4">
                    <AgentOnForm
                        className="col-span-4 md:col-span-2 lg:col-span-1"
                        name="groupId"
                        label={<p className="mb-1 font-semibold">Đại lý</p>}
                        rules={[
                            {
                                required: true,
                                message: i18n.t('Vui lòng chọn đại lý để hệ thống hiển thị các chức năng của đại lý'),
                            },
                        ]}
                        requestSearch={paramsSearch}
                        placeholder="--Chọn đại lý--"
                        dataSelected={
                            !isEmpty(dataAgent)
                                ? [
                                      {
                                          value: groupIdDataWatch ?? '',
                                          label: `${dataAgent.code} - ${dataAgent.name}` ?? '',
                                      },
                                  ]
                                : []
                        }
                        disabled={!!roleId}
                        hookOnChange={getFetchDataList}
                        loading={isLoading}
                    />
                </div>
            );
        }

        return <BaseInput isForm name="groupId" isHidden />;
    };

    useEffect(() => {
        if (type === RoleType.Company && !isEmpty(personInfo?.groups) && !roleId) {
            form.setFieldValue('groupId', personInfo?.groups?.[0]?.groupId ?? '');
        }
    }, [form, personInfo?.groups, roleId, type]);

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={handleOnValuesChange}
            onFinish={onFinish}
            className="pb-4"
            disabled={
                dataRole?.isSystemDefault ||
                (!(type === RoleType.Company && hasPermissionUpdateRoleCompany) &&
                    !(type === RoleType.Agent && hasPermissionUpdateRoleAgent))
            }
        >
            <BaseInput isForm name="id" isHidden />
            {!roleId && (
                <>
                    <BaseInput isForm name="isAll" isHidden />
                </>
            )}
            <BaseInput isForm name="addGroupIdIds" isHidden />
            <BaseInput isForm name="removeGroupIds" isHidden />
            <div className="grid grid-cols-3 gap-x-4 mb-3">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="name"
                    label={<p className="mb-1 font-semibold">Tên</p>}
                    rules={[
                        { required: true, message: i18n.t('validation.default.validDefault') },
                        {
                            validator(_, value) {
                                if (value.toLowerCase() == 'administrator') {
                                    return Promise.reject(
                                        new Error(i18n.t(`Quyền hạn không được sử dụng tên: ${value}`)),
                                    );
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    showCount
                    maxCountNumber={250}
                />
                <SwitchActive form={form} checkFirstTimeEdit={checkFirstTimeEdit} />
            </div>
            {renderGroupId()}
            {type === RoleType.Company && !isNil(groupIdDataWatch) && (
                <FormTabsDetail
                    form={form}
                    onValuesChange={handleOnValuesChange}
                    onFinish={onFinish}
                    setIsEnableEdit={setIsEnableEdit}
                    includeGroupIds={includeGroupIds}
                    type={type}
                    customTableParams={customTableParams}
                    setCustomTableParams={setCustomTableParams}
                    setIncludeGroupIds={setIncludeGroupIds}
                />
            )}
            {type === RoleType.Agent && !isNil(groupIdDataWatch) && <FormSettingPermission form={form} type={type} />}
        </Form>
    );
};
