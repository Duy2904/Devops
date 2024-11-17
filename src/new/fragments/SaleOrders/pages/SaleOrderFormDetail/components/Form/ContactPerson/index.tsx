import { Checkbox, Form, FormInstance } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { OrderStatus, SaleOrderDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { ContactPersonComponent } from '@src/new/components/customs/PersonContact';

interface ContactPersonProps {
    dataSO?: SaleOrderDto;
    contactPersonForm: FormInstance;
    invoiceForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
}

export const ContactPerson: React.FC<ContactPersonProps> = props => {
    const { dataSO, contactPersonForm, invoiceForm, isEnableEdit, setIsEnableEdit } = props;

    const hasInvoiceWatch = Form.useWatch('hasInvoice', invoiceForm);
    const travellerIdWatch = Form.useWatch('travellerId', contactPersonForm);

    const [disableFields, setDisableFields] = useState<string[]>([]);

    const disableInvoice = useMemo(() => !hasInvoiceWatch, [hasInvoiceWatch]);

    const handleDisableFields = useCallback(() => {
        if (!dataSO?.status) return;

        switch (dataSO?.status) {
            case OrderStatus.Confirmed:
                setDisableFields(['hasInvoice']);
                break;
            case OrderStatus.Canceled:
                setDisableFields(['hasInvoice']);
                break;
            case OrderStatus.Paid:
                setDisableFields(['hasInvoice']);
                break;
            case OrderStatus.Deposited:
                setDisableFields(['hasInvoice']);
                break;
            case OrderStatus.Confirming:
                if ((dataSO?.paymentAmt ?? 0) > 0) {
                    setDisableFields(['hasInvoice']);
                } else {
                    setDisableFields([]);
                }
                break;
            case OrderStatus.WaitRefund:
                setDisableFields(['hasInvoice']);
                break;
            case OrderStatus.SendRefund:
                setDisableFields(['hasInvoice']);
                break;
            case OrderStatus.CompletedRefund:
                setDisableFields(['hasInvoice']);
                break;
            default:
                setDisableFields([]);
                break;
        }
    }, [dataSO?.paymentAmt, dataSO?.status]);

    const handleInvoice = (e: CheckboxChangeEvent) => {
        invoiceForm.setFieldValue('hasInvoice', e.target.checked);
    };

    const onValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    useEffect(() => {
        if (travellerIdWatch && travellerIdWatch !== dataSO?.travellerId) {
            setIsEnableEdit(true);
        }
    }, [dataSO?.travellerId, setIsEnableEdit, travellerIdWatch])

    return (
        <div className="p-5">
            <Form form={contactPersonForm} onValuesChange={onValuesChange}>
                <BaseInput name={'travellerId'} isHidden isForm rules={[
                    {
                        required: true,
                    },
                ]}
                    initialValue={travellerIdWatch ?? undefined}
                />
            </Form>
            <ContactPersonComponent
                travellerId={dataSO?.travellerId ?? undefined}
                canSearch={
                    !dataSO ||
                    (dataSO &&
                        ([OrderStatus.New, OrderStatus.Confirmed, OrderStatus.Overload].includes(
                            dataSO.status!,
                        )) || (dataSO.status === OrderStatus.Confirming && dataSO.depositAmt === 0))
                }
                form={contactPersonForm}
                showCustomer={false}
                showTitle={false}
            />

            <Form form={invoiceForm} layout="vertical" onValuesChange={onValuesChange}>
                <div className="grid grid-cols-2 gap-4">
                    <BaseInput
                        isForm
                        name="description"
                        label={i18n.t('saleorder.defaultContact.note')}
                        placeholder={i18n.t('saleorder.defaultContact.noteDesc')}
                        showCount
                        maxCountNumber={500}
                    />
                </div>
                <Form.Item name="hasInvoice" className="mb-0" valuePropName="checked">
                    <Checkbox onChange={handleInvoice} disabled={disableFields.includes('hasInvoice')}>
                        Thông tin xuất hoá đơn
                    </Checkbox>
                </Form.Item>
                {hasInvoiceWatch && (
                    <div className="grid grid-cols-2 gap-x-5 mt-5">
                        <BaseInput
                            isForm
                            name="companyName"
                            label={i18n.t('saleorder.defaultContact.companyName')}
                            placeholder={i18n.t('saleorder.defaultContact.companyName')}
                            rules={[
                                {
                                    required: hasInvoiceWatch ?? false,
                                    message: i18n.t('saleorder.defaultContact.require.requireCompanyName'),
                                },
                            ]}
                            disable={disableInvoice}
                            showCount
                            maxCountNumber={250}
                        />
                        <BaseInput
                            isForm
                            name="companyTaxCode"
                            label={i18n.t('saleorder.defaultContact.companyTaxID')}
                            placeholder={i18n.t('saleorder.defaultContact.companyTaxID')}
                            rules={[
                                {
                                    required: hasInvoiceWatch ?? false,
                                    message: i18n.t('saleorder.defaultContact.require.requireCompanyTaxID'),
                                },
                            ]}
                            disable={disableInvoice}
                            showCount
                            maxCountNumber={30}
                        />
                        <BaseInput
                            isForm
                            name="companyAddress"
                            label={i18n.t('saleorder.defaultContact.companyAddress')}
                            placeholder={i18n.t('saleorder.defaultContact.companyAddress')}
                            rules={[
                                {
                                    required: hasInvoiceWatch ?? false,
                                    message: i18n.t('saleorder.defaultContact.require.requireCompanyAddress'),
                                },
                            ]}
                            disable={disableInvoice}
                            showCount
                            maxCountNumber={500}
                        />
                        <BaseInput
                            isForm
                            name="companyEmail"
                            label={i18n.t('saleorder.defaultContact.companyMail')}
                            placeholder={i18n.t('saleorder.defaultContact.companyMail')}
                            rules={[
                                {
                                    required: hasInvoiceWatch ?? false,
                                    message: i18n.t('saleorder.defaultContact.require.requireCompanyMail'),
                                },
                            ]}
                            disable={disableInvoice}
                        />
                    </div>
                )}
            </Form>
        </div>
    );
};
