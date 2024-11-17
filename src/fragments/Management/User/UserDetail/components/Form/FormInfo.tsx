import { Col, Flex, Form, FormInstance, Radio, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { GetAccountDto } from '@sdk/tour-operations';
import { UserFormValidation } from '@fragments/Management/User/Features';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { AgentOnForm } from '@components/customizes/AutoComplete/AgentAutoComplete/AgentOnForm';
import { pageSize } from '@src/new/shared/types/BaseTypes';
import { useGetListAgentDropdown } from '@src/new/components/customs/AutoComplete/AgentAutoComplete/mutation';
import i18n from '@src/i18n';

import { BranchSelect } from './BranchSelect';
import { DepartmentSelect } from './DepartmentSelect';
import { JobTitleSelect } from './JobTitleSelect';
import { RoleSelect } from './RoleSelect';

interface FormInfoProps {
    form: FormInstance;
    isOwner?: boolean;
    userId?: string;
    dataAccount?: GetAccountDto;
    canChangeData?: boolean;
}

const paramsSearch = {
    sorter: {
        columnKey: 'CreatedOn',
        order: 'descend',
    },
    pageSize: pageSize,
};

export const FormInfo: React.FC<FormInfoProps> = props => {
    const { form, isOwner, userId, dataAccount, canChangeData } = props;
    const branchIdUseWatch = Form.useWatch('branchId', form);
    const groupIdUseWatch = Form.useWatch('groupId', form);

    const { data: fetchPersonalInfo } = useFetchPersonalIdentityInfo();
    const { mutateAsync: getFetchDataList, isLoading } = useGetListAgentDropdown();

    return (
        <div>
            <BaseInput isForm isHidden type="text" name="id" />
            <BaseInput isForm name="imageUrl" isHidden />
            <Flex className="mt-2 mb-4" align="center" gap={10}>
                <p className="font-semibold">{i18n.t('Kích hoạt tài khoản')}</p>
                <Form.Item className="mb-0" name="isActive">
                    <Switch />
                </Form.Item>
            </Flex>
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="email"
                    label={i18n.t('Email')}
                    rules={UserFormValidation.email}
                    disable={!!userId}
                />
                {!userId && isOwner && fetchPersonalInfo?.isGlobal ? (
                    <Form.Item
                        label={<p className="font-semibold">{i18n.t('Phương thức đăng nhập')}</p>}
                        name="includedAd"
                        initialValue={true}
                    >
                        <Radio.Group>
                            <Radio value={true}>Tài khoản thường</Radio>
                            <Radio value={false}>Email Hồng Ngọc Hà</Radio>
                        </Radio.Group>
                    </Form.Item>
                ) : (
                    <Col></Col>
                )}
                <Col className="grid grid-cols-2 gap-5">
                    <BaseInput
                        isForm
                        className="mb-3"
                        name={'lastName'}
                        label={i18n.t('Họ')}
                        rules={UserFormValidation.lastName}
                        initialValue={dataAccount?.lastName}
                        showCount
                        maxCountNumber={20}
                    />
                    <BaseInput
                        isForm
                        className="mb-3"
                        name={'firstName'}
                        label={i18n.t('Tên và tên đệm')}
                        rules={UserFormValidation.firstName}
                        initialValue={dataAccount?.firstName}
                        showCount
                        maxCountNumber={20}
                    />
                </Col>
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    label={i18n.t('Họ và tên')}
                    value={`${dataAccount?.lastName ?? ''} ${dataAccount?.firstName ?? ''}`}
                    disable
                />
                {!isOwner && (
                    <AgentOnForm
                        className="col-span-4 md:col-span-2 lg:col-span-1"
                        name="groupId"
                        label={<p className="mb-1 font-semibold">Đại lý</p>}
                        rules={UserFormValidation.groupId}
                        requestSearch={paramsSearch}
                        placeholder="--Chọn đại lý--"
                        dataSelected={
                            dataAccount
                                ? [{ value: `${dataAccount?.groupId}`, label: `${dataAccount?.groupName}` }]
                                : []
                        }
                        hookOnChange={getFetchDataList}
                        disabled={!!userId}
                        loading={isLoading}
                    />
                )}
                <RoleSelect
                    isForm
                    required
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="roleId"
                    label={i18n.t('Quyền hạn')}
                    rules={UserFormValidation.roleId}
                    groupId={isOwner ? fetchPersonalInfo?.groups?.[0]?.groupId : groupIdUseWatch}
                    ownerId={fetchPersonalInfo?.groups?.[0]?.groupId}
                    disabled={(!isOwner && !groupIdUseWatch) || !canChangeData}
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name={'phoneNumber'}
                    label={i18n.t('Số điện thoại')}
                    rules={UserFormValidation.phoneNumber}
                    showCount
                    maxCountNumber={20}
                />
                {isOwner && fetchPersonalInfo?.isGlobal && (
                    <BranchSelect
                        isForm
                        required
                        className="col-span-4 md:col-span-2 lg:col-span-1"
                        name="branchId"
                        label={i18n.t('Chi nhánh')}
                        rules={UserFormValidation.branchId}
                        dataDefault={
                            dataAccount?.branchId && dataAccount?.branchName
                                ? { value: dataAccount?.branchId ?? '', label: dataAccount?.branchName ?? '' }
                                : undefined
                        }
                    />
                )}
                <JobTitleSelect
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="positionId"
                    label={i18n.t('Chức vụ')}
                />
                {isOwner && fetchPersonalInfo?.isGlobal && (
                    <DepartmentSelect
                        isForm
                        className="col-span-4 md:col-span-2 lg:col-span-1"
                        name="departmentId"
                        label={i18n.t('Bộ phận')}
                        branchIdUseWatch={branchIdUseWatch}
                        disabled={!branchIdUseWatch || !canChangeData}
                    />
                )}
                <Form.Item
                    name="description"
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    label={i18n.t('Ghi chú')}
                >
                    <TextArea rows={1} showCount maxLength={500} />
                </Form.Item>
            </div>
        </div>
    );
};
