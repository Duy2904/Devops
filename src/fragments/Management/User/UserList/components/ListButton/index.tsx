import { Button } from 'antd';
import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PlusOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useNavigate } from 'react-router-dom';

export interface ListButtonProps {
    isOwner?: boolean;
}

export const ListButton: React.FC<ListButtonProps> = props => {
    const { isOwner } = props;
    const permissionTemp = isOwner ? MyPermissions.OwnerAccountCreate : MyPermissions.AgentAccountCreate;
    const navigate = useNavigate();

    const handleAddNew = () => {
        navigate(isOwner ? rootPaths.userOwnerForm : rootPaths.userForm);
    };

    return (
        <Can permissions={[permissionTemp]}>
            <Button className="text-xs" type="primary" onClick={handleAddNew} icon={<PlusOutlined />}>
                {i18n.t('action.create')}
            </Button>
        </Can>
    );
};
