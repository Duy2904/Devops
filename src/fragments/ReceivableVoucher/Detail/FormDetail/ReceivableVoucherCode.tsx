import { Form, FormInstance } from 'antd';
import { useCallback, useEffect } from 'react';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import isEmpty from 'lodash/isEmpty';
import { useGenCodeReceivable } from '@fragments/ReceivableVoucher/hook/useReceivableVoucher';

interface ReceivableVoucherCodeProps {
    form: FormInstance;
    recId: string;
}

export const ReceivableVoucherCode: React.FC<ReceivableVoucherCodeProps> = props => {
    const { form, recId } = props;
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
        <BaseInput
            isForm
            label="Mã Phiếu Thu"
            className="col-span-2 lg:col-span-1"
            name="voucherNo"
            rules={[{ required: true, message: 'Hãy tạo mã Phiếu Thu' }]}
            placeholder="Generate Mã"
            disable
        />
    );
};
