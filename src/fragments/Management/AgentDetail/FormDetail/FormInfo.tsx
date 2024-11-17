import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import i18n from '@src/i18n';
import { AppConfig } from '@utils/config';

export const FormInfo: React.FC = () => {
    return (
        <div>
            <BaseInput isForm isHidden type="text" name="id" />
            {/* Mã đại lý - Mã hệ thống */}
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="code"
                    label={<p className="mb-1 font-semibold">Mã đại lý</p>}
                    disable
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="systemId"
                    label={<p className="mb-1 font-semibold">Mã hệ thống</p>}
                    disable
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
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="shortName"
                    label={<p className="mb-1 font-semibold">Tên ngắn</p>}
                />
            </div>

            {/* Địa chỉ */}
            <Form.Item
                name="address"
                className="col-span-4 md:col-span-2 lg:col-span-1"
                label={<p className="mb-1 font-semibold">Địa chỉ</p>}
                rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
            >
                <TextArea rows={2} />
            </Form.Item>

            {/* Hiệu lực hợp đồng - Mã số thuế */}
            <div className="grid grid-cols-2 gap-x-4">
                <div>
                    <p className="mb-2 font-semibold">Hiệu lực hợp đồng</p>
                    <div className="grid grid-cols-2 gap-4">
                        <BaseDatePicker
                            name="effectiveDate"
                            className="col-span-2 lg:col-span-1"
                            format="date"
                            disabled
                        />
                        <BaseDatePicker
                            name="expirationDate"
                            className="col-span-2 lg:col-span-1"
                            format="date"
                            disabled
                        />
                    </div>
                </div>
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="taxCode"
                    label={<p className="mb-1 font-semibold">Mã số thuế</p>}
                />
            </div>

            {/* Người đại diện - Số tài khoản */}
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="representative"
                    label={<p className="mb-1 font-semibold">Người đại diện</p>}
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="bankAccount"
                    label={<p className="mb-1 font-semibold">Số tài khoản</p>}
                />
            </div>

            {/* Số điện thoại - Tên ngân hàng */}
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
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="bankName"
                    label={<p className="mb-1 font-semibold">Tên ngân hàng (chi nhánh)</p>}
                />
            </div>

            {/* Email - Website */}
            <div className="grid grid-cols-2 gap-x-4">
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="email"
                    label={<p className="mb-1 font-semibold">Email</p>}
                    disable
                />
                <BaseInput
                    isForm
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    name="website"
                    label={<p className="mb-1 font-semibold">Website</p>}
                />
            </div>

            <Form.Item
                name="description"
                className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                label={<p className="mb-1 font-semibold">Ghi chú</p>}
            >
                <TextArea rows={2} />
            </Form.Item>
        </div>
    );
};
