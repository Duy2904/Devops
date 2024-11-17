import { Button, Tooltip } from 'antd';

import { CheckOutlined } from '@ant-design/icons';
import { Color } from '../../ui/Color/CustomColor';
import clsx from 'clsx';
import i18n from '@src/i18n';

interface ApproveBtnProps {
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    isSmall?: boolean;
}

export const ApproveBtn: React.FC<ApproveBtnProps> = props => {
    const { onClick, disabled, loading, isSmall } = props;

    if (isSmall) {
        return (
            <Tooltip placement="top" title={i18n.t('Xác nhận')}>
                <Button
                    className={clsx(
                        'flex items-center justify-center !w-7 !h-7 cursor-pointer transition-all ease-in-out hover:opacity-80 hover:!bg-[#E67E22] hover:!text-white rounded-md border-none text-white',
                        Color.bg_E67E22,
                    )}
                    icon={<CheckOutlined />}
                    onClick={onClick}
                    disabled={disabled}
                    loading={loading}
                ></Button>
            </Tooltip>
        );
    }

    return (
        <Button
            onClick={onClick}
            className={clsx(
                'flex items-center justify-center !h-7 cursor-pointer transition-all ease-in-out hover:opacity-80 hover:!bg-[#E67E22] hover:!text-white rounded-md border-none text-white',
                Color.bg_E67E22,
            )}
            icon={<CheckOutlined />}
            disabled={disabled}
            loading={loading}
        >
            {i18n.t('Xác nhận')}
        </Button>
    );
};
