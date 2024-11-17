import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

interface ViewButtonProps {
    onClick?: () => void;
}

export const ViewButton = (props: ViewButtonProps) => {
    return (
        <Button
            className="flex items-center justify-center !w-7 !h-7 bg-blue-600/10 rounded-sm cursor-pointer text-blue-700 font-bold border-none hover:!bg-blue-600 hover:!text-white transition-all ease-in-out"
            icon={<EyeOutlined className="!text-sm" />}
            onClick={props.onClick}
        ></Button>
    );
};
