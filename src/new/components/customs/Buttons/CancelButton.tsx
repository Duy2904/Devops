import { Button, Tooltip } from 'antd';
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
    isLoading?: boolean;
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
            <Button
                className={clsx(
                    `!w-7 !h-7 border-none !text-white !bg-[#FF1800] hover:!opacity-80 rounded-md`,
                    props.disabled && 'hidden',
                )}
                onClick={() => (props.isOnClick ? props.onClick : handleCancelTable())}
                loading={props.isLoading}
                icon={<StopOutlined className="!text-sm" />}
            />
        </Tooltip>
    );
};
