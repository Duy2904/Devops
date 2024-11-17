import { Col } from 'antd';
import { HeaderRevenueTourFitCollab } from './Header';
import { SearchRevenueTourFitCollab } from './Search';
import { TableDataRevenueTourFitCollab } from './TableData';

const IndexRevenueTourFitCollab: React.FC = () => {
    return (
        <Col>
            <HeaderRevenueTourFitCollab />
            <Col className="overflow-auto">
                <SearchRevenueTourFitCollab />
                <TableDataRevenueTourFitCollab />
            </Col>
        </Col>
    );
};

export default IndexRevenueTourFitCollab;
