import { Flex, Form, FormInstance } from 'antd';
import { useCallback, useEffect } from 'react';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import isEmpty from 'lodash/isEmpty';
import { useGenCodeReceivable } from '@src/new/fragments/ReceivableVoucher/hooks/useRCDetail';
import { useTranslation } from 'react-i18next';

interface ReceivableVoucherCodeProps {
    form: FormInstance;
    recId: string;
}

export const ReceivableVoucherCode: React.FC<ReceivableVoucherCodeProps> = props => {
    const { form, recId } = props;
    const { t } = useTranslation();

    const { mutateAsync: genCodeReceivable } = useGenCodeReceivable();
    const voucherNoForm = Form.useWatch('voucherNo', form);

    const handleGenCode = useCallback(async () => {
        const codeGen = await genCodeReceivable();
        form.setFieldValue('voucherNo', codeGen);
    }, [form, genCodeReceivable]);

    useEffect(() => {
        if (isEmpty(voucherNoForm) && isEmpty(recId)) {
            handleGenCode();
        }
    }, [handleGenCode, recId, voucherNoForm]);

    return (
        <>
            <BaseInput
                isForm
                isHidden
                name="voucherNo"
            />
            <Flex className='col-span-2' align='center' justify='space-between'>
                <p className='flex items-start'><span className='text-red-500 text-[10px] pr-1'>*</span>{t('Mã phiếu thu')}</p>
                <p className='font-bold text-sm'>{form.getFieldValue('voucherNo')}</p>
            </Flex>
        </>

    );
};
