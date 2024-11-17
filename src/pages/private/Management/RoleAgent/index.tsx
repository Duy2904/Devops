import { RoleList } from '@fragments/Management/Role/RoleList';
import { RoleType } from '@src/types/TypeEnum';

export const RoleAgentListPage: React.FC = () => {
    return <RoleList type={RoleType.Agent} />;
};
