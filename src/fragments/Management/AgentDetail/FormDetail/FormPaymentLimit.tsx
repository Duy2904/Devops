import { Col, Form, FormInstance } from 'antd';

import { AgentDto } from '@sdk/identity-next/models';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CurrenciesSelect } from '@components/customizes/Select/Currency';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { useFetchAgentPaymentLimit } from '../hooks/queries';

export interface FormPaymentLimitProps {
    form: FormInstance;
    data?: AgentDto;
}

export const FormPaymentLimit: React.FC<FormPaymentLimitProps> = props => {
    const { form, data } = props;

    const { data: fetchAgentPaymentLimit } = useFetchAgentPaymentLimit(data?.id);

    useEffect(() => {
        if (!isEmpty(fetchAgentPaymentLimit)) {
            form.setFieldsValue({ ...fetchAgentPaymentLimit });
        }
    }, [fetchAgentPaymentLimit, form]);

    return (
        <Col className="my-8">
            <Form form={form} layout="horizontal" disabled>
                <BaseInput isForm isHidden type="text" name="id" />
                <BaseInput isForm isHidden type="text" name="agentId" />
                <div className="grid grid-cols-2 gap-x-4 items-center mb-4">
                    <p>{i18n.t('tour.tourDetail.currencyType')}</p>
                    <CurrenciesSelect
                        isForm
                        className="mb-0"
                        name="currencyId"
                        initialValue={fetchAgentPaymentLimit?.currencyId ?? ''}
                    />
                </div>
                <div className="grid grid-cols-2 gap-x-4 items-center mb-4">
                    <p>{i18n.t('Thời gian thanh toán')}</p>
                    <div className="grid grid-cols-3 gap-x-2 items-center">
                        <BaseInput
                            isForm
                            className="col-span-2 mb-0"
                            type="number"
                            name="paymentTime"
                            initialValue={fetchAgentPaymentLimit?.paymentTime}
                        />
                        <p>ngày</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 items-center mb-4">
                    <p>{i18n.t('Hạn mức thanh toán')}</p>
                    <BaseInput
                        isForm
                        className="mb-0"
                        type="number"
                        name="paymentLimit"
                        initialValue={fetchAgentPaymentLimit?.paymentLimit}
                    />
                </div>
                {data?.id && (
                    <div className="grid grid-cols-2 gap-x-4 items-center mb-4">
                        <p>{i18n.t('Hạn mức còn lại')}</p>
                        <BaseInput
                            isForm
                            className="mb-0"
                            type="number"
                            name="remainingLimit"
                            initialValue={fetchAgentPaymentLimit?.remainingLimit}
                            disable
                        />
                    </div>
                )}
            </Form>
        </Col>
    );
};
