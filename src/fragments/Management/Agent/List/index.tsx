import { AgentsManagementHeader } from './Components/Header';
import { Col } from 'antd';
import { SearchAgentsManagement } from './Components/Search';
import { TableDataAgentsManagement } from './Components/TableData';

export const AgentsManagementIndex: React.FC = () => {
    return (
        <Col className="h-full">
            <AgentsManagementHeader />
            <Col className="h-[calc(100vh_-_143px)] overflow-auto">
                <SearchAgentsManagement />
                <TableDataAgentsManagement />
            </Col>
        </Col>
    );
};
