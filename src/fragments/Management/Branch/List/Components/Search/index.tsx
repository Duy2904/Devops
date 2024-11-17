import SearchBlock from '@components/common/SearchBlock';
import { InputSearch } from '@components/customizes/SearchBox/InputSearch';
import { StatusSearch } from '@components/customizes/SearchBox/StatusSearch';
import { useFetchBranchStates } from '@hooks/identity-next/queries/useBranch';

export const SearchBranchesManagement: React.FC = () => {
    const { data: dataBranchState } = useFetchBranchStates();
    return (
        <SearchBlock>
            <div className="w-full grid grid-cols-12 gap-4 relative">
                <StatusSearch
                    className="w-full col-span-6 md:col-span-3"
                    title="Tình trạng"
                    placeholderContent="--Tất cả--"
                    showTitle
                    listStatus={dataBranchState ?? []}
                />
                <InputSearch
                    className="w-full col-span-6 md:col-span-4"
                    title="Tìm kiếm"
                    placeholderContent="Nhập tên chi nhánh"
                    showTitle
                />
            </div>
        </SearchBlock>
    );
};
