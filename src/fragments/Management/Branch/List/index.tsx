import { BranchesManagementHeader } from './Components/Header';
import { Col } from 'antd';
import { SearchBranchesManagement } from './Components/Search';
import { TableDataBranchesManagement } from './Components/TableData';

export const BranchesManagementIndex: React.FC = () => {
    return (
        <Col className="h-full">
            <BranchesManagementHeader />
            <Col className="h-[calc(100vh_-_143px)] overflow-auto">
                <SearchBranchesManagement />
                <TableDataBranchesManagement />
            </Col>
        </Col>
    );
};
