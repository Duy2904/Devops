import { Button, Tooltip } from 'antd';

import { Color } from '../../ui/Color/CustomColor';
import { FileSyncOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import i18n from '@src/i18n';

interface RequestRefundSoBtnProps {
    onClick?: () => void;
    disabled?: boolean;
}

export const RequestRefundSoBtn: React.FC<RequestRefundSoBtnProps> = props => {
    const { onClick, disabled } = props;

    return (
        <Tooltip placement="top" title={i18n.t('Gửi hoàn')}>
            <Button
                className={clsx(
                    'flex items-center justify-center !w-7 !h-7 cursor-pointer transition-all ease-in-out hover:opacity-80 hover:!bg-[#3E6DDA] hover:!text-white rounded-md border-none text-white',
                    Color.bg_3E6DDA,
                )}
                icon={<FileSyncOutlined />}
                onClick={onClick}
                disabled={disabled}
            ></Button>
        </Tooltip>
    );
};
