import { AgentAccountSelect } from './AgentAccountSelect';
import { BranchSelect } from './BranchSelect';
import { ContractStatusSelect } from './ContractStatusSelect';
import { InputSearch } from '@components/customizes/SearchBox/InputSearch';
import SearchBlock from '@components/common/SearchBlock';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';

export const SearchAgentsManagement: React.FC = () => {
    const { data: personInfo } = useFetchPersonalIdentityInfo();

    return (
        <SearchBlock>
            <div className="w-full grid grid-cols-12 gap-4 relative">
                <BranchSelect className="w-full col-span-6 md:col-span-2" title="Chi nhánh" showTitle />
                <ContractStatusSelect className="w-full col-span-6 md:col-span-2" title="Tình trạng HĐ" showTitle />
                <AgentAccountSelect
                    className="w-full col-span-6 md:col-span-2"
                    title="Tài khoản đại lý"
                    showTitle
                    groupId={personInfo?.groups?.[0]?.groupId ?? ''}
                />
                <InputSearch
                    className="w-full col-span-6 md:col-span-4"
                    title="Tìm kiếm"
                    placeholderContent="Nhập mã hệ thống, mã/tên đại lý"
                    showTitle
                />
            </div>
        </SearchBlock>
    );
};
