import SearchBlock from '@components/common/SearchBlock';
import { InputSearch } from '@components/customizes/SearchBox/InputSearch';
import { StatusSearch } from '@components/customizes/SearchBox/StatusSearch';
import { getDepartmentStatus } from '@fragments/Management/Department/hooks/queries';

import { BranchSelect } from './BranchSelect';

export const SearchDepartmentsManagement: React.FC = () => {
    const departmentStatus = getDepartmentStatus();

    return (
        <SearchBlock>
            <div className="w-full grid grid-cols-12 gap-4 relative">
                <StatusSearch
                    className="w-full col-span-6 md:col-span-2"
                    title="Tình trạng"
                    placeholderContent="--Tất cả--"
                    listStatus={departmentStatus}
                    showTitle
                />
                <BranchSelect className="w-full col-span-6 md:col-span-3" title="Chi nhánh" showTitle />
                <InputSearch
                    className="w-full col-span-6 md:col-span-4"
                    title="Tìm kiếm"
                    placeholderContent="Nhập tên bộ phận/tên bộ phận trực thuộc"
                    showTitle
                />
            </div>
        </SearchBlock>
    );
};
