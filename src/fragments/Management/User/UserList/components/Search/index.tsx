import { InputSearch } from '@components/customizes/SearchBox/InputSearch';
import { StatusSearch } from '@components/customizes/SearchBox/StatusSearch';
import { getAccountStatus } from '@fragments/Management/User/Hooks/queries';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { AgentAutoComplete } from '@src/new/components/customs/AutoComplete/AgentAutoComplete';
import Can from '@components/common/Can';
import i18n from '@src/i18n';
import SearchBlock from '@components/common/SearchBlock';

import { BranchSelect } from './BranchSelect';

export interface SearchListProps {
    isOwner?: boolean;
    isGlobal?: boolean;
}

export const SearchList: React.FC<SearchListProps> = props => {
    const { isOwner, isGlobal } = props;
    const accountStatus = getAccountStatus();
    return (
        <SearchBlock>
            <Can permissions={[MyPermissions.TourView]}>
                <div className="w-full grid grid-cols-12 gap-4">
                    {isOwner && isGlobal && (
                        <BranchSelect className="w-full col-span-6 md:col-span-3" title="Chi nhánh" showTitle />
                    )}
                    {!isOwner && (
                        <AgentAutoComplete
                            className="w-full col-span-6 md:col-span-3"
                            title="Đại lý"
                            placeholder="--Tất cả--"
                        />
                    )}
                    <StatusSearch
                        className="w-full col-span-6 md:col-span-3"
                        title="Trạng thái"
                        placeholderContent="-- Tất cả --"
                        showTitle
                        listStatus={accountStatus}
                    />
                    <InputSearch
                        className="w-full col-span-6 md:col-span-3"
                        title="Từ khóa"
                        placeholderContent={i18n.t('Nhập tên tài khoản, họ tên, sđt, email')}
                        showTitle
                    />
                </div>
            </Can>
        </SearchBlock>
    );
};
