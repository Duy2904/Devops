import { Col } from 'antd';
import { Header } from './components/Header';
import { RoleType } from '@src/types/TypeEnum';
import { SearchList } from './components/Search';
import { TableList } from './components/Table';

interface RoleListProps {
    type: RoleType;
}

export const RoleList: React.FC<RoleListProps> = props => {
    const { type } = props;

    return (
        <Col>
            <Header type={type} />
            <Col className="h-[calc(100vh_-_143px)] overflow-auto">
                <SearchList type={type} />
                <TableList type={type} />
            </Col>
        </Col>
    );
};
