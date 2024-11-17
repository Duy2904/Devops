import { Flex, Form, FormInstance } from 'antd';
import { useCallback, useEffect } from 'react';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { useGenCodeRefund } from '@src/new/fragments/RefundVoucher/hooks/useRefundDetail';

interface ReceivableVoucherCodeProps {
    form: FormInstance;
    refundId: string;
}

export const RefundCode: React.FC<ReceivableVoucherCodeProps> = props => {
    const { form, refundId } = props;
    const { t } = useTranslation();

    const { mutateAsync: genCodeRefund } = useGenCodeRefund();
    const voucherNoForm = Form.useWatch('voucherNo', form);

    const handleGenCode = useCallback(async () => {
        const codeGen = await genCodeRefund();
        form.setFieldValue('voucherNo', codeGen);
    }, [form, genCodeRefund]);

    useEffect(() => {
        if (isEmpty(voucherNoForm) && isEmpty(refundId)) {
            handleGenCode();
        }
    }, [handleGenCode, refundId, voucherNoForm]);

    return (
        <>
            <BaseInput
                isForm
                isHidden
                name="voucherNo"
            />
            <Flex className='col-span-2' align='center' justify='space-between'>
                <p className='flex items-start'><span className='text-red-500 text-[10px] pr-1'>*</span>{t('Mã phiếu hoàn')}</p>
                <p className='font-bold text-sm'>{form.getFieldValue('voucherNo')}</p>
            </Flex>
        </>

    );
};
