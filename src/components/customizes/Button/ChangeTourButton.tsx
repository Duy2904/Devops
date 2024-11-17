import { Flex, Tooltip } from 'antd';
import clsx from 'clsx';

import { RetweetOutlined } from '@ant-design/icons';

interface ChangeTourButtonProps {
    tooltip?: string;
    onClick?: () => void;
    isNew?: boolean;
}

export const ChangeTourButton = (props: ChangeTourButtonProps) => {
    return (
        <Tooltip placement="top" title={props.tooltip}>
            <Flex
                onClick={props.onClick}
                onKeyDown={props.onClick}
                className={clsx(
                    'flex items-center justify-center !w-7 !h-7 cursor-pointer font-bold transition-all ease-in-out',
                    props.isNew
                        ? 'text-white bg-supportColor-third hover:opacity-80 rounded-md'
                        : 'bg-blue-600/10 rounded-sm text-blue-700 hover:bg-blue-600 hover:text-white',
                )}
            >
                <RetweetOutlined />
            </Flex>
        </Tooltip>
    );
};
