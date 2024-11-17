import { Form, FormInstance, Switch } from 'antd';
import modal from 'antd/es/modal';
import { useParams } from 'react-router-dom';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { useGetRole } from '@fragments/Management/Role/hooks/queries';

interface SwitchActiveProps {
    form: FormInstance;
    checkFirstTimeEdit: () => void;
}

export const SwitchActive: React.FC<SwitchActiveProps> = props => {
    const { form, checkFirstTimeEdit } = props;
    const { roleId } = useParams<string>();
    const { data } = useGetRole(roleId ?? '');
    const dataFormWatch = Form.useWatch('isActive', form);

    const handleDeActive = () => {
        form.setFieldValue('isActive', false);
    };

    const handleToogleSwitch = () => {
        checkFirstTimeEdit();

        if (data?.isActive && dataFormWatch) {
            if (data?.hasAccount) {
                modal.error({
                    title: `Quyền ${data?.name} đã được sử dụng cho tài khoản đăng nhập. Không được hủy kích hoạt!`,
                    icon: <ExclamationCircleOutlined />,
                    okText: 'Quay lại',
                });
            } else {
                modal.confirm({
                    title: `Bạn muốn hủy kích hoạt quyền ${data?.name} ?`,
                    icon: <ExclamationCircleOutlined />,
                    okText: `Hủy kích hoạt`,
                    cancelText: 'Quay lại',
                    onOk: handleDeActive,
                });
            }
        } else {
            form.setFieldValue('isActive', !dataFormWatch);
        }
    };

    return (
        <>
            <BaseInput isForm isHidden name="isActive" />
            <div>
                <p className="mb-1 font-semibold">Kích hoạt</p>
                <Switch size="default" onClick={handleToogleSwitch} checked={dataFormWatch} />
            </div>
        </>
    );
};
