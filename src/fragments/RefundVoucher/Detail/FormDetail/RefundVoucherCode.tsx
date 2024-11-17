import { Form, FormInstance } from 'antd';
import { useCallback, useEffect } from 'react';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import isEmpty from 'lodash/isEmpty';
import { useGenCodeRefund } from '@fragments/RefundVoucher/hook/useRefundVoucher';

interface RefundVoucherCodeProps {
    form: FormInstance;
    refundId: string;
}

export const RefundVoucherCode: React.FC<RefundVoucherCodeProps> = props => {
    const { form, refundId } = props;
    const { mutateAsync: genCodeReceivable } = useGenCodeRefund();
    const voucherNoForm = Form.useWatch('voucherNo', form);

    const handleGenCode = useCallback(async () => {
        const codeGen = await genCodeReceivable();
        form.setFieldValue('voucherNo', codeGen);
    }, [form, genCodeReceivable]);

    useEffect(() => {
        if (isEmpty(voucherNoForm) && isEmpty(refundId)) {
            handleGenCode();
        }
    }, [handleGenCode, refundId, voucherNoForm]);

    return (
        <BaseInput
            isForm
            label="Mã Phiếu hoàn"
            className="col-span-2 lg:col-span-1"
            name="voucherNo"
            rules={[{ required: true, message: 'Hãy tạo mã Phiếu hoàn' }]}
            placeholder="Generate Mã"
            disable
        />
    );
};
