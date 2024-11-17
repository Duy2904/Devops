import { Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';

interface EditButtonProps {
    onClick?: () => void;
}

export const EditButton = (props: EditButtonProps) => {
    return (
        <Button
            className="flex items-center justify-center !w-7 !h-7 bg-green-600/10 rounded-sm cursor-pointer text-green-700 font-bold border-none hover:!bg-green-600 hover:!text-white transition-all ease-in-out"
            icon={<FormOutlined className="!text-sm" />}
            onClick={props.onClick}
        ></Button>
    );
};
