import { RoleForm } from '@fragments/Management/Role/RoleForm';
import { RoleType } from '@src/types/TypeEnum';

export const RoleCompanyFormPage: React.FC = () => {
    return <RoleForm type={RoleType.Company}  />;
};
