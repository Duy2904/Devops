import { Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import i18n from '../../../i18n';

interface AddNewButtonProps {
    onClick?: () => void;
}

export const AddNewButton = (_props: AddNewButtonProps) => {
    return (
        <Button className="text-xs" type="primary" icon={<PlusOutlined />} onClick={_props.onClick}>
            {i18n.t('action.create')}
        </Button>
    );
};
