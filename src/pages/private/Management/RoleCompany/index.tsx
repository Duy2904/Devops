import { RoleList } from '@fragments/Management/Role/RoleList';
import { RoleType } from '@src/types/TypeEnum';

export const RoleCompanyListPage: React.FC = () => {
    return <RoleList type={RoleType.Company} />;
};
