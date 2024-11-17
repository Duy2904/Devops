import { Button } from 'antd';
import modal from 'antd/es/modal';
import { ReactEventHandler } from 'react';

import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

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
        <Button
            className={`${
                props.disabled && '!hidden'
            } flex items-center justify-center !w-7 !h-7 bg-red-600/10 rounded-sm cursor-pointer text-red-600 font-bold hover:!bg-red-600 hover:!text-white border-none transition-all ease-in-out`}
            icon={<DeleteOutlined className="!text-sm" />}
            onClick={() => (props.isOnClick ? props.onClick : handleRemoveTable())}
        ></Button>
    );
};
