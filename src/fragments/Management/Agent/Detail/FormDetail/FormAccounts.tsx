import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import { StaticTag } from '@components/customizes/StaticTag';
import { GridTableComponent } from '@components/ui/GridTable';
import { useGetAccountsSearch } from '@fragments/Management/User/Hooks/queries';
import { AccountDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { setAccountStatusColor } from '@utils/colorStatus';

interface FormAccountsProps {
    groupId?: string;
}

export const FormAccounts: React.FC<FormAccountsProps> = props => {
    const { groupId } = props;

    const { data: fetchAccounts, isLoading } = useGetAccountsSearch({
        isMineData: true,
        groupId: groupId,
    });

    const commonTable: ColumnsType<AccountDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 35,
            align: 'center',
            render: (_, _record, index: number) => <>{index + 1}</>,
        },
        {
            title: i18n.t('Email đăng nhập'),
            dataIndex: 'email',
            key: 'email',
            width: 150,
            render: (value: string, record: AccountDto) => (
                <Link className="font-medium" to={`${rootPaths.userForm}/${record.id}`}>
                    {value}
                </Link>
            ),
        },
        {
            title: i18n.t('Họ và tên'),
            dataIndex: 'fullName',
            key: 'fullName',
            width: 150,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Quyền hạn'),
            dataIndex: 'roleName',
            key: 'roleName',
            width: 100,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Điện thoại'),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 100,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Tình trạng'),
            dataIndex: 'status',
            key: 'Status',
            width: 100,
            render: value => (
                <StaticTag type={i18n.t(`accountStatus.${value}`)} color={`${setAccountStatusColor(value)}`} />
            ),
        },
    ];

    return (
        <GridTableComponent
            isHideSelectColumn
            isHidePagination
            columns={commonTable}
            tableParams={{}}
            dataSource={fetchAccounts?.data ?? []}
            bordered={true}
            loading={isLoading}
        />
    );
};
