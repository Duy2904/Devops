import { Flex, Tooltip } from 'antd';
import modal from 'antd/es/modal';
import clsx from 'clsx';
import { ReactEventHandler } from 'react';

import { ExclamationCircleOutlined, StopOutlined } from '@ant-design/icons';

interface CancelButtonProps {
    titleName?: string;
    content?: string;
    onOk?: ReactEventHandler;
    disabled?: boolean;
    isOnClick?: boolean;
    onClick?: ReactEventHandler;
    tooltip?: string;
    isNew?: boolean;
}

export const CancelButton = (props: CancelButtonProps) => {
    const handleCancelTable = () => {
        modal.confirm({
            title: `Bạn muốn huỷ ${props.titleName} ?`,
            icon: <ExclamationCircleOutlined />,
            content: props.content,
            okText: `Huỷ ${props.titleName}`,
            cancelText: 'Quay lại',
            onOk: props.onOk,
        });
    };

    return (
        <Tooltip placement="top" title={props.tooltip}>
            <Flex
                className={clsx(
                    `flex items-center justify-center !w-7 !h-7 cursor-pointer font-bold border-none transition-all ease-in-out`,
                    props.disabled && 'hidden',
                    props.isNew
                        ? 'text-white bg-[#FF1800] hover:opacity-80 rounded-md'
                        : 'bg-yellow-600/10 rounded-sm text-yellow-600 hover:!bg-yellow-600 hover:!text-white',
                )}
                onClick={() => (props.isOnClick ? props.onClick : handleCancelTable())}
            >
                <StopOutlined className="!text-sm" />
            </Flex>
        </Tooltip>
    );
};
