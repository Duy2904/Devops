import { Button, Tooltip } from 'antd';
import modal from 'antd/es/modal';
import clsx from 'clsx';
import { ReactEventHandler } from 'react';

import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons';

interface DeleteButtonProps {
    titleName?: string;
    content?: string | React.ReactNode;
    onOk?: ReactEventHandler;
    disabled?: boolean;
    isOnClick?: boolean;
    onClick?: ReactEventHandler;
}

export const DeleteButton = (props: DeleteButtonProps) => {
    const handleRemoveTable = () => {
        modal.confirm({
            title: `Bạn muốn xoá ${props.titleName} ?`,
            icon: <ExclamationCircleOutlined />,
            content: props.content,
            okText: `Xoá ${props.titleName}`,
            cancelText: 'Quay lại',
            onOk: props.onOk,
        });
    };

    return (
        <Tooltip placement="top" title={'Xoá'}>
            <Button
                onClick={() => (props.isOnClick ? props.onClick : handleRemoveTable())}
                onKeyDown={() => (props.isOnClick ? props.onClick : handleRemoveTable())}
                className={clsx(
                    'flex items-center justify-center !w-7 !h-7 cursor-pointer font-bold transition-all ease-in-out rounded-md bg-[#FF4D4F]/[.1] text-[#FF4D4F] border border-solid border-[#FF4D4F] hover:!text-[#FF4D4F] hover:!bg-[#FF4D4F]/[.1] hover:opacity-80',
                )}
                icon={<DeleteFilled />}
            />
        </Tooltip>
    );
};
