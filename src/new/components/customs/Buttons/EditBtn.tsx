import { Button, Tooltip } from 'antd';

import { EditOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';

interface EditBtnProps {
    onClick?: () => void;
    isSmall?: boolean;
}

export const EditBtn: React.FC<EditBtnProps> = props => {
    const { onClick, isSmall } = props;

    if (isSmall) {
        return (
            <Tooltip placement="top" title={i18n.t('Chỉnh sửa')}>
                <Button
                    className={'flex items-center justify-center !w-7 !h-7 cursor-pointer transition-all ease-in-out'}
                    icon={<EditOutlined />}
                    onClick={props.onClick}
                ></Button>
            </Tooltip>
        );
    }

    return (
        <Button onClick={onClick} className={'!h-7 text-xs'} icon={<EditOutlined />}>
            {i18n.t('Chỉnh sửa')}
        </Button>
    );
};
