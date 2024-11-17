import { Dispatch, SetStateAction } from 'react';
import { Form, FormInstance } from 'antd';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { BranchDto } from '@sdk/identity-next/models';
import { SwitchItem } from '../SwitchItem';
import TextArea from 'antd/es/input/TextArea';
import { branchFormValidation } from '@fragments/Management/Branch/Feature';
import i18n from '@src/i18n';

export interface FormInfoProps {
    dataBranch?: BranchDto;
    form: FormInstance;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
}

export const FormInfo: React.FC<FormInfoProps> = props => {
    const { dataBranch, form, setIsEnableEdit } = props;

    return (
        <div>
            <BaseInput isForm isHidden type="text" name="id" />
            <BaseInput isForm name="logo" isHidden />
            <div className="grid grid-cols-3 gap-x-10">
                <BaseInput
                    isForm
                    className="col-span-3 lg:col-span-2 mb-4"
                    name="name"
                    label={<p className="mb-1 font-semibold">{i18n.t('Tên chi nhánh')}</p>}
                    rules={branchFormValidation.name}
                    showCount
                    maxCountNumber={250}
                />
                <SwitchItem form={form} setIsEnableEdit={setIsEnableEdit} dataBranch={dataBranch} />
            </div>
            <Form.Item
                name="address"
                className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                label={<p className="mb-1 font-semibold">{i18n.t('Địa chỉ')}</p>}
                rules={branchFormValidation.address}
            >
                <TextArea rows={2} showCount maxLength={500} />
            </Form.Item>
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="representative"
                    label={<p className="mb-1 font-semibold">{i18n.t('Người đại diện')}</p>}
                    showCount
                    maxCountNumber={40}
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="shortName"
                    label={<p className="mb-1 font-semibold">{i18n.t('Tên ngắn')}</p>}
                    showCount
                    maxCountNumber={250}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    label={<p className="mb-1 font-semibold">{i18n.t('Số điện thoại')}</p>}
                    name={'phoneNumber'}
                    rules={branchFormValidation.phoneNumber}
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="taxCode"
                    label={<p className="mb-1 font-semibold">{i18n.t('Mã số thuế')}</p>}
                    showCount
                    maxCountNumber={20}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="email"
                    label={<p className="mb-1 font-semibold">{i18n.t('Email')}</p>}
                    rules={branchFormValidation.email}
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="bankAccount"
                    label={<p className="mb-1 font-semibold">{i18n.t('Số tài khoản')}</p>}
                    showCount
                    maxCountNumber={20}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="website"
                    label={<p className="mb-1 font-semibold">{i18n.t('Website')}</p>}
                    showCount
                    maxCountNumber={100}
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="bankName"
                    label={<p className="mb-1 font-semibold">{i18n.t('Tên ngân hàng (chi nhánh)')}</p>}
                    showCount
                    maxCountNumber={250}
                />
            </div>
            <Form.Item
                name="description"
                className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                label={<p className="mb-1 font-semibold">{i18n.t('Ghi chú')}</p>}
            >
                <TextArea rows={5} showCount maxLength={500} />
            </Form.Item>
        </div>
    );
};
