import { SaveOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance } from 'antd';
import { useEffect, useState } from 'react';

export const SubmitButton = ({ form, name }: { form: FormInstance; name: string }) => {
    const [submittable, setSubmittable] = useState(true);
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [form, values]);

    return (
        <Button form={name} type="primary" htmlType="submit" disabled={!submittable} icon={<SaveOutlined />}>
            Lưu & Tiếp tục
        </Button>
    );
};
