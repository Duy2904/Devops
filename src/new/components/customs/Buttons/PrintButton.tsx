import { Button, Tooltip } from 'antd';
import clsx from 'clsx';

import { PrinterOutlined } from '@ant-design/icons';

interface PrintButtonProps {
    tooltip?: string;
    onClick?: () => void;
    isLoading?: boolean;
}

export const PrintButton: React.FC<PrintButtonProps> = props => {
    return (
        <Tooltip placement="top" title={props.tooltip}>
            <Button
                className={clsx(
                    '!w-7 !h-7 border-none !text-white !bg-supportColor-fourth hover:!opacity-80 rounded-md',
                )}
                onClick={props.onClick}
                loading={props.isLoading}
                icon={<PrinterOutlined className="!text-sm" />}
            />
        </Tooltip>
    );
};
