import { Button, Tooltip } from 'antd';
import clsx from 'clsx';

import { PlusOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';

import { Color } from '../../ui/Color/CustomColor';

interface CreateSOFromTourProps {
    onClick?: () => void;
    disabled?: boolean;
    isSmall?: boolean;
}

export const CreateSOFromTour: React.FC<CreateSOFromTourProps> = props => {
    const { onClick, disabled, isSmall } = props;

    if (isSmall) {
        return (
            <Tooltip placement="top" title={i18n.t('action.createSO')}>
                <Button
                    className={clsx(
                        'flex items-center justify-center !w-7 !h-7 cursor-pointer transition-all ease-in-out hover:opacity-80 hover:!bg-[#C1DA6C] hover:!text-[#000000] rounded-md border-none',
                        Color.text_black_88,
                        Color.bg_C1DA6C,
                    )}
                    icon={<PlusOutlined />}
                    onClick={props.onClick}
                    disabled={disabled}
                ></Button>
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
            {i18n.t('action.createSO')}
        </Button>
    );
};
