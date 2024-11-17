import { Button, Flex } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';

interface ButtonAddRowProps {
    title?: string;
    handleAdd?: () => void;
}

export const ButtonAddRow: React.FC<ButtonAddRowProps> = props => {
    return (
        <Flex className="my-4" align="center" justify="space-between">
            <p className="text-sm font-medium">{props.title}</p>
            <Button
                className="flex items-center justify-center"
                size="small"
                onClick={props.handleAdd}
                onKeyDown={props.handleAdd}
            >
                <p className="text-xs">
                    <PlusOutlined />
                    <span className="pl-2">{i18n.t('action.create')}</span>
                </p>
            </Button>
        </Flex>
    );
};
