import { Col, Form, FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CurrenciesSelect } from '@components/customizes/Select/Currency';
import i18n from '@src/i18n';

import { useCreateAgentPaymentLimit, useUpdateAgentPaymentLimit } from '../../hooks/mutates';
import { useFetchAgentPaymentLimit } from '../../hooks/queries';

export interface FormPaymentLimitProps {
    form: FormInstance;
    formInfo: FormInstance;
    isHasPermissionUpdate: boolean;
    setSubmittable: Dispatch<SetStateAction<boolean>>;
}

export const FormPaymentLimit: React.FC<FormPaymentLimitProps> = props => {
    const { form, formInfo, isHasPermissionUpdate, setSubmittable } = props;
    const { agentId } = useParams<string>();

    const { data: fetchAgentPaymentLimit } = useFetchAgentPaymentLimit(agentId!);
    const { mutateAsync: createPaymentLimit } = useCreateAgentPaymentLimit();
    const { mutateAsync: updatePaymentLimit } = useUpdateAgentPaymentLimit();

    const handleOnValuesChange = () => {
        setSubmittable(true);
    };

    const handleCreate = async (values: AnyObject) => {
        const res = await createPaymentLimit({
            ...values,
            employeeId: formInfo.getFieldValue('personInChargeId'),
            bankInforId: formInfo.getFieldValue('bankInforId'),
        });

        if (res) {
            form.setFieldValue('id', res);
        }
    };

    const handleUpdate = async (values: AnyObject) => {
        await updatePaymentLimit({
            agencyId: agentId!,
            updateRequest: {
                ...values,
                employeeId: formInfo.getFieldValue('personInChargeId'),
                bankInforId: formInfo.getFieldValue('bankInforId'),
            },
        });
    };

    const onFinish = async (values: AnyObject) => {
        if (!values.id) {
            await handleCreate(values);
        } else {
            handleUpdate(values);
        }
    };

    useEffect(() => {
        if (!isEmpty(fetchAgentPaymentLimit)) {
            form.setFieldsValue({ ...fetchAgentPaymentLimit });
            formInfo.setFieldValue('personInChargeId', fetchAgentPaymentLimit?.employeeId);
        }
    }, [fetchAgentPaymentLimit, form, formInfo]);

    return (
        <Col className="my-8">
            <Form
                form={form}
                layout="horizontal"
                onFinish={onFinish}
                onValuesChange={handleOnValuesChange}
                disabled={!isHasPermissionUpdate}
            >
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
                {agentId && form.getFieldValue('id') && (
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
