import { InputSearch } from '@components/customizes/SearchBox/InputSearch';
import { StatusSearch } from '@components/customizes/SearchBox/StatusSearch';
import { ActiveStatus } from '@sdk/tour-operations';
import { RoleType } from '@src/types/TypeEnum';
import { MyPermissions } from '@utils/Permissions';
import { AgentAutoComplete } from '@src/new/components/customs/AutoComplete/AgentAutoComplete';
import Can from '@components/common/Can';
import i18n from '@src/i18n';
import SearchBlock from '@components/common/SearchBlock';

const listSelect = Object.keys(ActiveStatus)?.map(item => ({
    value: item,
    label: i18n.t('roleStatus.' + item),
}));

interface SearchListProps {
    type: RoleType;
}

export const SearchList: React.FC<SearchListProps> = props => {
    const { type } = props;

    return (
        <SearchBlock>
            <Can permissions={[MyPermissions.OwnerRoleView, MyPermissions.AgentRoleView]}>
                <div className="w-full grid grid-cols-12 gap-4">
                    {/* Company only */}
                    {type === RoleType.Agent && (
                        <AgentAutoComplete
                            className="w-full col-span-6 md:col-span-3"
                            title="Đại lý"
                            placeholder="--Tất cả--"
                        />
                    )}
                    <StatusSearch
                        className="w-full col-span-6 md:col-span-3"
                        title="Tình trạng"
                        placeholderContent="--Tất cả--"
                        showTitle
                        listStatus={listSelect ?? []}
                    />
                    <InputSearch
                        className="w-full col-span-6 md:col-span-3"
                        title="Từ khóa"
                        placeholderContent={i18n.t('Nhập quyền hạn')}
                        showTitle
                    />
                </div>
            </Can>
        </SearchBlock>
    );
};
