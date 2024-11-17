import { Button, Tooltip } from 'antd';

import { ShopOutlined } from '@ant-design/icons';

interface RoomListButtonProps {
    tooltip?: string;
    onClick?: () => void;
    isLoading?: boolean;
}

export const RoomListButton: React.FC<RoomListButtonProps> = props => {
    return (
        <Tooltip placement="top" title={props.tooltip}>
            <Button
                className="flex items-center justify-center !w-7 !h-7 bg-purple-600/10 rounded-sm cursor-pointer text-purple-700 font-bold border-none hover:!bg-purple-600 hover:!text-white transition-all ease-in-out"
                icon={<ShopOutlined className="!text-sm" />}
                onClick={props.onClick}
                loading={props.isLoading}
            ></Button>
        </Tooltip>
    );
};
