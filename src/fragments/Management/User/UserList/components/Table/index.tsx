import { Flex } from 'antd';
import { ColumnProps, ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { AccountDto, ActiveStatus, SearchAccountRequest } from '@sdk/tour-operations';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { GridTableComponent } from '@components/ui/GridTable';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { StaticTag } from '@components/customizes/StaticTag';
import { mapSearchRequest } from '@fragments/Management/User/Features';
import { numberSTT } from '@utils/filterSearch';
import { rootPaths } from '@src/routers/route';
import { setAccountStatusColor } from '@utils/colorStatus';
import { useDeleteAccount } from '@fragments/Management/User/Hooks/mutates';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useGetAccountsSearch } from '@fragments/Management/User/Hooks/queries';
import { useSearchTableStore } from '@store/searchTableStore';
import Can from '@components/common/Can';
import i18n from '@src/i18n';

export interface TableListProps {
    isOwner?: boolean;
    isGlobal?: boolean;
}

export const TableList: React.FC<TableListProps> = props => {
    const { isOwner, isGlobal } = props;

    // Store
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);
    const { data: fetchPersonalInfo } = useFetchPersonalIdentityInfo();

    // Query
    const { data: fetchAccounts, isLoading } = useGetAccountsSearch({
        ...mapSearchRequest(tableParams),
        isMineData: isOwner,
        groupId: fetchPersonalInfo?.groups?.[0]?.groupId,
    });

    // Mutate
    const { mutateAsync: deleteAccount } = useDeleteAccount();

    const accountsArr: AccountDto[] = fetchAccounts?.data ?? [];
    if (tableParams.pagination) {
        tableParams.pagination.total = fetchAccounts?.totalCount;
    }

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        _advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SearchAccountRequest> | SorterResult<SearchAccountRequest>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            sorter,
        });
    };

    const handleDeleteAccount = useCallback(
        (record: AccountDto) => async () => {
            await deleteAccount(record.id ?? '');
        },
        [deleteAccount],
    );

    const permissionDelete = useMemo(
        () => (isOwner ? [MyPermissions.OwnerAccountDelete] : [MyPermissions.AgentAccountDelete]),
        [isOwner],
    );

    const commonTable: ColumnsType<AccountDto> = [
        {
            title: '#',
            width: 40,
            align: 'center',
            render: (_, _record: AccountDto, index: number) => <>{numberSTT(index, tableParams)}</>,
        },
        {
            title: i18n.t('Email'),
            dataIndex: 'email',
            key: 'email',
            width: 200,
            sorter: true,
            render: (value: string, record: AccountDto) => (
                <Link
                    className="font-medium"
                    to={`${isOwner ? rootPaths.userOwnerForm : rootPaths.userForm}/${record.id}`}
                >
                    {value}
                </Link>
            ),
        },
        {
            title: i18n.t('Họ và tên'),
            dataIndex: 'fullName',
            key: 'fullName',
            width: 200,
            sorter: true,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Quyền hạn'),
            dataIndex: 'roleName',
            key: 'roleName',
            width: 150,
            sorter: true,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Điện thoại'),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 150,
            sorter: true,
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Trạng thái'),
            dataIndex: 'status',
            key: 'Status',
            width: 150,
            render: value => (
                <StaticTag type={i18n.t(`accountStatus.${value}`)} color={`${setAccountStatusColor(value)}`} />
            ),
        },
        {
            title: i18n.t('action.action'),
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 70,
            render: (_, record: AccountDto) => (
                <Flex className="gap-2 flex-wrap" justify="center">
                    {record.status === ActiveStatus.Pending && (
                        <Can permissions={permissionDelete}>
                            <DeleteButton
                                titleName={i18n.t('tài khoản')}
                                content={`${i18n.t('Tài khoản:')} ${record.email}`}
                                onOk={handleDeleteAccount(record)}
                            />
                        </Can>
                    )}
                </Flex>
            ),
        },
    ];

    const branchName: ColumnProps<AccountDto> = {
        title: i18n.t('Chi nhánh'),
        dataIndex: 'branchName',
        key: 'branchName',
        width: 150,
        sorter: true,
        render(value) {
            return <>{value}</>;
        },
    };

    const departmentName: ColumnProps<AccountDto> = {
        title: i18n.t('Bộ phận'),
        dataIndex: 'departmentName',
        key: 'departmentName',
        width: 150,
        render(value) {
            return <>{value}</>;
        },
    };

    const agentName: ColumnProps<AccountDto> = {
        title: i18n.t('Đại lý'),
        dataIndex: 'groupName',
        key: 'groupName',
        width: 150,
        sorter: true,
        render(value) {
            return <>{value}</>;
        },
    };

    const columnsData: ColumnsType<AccountDto> = commonTable;
    if (isOwner && isGlobal) {
        columnsData.splice(4, 0, branchName);
        columnsData.splice(5, 0, departmentName);
    } else {
        columnsData.splice(4, 0, agentName);
    }

    return (
        <GridTableComponent
            isHideSelectColumn
            columns={columnsData}
            tableParams={tableParams}
            dataSource={accountsArr}
            onChange={handleTableChange}
            bordered={true}
            loading={isLoading}
            scrollX={1200}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            showReport={true}
            tableName={i18n.t('Tài khoản')}
        />
    );
};
