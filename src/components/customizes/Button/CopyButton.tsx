import { CopyOutlined } from '@ant-design/icons';
import { Flex, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface CopyButtonProps {
    textToCopy: string;
}

export const CopyButton = (_props: CopyButtonProps) => {
    const handleCopy = () => {
        message.success('Copied to clipboard');
    };

    return (
        <CopyToClipboard text={_props.textToCopy} onCopy={handleCopy}>
            <Flex
                justify="space-between"
                className="cursor-pointer border border-solid border-gray-300 bg-gray-100 p-2 rounded-md text-xs font-medium"
            >
                <span>{_props.textToCopy}</span> <CopyOutlined className="ml-2" />
            </Flex>
        </CopyToClipboard>
    );
};
