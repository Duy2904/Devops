import { Flex, Tooltip } from 'antd';
import clsx from 'clsx';

import { PrinterOutlined } from '@ant-design/icons';

interface PrintButtonProps {
    tooltip?: string;
    onClick?: () => void;
    isLoading?: boolean;
    isNew?: boolean;
}

export const PrintButton: React.FC<PrintButtonProps> = props => {
    return (
        <Tooltip placement="top" title={props.tooltip}>
            <Flex
                className={clsx(
                    'flex items-center justify-center !w-7 !h-7 cursor-pointer font-bold border-none transition-all ease-in-out',
                    props.isNew
                        ? 'text-white bg-supportColor-fourth hover:opacity-80 rounded-md'
                        : 'bg-blue-600/10 rounded-sm text-blue-700 hover:!bg-blue-600 hover:!text-white',
                )}
                onClick={props.onClick}
            >
                <PrinterOutlined className="!text-sm" />
            </Flex>
        </Tooltip>
    );
};
