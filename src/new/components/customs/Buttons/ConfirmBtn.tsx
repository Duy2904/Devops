import { Button, Tooltip } from 'antd';
import clsx from 'clsx';

import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';

import { Color } from '../../ui/Color/CustomColor';

interface ConfirmBtnProps {
    onClick?: () => void;
    disabled?: boolean;
    isSmall?: boolean;
}

export const ConfirmBtn: React.FC<ConfirmBtnProps> = props => {
    const { onClick, disabled, isSmall } = props;

    if (isSmall) {
        return (
            <Tooltip placement="top" title={i18n.t('Xác nhận')}>
                <Button
                    className={clsx(
                        'flex items-center justify-center !w-7 !h-7 cursor-pointer font-bold transition-all ease-in-out text-white hover:!text-white hover:!bg-[#E67E22] hover:opacity-80 rounded-md',
                        Color.bg_E67E22,
                    )}
                    onClick={props.onClick}
                    icon={<CheckOutlined />}
                />
            </Tooltip>
        );
    }

    return (
        <Button
            onClick={onClick}
            className={clsx(
                `!h-7 text-xs hover:opacity-80 hover:!bg-[#C1DA6C] hover:!text-[#000000] border-none`,
                Color.text_black_88,
                Color.bg_C1DA6C,
            )}
            icon={<PlusOutlined />}
            disabled={disabled}
        >
            {i18n.t('Xác nhận')}
        </Button>
    );
};
