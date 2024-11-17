import { Flex, Tooltip } from 'antd';
import clsx from 'clsx';

import { FileAddOutlined, SnippetsOutlined } from '@ant-design/icons';

interface DocumentReceiptVisaButtonProps {
    tooltip?: string;
    onClick?: () => void;
    isLoading?: boolean;
    isNew?: boolean;
}

export const DocumentReceiptVisaButton: React.FC<DocumentReceiptVisaButtonProps> = props => {
    return (
        <Tooltip placement="top" title={props.tooltip}>
            <Flex
                className={clsx(
                    'flex items-center justify-center !w-7 !h-7 cursor-pointer font-bold border-none transition-all ease-in-out',
                    props.isNew
                        ? 'text-white bg-supportColor-first hover:opacity-80 rounded-md'
                        : 'bg-yellow-600/10 rounded-sm text-yellow-700 hover:!bg-yellow-600 hover:!text-white',
                )}
                onClick={props.onClick}
            >
                {props.isNew ? <FileAddOutlined className="!text-sm" /> : <SnippetsOutlined className="!text-sm" />}
            </Flex>
        </Tooltip>
    );
};
