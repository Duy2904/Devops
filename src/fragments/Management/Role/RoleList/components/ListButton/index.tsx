import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import Can from '@components/common/Can';
import { getURLFormNavigate } from '@fragments/Management/Role/features';
import i18n from '@src/i18n';
import { RoleType } from '@src/types/TypeEnum';
import { MyPermissions } from '@utils/Permissions/index.ts';

interface ListButtonProps {
    type: RoleType;
}

export const ListButton: React.FC<ListButtonProps> = props => {
    const { type } = props;

    const navigate = useNavigate();

    // Store

    const handleAddNew = () => {
        navigate(getURLFormNavigate(type));
    };

    const needPermissions =
        type === RoleType.Company ? [MyPermissions.OwnerRoleCreate] : [MyPermissions.AgentRoleCreate];

    return (
        <Flex gap={12}>
            <Can permissions={needPermissions}>
                <Button className="text-xs" type="primary" onClick={handleAddNew} icon={<PlusOutlined />}>
                    {i18n.t('action.create')}
                </Button>
            </Can>
        </Flex>
    );
};
