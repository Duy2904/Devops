import { Button, Tooltip } from 'antd';
import clsx from 'clsx';

import { CopyOutlined } from '@ant-design/icons';

interface CloneButtonProps {
    tooltip?: string;
    onClick?: () => void;
}

export const CloneButton = (props: CloneButtonProps) => {
    return (
        <Tooltip placement="top" title={props.tooltip}>
            <Button
                onClick={props.onClick}
                onKeyDown={props.onClick}
                className={clsx(
                    'flex items-center justify-center !w-7 !h-7 cursor-pointer font-bold transition-all ease-in-out text-white bg-supportColor-third hover:!text-white hover:!bg-supportColor-third hover:opacity-80 rounded-md',
                )}
                icon={<CopyOutlined />}
            />
        </Tooltip>
    );
};
