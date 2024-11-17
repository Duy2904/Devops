import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { LiteAgentDto, SearchBranchesRequest } from '@sdk/identity-next/models';

import Can from '@components/common/Can';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { Flex } from 'antd';
import { GridTableComponent } from '@components/ui/GridTable';
import { Link } from 'react-router-dom';
import { MyPermissions } from '@utils/Permissions';
import { StaticTag } from '@components/customizes/StaticTag';
import i18n from '@src/i18n';
import { numberSTT } from '@utils/filterSearch';
import { rootPaths } from '@src/routers/route';
import { setBranchStatusColor } from '@utils/colorStatus';
import { useDeleteBranch } from '@hooks/identity-next/mutates/useBranch';
import { useFetchBranchs } from '@hooks/identity-next/queries/useBranch';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useSearchTableStore } from '@store/searchTableStore';

export const TableDataBranchesManagement: React.FC = () => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const isPermission = useHasAnyPermission([MyPermissions.BranchView]);

    const { data: fetchBranchs, isLoading } = useFetchBranchs(tableParams);
    const { mutateAsync: deleteBranch } = useDeleteBranch();

    const branchsArr: LiteAgentDto[] = fetchBranchs?.data ?? [];
    if (tableParams.pagination) {
        tableParams.pagination.total = fetchBranchs?.totalCount;
    }

    const columns: ColumnsType<LiteAgentDto> = [
        {
            title: '#',
            width: 40,
            align: 'center',
            render: (_, _record: LiteAgentDto, index: number) => <>{numberSTT(index, tableParams)}</>,
        },
        {
            title: i18n.t('Tên chi nhánh'),
            dataIndex: 'name',
            key: 'Name',
            width: 250,
            sorter: true,
            render: (value: string, record: LiteAgentDto) => (
                <Link className="font-medium" to={isPermission ? `${rootPaths.branchForm}/${record.id}` : '#'}>
                    {value}
                </Link>
            ),
        },
        {
            title: i18n.t('Người đại diện'),
            dataIndex: 'representative',
            key: 'Representative',
            width: 200,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Số điện thoại'),
            dataIndex: 'phoneNumber',
            key: 'PhoneNumber',
            width: 170,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Email'),
            dataIndex: 'email',
            key: 'Email',
            width: 200,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Địa chỉ'),
            dataIndex: 'address',
            key: 'Address',
            width: 250,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Tình trạng'),
            dataIndex: 'branchState',
            key: 'BranchState',
            width: 150,
            render: value => (
                <StaticTag type={i18n.t(`branchStatus.${value}`)} color={`${setBranchStatusColor(value)}`} />
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 75,
            render: (_, record: LiteAgentDto) => (
                <>
                    {!record.isActive && !record.inUse && (
                        <Flex className="gap-2" justify="center">
                            <Can permissions={[MyPermissions.BranchDelete]}>
                                <DeleteButton
                                    titleName={i18n.t('menu.branch')}
                                    content={`Tên ${i18n.t('menu.branch')}: ${record.name}`}
                                    onOk={async () => {
                                        await deleteBranch(record.id!);
                                    }}
                                />
                            </Can>
                        </Flex>
                    )}
                </>
            ),
        },
    ];

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SearchBranchesRequest> | SorterResult<SearchBranchesRequest>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
            sorter,
        });
    };

    return (
        <GridTableComponent
            isHideSelectColumn
            columns={columns}
            tableParams={tableParams}
            dataSource={branchsArr}
            onChange={handleTableChange}
            bordered={true}
            loading={isLoading}
            scrollX={1200}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            showReport={true}
            tableName={i18n.t('menu.branch')}
        />
    );
};
