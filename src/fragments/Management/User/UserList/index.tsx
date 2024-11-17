import { Col } from 'antd';
import { Header } from './components/Header';
import { SearchList } from './components/Search';
import { TableList } from './components/Table';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';

export interface UserListProps {
    isOwner?: boolean;
}

export const UserList: React.FC<UserListProps> = props => {
    const { isOwner } = props;
    const { data: fetchPersonalInfo } = useFetchPersonalIdentityInfo();

    return (
        <Col>
            <Header isOwner={isOwner} />
            <Col className="h-[calc(100vh_-_143px)] overflow-auto">
                <SearchList isOwner={isOwner} isGlobal={fetchPersonalInfo?.isGlobal ?? false} />
                <TableList isOwner={isOwner} isGlobal={fetchPersonalInfo?.isGlobal ?? false} />
            </Col>
        </Col>
    );
};
