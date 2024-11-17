import { Form, FormInstance, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AppConfig } from '@utils/config';
import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { BranchSelect } from '@fragments/Management/Agent/Detail/Components/Select/BranchSelect';
import { PersonInChargeSelect } from '@fragments/Management/Agent/Detail/Components/Select/PersonInChargeSelect';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useGetGroupAgent } from '@hooks/identity-next/queries/useGroup';
import { BankOnForm } from '@components/customizes/AutoComplete/BankAutoComplete/BankOnForm';
import i18n from '@src/i18n';

import { useGetListBankDropdown } from '../../hooks/mutates';
import { useFetchAgentPaymentLimit } from '../../hooks/queries';
import { checkRegexCode, checkRegexSpace } from '../../Feature';

interface FormInfoProps {
    form: FormInstance;
    isHasPermissionUpdate: boolean;
}

export const FormInfo: React.FC<FormInfoProps> = props => {
    const { form, isHasPermissionUpdate } = props;
    const { agentId } = useParams<string>();
    const effectiveDateUseWatch = Form.useWatch('effectiveDate', form);

    const { data } = useGetGroupAgent(agentId ?? '');
    const { data: fetchPersonalInfo } = useFetchPersonalIdentityInfo();
    const { data: fetchAgentPaymentLimit } = useFetchAgentPaymentLimit(agentId!);

    const { mutateAsync: getListListBankDropdown, isLoading } = useGetListBankDropdown();

    useEffect(() => {
        if (!isEmpty(fetchAgentPaymentLimit?.bankInforId)) {
            form.setFieldValue('bankInforId', fetchAgentPaymentLimit?.bankInforId);
        }
    }, [fetchAgentPaymentLimit?.bankInforId, form]);

    return (
        <div className="pr-1 pb-4">
            <BaseInput isForm isHidden name="id" />
            <BaseInput
                isForm
                isHidden
                name="parentId"
                initialValue={data?.parentId ?? fetchPersonalInfo?.groups?.[0]?.groupId}
            />

            {/* Kích hoạt */}
            {agentId && (
                <Form.Item name="isActive" label={<p className="mb-1 font-semibold">{i18n.t('Kích hoạt đại lý')}</p>}>
                    <Switch />
                </Form.Item>
            )}

            {/* Mã đại lý - Mã hệ thống */}
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    forceUppercase
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="code"
                    label={<p className="mb-1 font-semibold">Mã đại lý</p>}
                    disable={!!agentId}
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                        {
                            validator(_, value) {
                                if (checkRegexCode(value)) {
                                    return Promise.reject(
                                        new Error(
                                            `${i18n.t('validation.default.errorValue')} (${i18n.t(
                                                'Mã Đại lý không chứa ký tự đặc biệt hoặc chữ thường',
                                            )})`,
                                        ),
                                    );
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    showCount
                    maxCountNumber={25}
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="systemId"
                    label={<p className="mb-1 font-semibold">Mã hệ thống</p>}
                    disable={!!agentId}
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                        {
                            validator(_, value) {
                                if (checkRegexSpace(value)) {
                                    return Promise.reject(
                                        new Error(
                                            `${i18n.t('validation.default.errorValue')} (${i18n.t(
                                                'Mã hệ thống không chứa khoảng trắng',
                                            )})`,
                                        ),
                                    );
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    showCount
                    maxCountNumber={25}
                />
            </div>

            {/* Tên đại lý - tên ngắn */}
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="name"
                    label={<p className="mb-1 font-semibold">Tên đại lý</p>}
                    rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                    showCount
                    maxCountNumber={250}
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="shortName"
                    label={<p className="mb-1 font-semibold">Tên ngắn</p>}
                    showCount
                    maxCountNumber={250}
                />
            </div>

            {/* Địa chỉ */}
            <Form.Item
                name="address"
                className="col-span-4 md:col-span-2 lg:col-span-1"
                label={<p className="mb-1 font-semibold">Địa chỉ</p>}
                rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
            >
                <TextArea rows={2} showCount maxLength={500} />
            </Form.Item>

            {/* Hiệu lực hợp đồng - Mã số thuế */}
            <div className="grid grid-cols-2 gap-x-4">
                <div>
                    <p className="mb-2 font-semibold">Hiệu lực hợp đồng</p>
                    <div className="grid grid-cols-2 gap-4">
                        <BaseDatePicker name="effectiveDate" className="col-span-2 lg:col-span-1" format="date" />
                        <BaseDatePicker
                            name="expirationDate"
                            className="col-span-2 lg:col-span-1"
                            format="date"
                            disabled={!effectiveDateUseWatch || !isHasPermissionUpdate}
                            disabledDate={current => current <= effectiveDateUseWatch}
                        />
                    </div>
                </div>
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="taxCode"
                    label={<p className="mb-1 font-semibold">Mã số thuế</p>}
                    showCount
                    maxCountNumber={20}
                />
            </div>

            {/* Người đại diện - Số tài khoản */}
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="representative"
                    label={<p className="mb-1 font-semibold">Người đại diện</p>}
                    showCount
                    maxCountNumber={40}
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="bankAccount"
                    label={<p className="mb-1 font-semibold">Số tài khoản</p>}
                    showCount
                    maxCountNumber={20}
                />
            </div>

            {/* Số điện thoại - Mã ngân hàng */}
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    label={<p className="mb-1 font-semibold">Số điện thoại</p>}
                    name={'phoneNumber'}
                    rules={[
                        {
                            pattern: AppConfig.PhoneRegex,
                            message: i18n.t('validation.default.errorPhone'),
                        },
                        {
                            required: true,
                            message: i18n.t('validation.default.validPhone'),
                        },
                    ]}
                />
                <BankOnForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="bankInforId"
                    label={<p className="mb-1 font-semibold">Mã ngân hàng</p>}
                    requestSearch={{}}
                    placeholder="--Chọn mã ngân hàng--"
                    dataSelected={
                        !isEmpty(fetchAgentPaymentLimit?.bankInfor)
                            ? [
                                  {
                                      value: fetchAgentPaymentLimit?.bankInfor?.id ?? '',
                                      label: `${fetchAgentPaymentLimit?.bankInfor?.bankCode} - ${fetchAgentPaymentLimit?.bankInfor?.name}`,
                                  },
                              ]
                            : []
                    }
                    hookOnChange={getListListBankDropdown}
                    loading={isLoading}
                />
            </div>

            {/* Email - Tên ngân hàng */}
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="email"
                    label={<p className="mb-1 font-semibold">Email</p>}
                    disable={data?.inUse}
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                        {
                            type: 'email',
                            message: i18n.t('validation.default.validMail'),
                        },
                    ]}
                />

                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="bankName"
                    label={<p className="mb-1 font-semibold">Tên ngân hàng (chi nhánh)</p>}
                    showCount
                    maxCountNumber={250}
                />
            </div>

            {/* Branch - Website */}
            <div className="grid grid-cols-2 gap-x-4">
                <BranchSelect
                    isForm
                    options={[]}
                    name="branchId"
                    label={<p className="mb-1 font-semibold">Chi nhánh trực thuộc</p>}
                    initialValue={data?.branchId}
                    dataBranchDefault={
                        data?.branchId && data?.branchName
                            ? { value: data?.branchId ?? '', label: data?.branchName ?? '' }
                            : undefined
                    }
                />

                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="website"
                    label={<p className="mb-1 font-semibold">Website</p>}
                    showCount
                    maxCountNumber={100}
                />
            </div>

            {/* Ghi chú - Người phụ trách */}
            <div className="grid grid-cols-2 gap-x-4">
                <PersonInChargeSelect
                    isForm
                    options={[]}
                    name={'personInChargeId'}
                    label={<p className="mb-1 font-semibold">Người phụ trách</p>}
                />
                <Form.Item name="description" label={<p className="mb-1 font-semibold">Ghi chú</p>}>
                    <TextArea rows={2} showCount maxLength={500} />
                </Form.Item>
            </div>
        </div>
    );
};
