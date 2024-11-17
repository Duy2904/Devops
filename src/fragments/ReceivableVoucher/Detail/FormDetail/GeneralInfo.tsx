import { Col, Flex, FormInstance, Skeleton } from 'antd';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CurrenciesSelect } from '@components/customizes/Select/Currency';
import { CustomersSelect } from '@components/customizes/Select/Customers';
import { PaymentMethodsSelect } from '@components/customizes/Select/PaymentMethod';
import { ReceivableVoucherCode } from './ReceivableVoucherCode';
import i18n from '@src/i18n';

interface GeneralInfoProps {
    form: FormInstance;
    recId: string;
    isLoading: boolean;
}

export const GeneralInfo: React.FC<GeneralInfoProps> = props => {
    const { form, recId, isLoading } = props;

    if (isLoading) return <Skeleton className="p-4 min-h-[350px]" paragraph={{ rows: 10 }} active></Skeleton>;

    return (
        <div className="p-4 min-h-[350px]">
            <Flex align="end">
                <BaseInput isForm isHidden name="id" />
                <CurrenciesSelect className=" hidden" name="currencyId" isForm />
            </Flex>
            <Col className="grid grid-cols-2 gap-4">
                <ReceivableVoucherCode recId={recId} form={form} />
                <CustomersSelect
                    isForm
                    className="col-span-2 lg:col-span-1"
                    name="customerId"
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                    ]}
                    label="Khách hàng"
                />
            </Col>
            <Col className="grid grid-cols-2 gap-4">
                <PaymentMethodsSelect
                    isForm
                    className="col-span-2 lg:col-span-1"
                    name="paymentMethodId"
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                    ]}
                    label="Phương thức thanh toán"
                />
                <CurrenciesSelect
                    isForm
                    className="col-span-2 lg:col-span-1"
                    name="currencyId"
                    label={i18n.t('Loại tiền')}
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                    ]}
                />
            </Col>

            <BaseInput
                isForm
                name="description"
                label="Diễn giải"
                placeholder="Thông tin mô tả"
                rules={[
                    {
                        required: true,
                        message: i18n.t('validation.default.validDefault'),
                    },
                ]}
                showCount
                maxCountNumber={500}
            />
        </div>
    );
};
