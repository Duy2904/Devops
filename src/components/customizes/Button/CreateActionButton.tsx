import { Button, Flex } from 'antd';

import Can from '@components/common/Can';
import { PlusOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';

interface CreateActionButtonProps {
    title?: string;
    handleAdd?: () => void;
    permissions?: string[];
}

export const CreateActionButton: React.FC<CreateActionButtonProps> = props => {
    return (
        <Flex className="my-4" align="center" justify="space-between">
            <p className="text-sm font-medium">{props.title}</p>
            {props.permissions ? (
                <Can permissions={props.permissions}>
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
                </Can>
            ) : (
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
            )}
        </Flex>
    );
};
