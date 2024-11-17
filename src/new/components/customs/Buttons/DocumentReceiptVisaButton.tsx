import { Button, Tooltip } from 'antd';
import clsx from 'clsx';

import { FileAddOutlined } from '@ant-design/icons';

interface DocumentReceiptVisaButtonProps {
    tooltip?: string;
    onClick?: () => void;
    isLoading?: boolean;
}

export const DocumentReceiptVisaButton: React.FC<DocumentReceiptVisaButtonProps> = props => {
    return (
        <Tooltip placement="top" title={props.tooltip}>
            <Button
                className={clsx(
                    'flex items-center justify-center !w-7 !h-7 cursor-pointer font-bold border-none transition-all ease-in-out text-white bg-supportColor-first hover:!text-white hover:!bg-supportColor-first hover:opacity-80 rounded-md',
                )}
                onClick={props.onClick}
                icon={<FileAddOutlined />}
            />
        </Tooltip>
    );
};
