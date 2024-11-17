import { Form, FormInstance } from 'antd';
import { useCallback, useEffect } from 'react';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useGenCodeDocumentReceipt } from '../../hook/useDocumentReceiptVisa';

interface GenCodeProps {
    form: FormInstance;
    documentReceiptId: string;
}

export const GenCode: React.FC<GenCodeProps> = props => {
    const { form, documentReceiptId } = props;
    const { mutateAsync: genCodeReceivable } = useGenCodeDocumentReceipt();
    const codeForm = Form.useWatch('code', form);

    const handleGenCode = useCallback(async () => {
        const codeGen = await genCodeReceivable();
        form.setFieldValue('code', codeGen);
    }, [form, genCodeReceivable]);

    useEffect(() => {
        if (isEmpty(codeForm) && isEmpty(documentReceiptId)) {
            handleGenCode();
        }
    }, [handleGenCode, documentReceiptId, codeForm]);

    return (
        <BaseInput
            isForm
            label={i18n.t('Mã biên nhận')}
            className="w-full lg:w-1/3"
            name="code"
            rules={[{ required: true, message: 'Hãy tạo mã biên nhận' }]}
            placeholder="Generate Mã"
            disable
        />
    );
};
