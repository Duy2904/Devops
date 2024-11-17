import { ActiveStatus, DepartmentDto, SearchDepartmentViewDto } from '@sdk/tour-operations';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

import Can from '@components/common/Can';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { Flex } from 'antd';
import { Fragment } from 'react';
import { GridTableComponent } from '@components/ui/GridTable';
import Link from 'antd/es/typography/Link';
import { MyPermissions } from '@utils/Permissions';
import { StaticTag } from '@components/customizes/StaticTag';
import i18n from '@src/i18n';
import { numberSTT } from '@utils/filterSearch';
import { setDepartmentStatusColor } from '@utils/colorStatus';
import { useDeleteDepartment } from '@fragments/Management/Department/hooks/mutates';
import { useFetchDepartments } from '@fragments/Management/Department/hooks/queries';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useSearchTableStore } from '@store/searchTableStore';

export interface TableDataDepartmentsManagementProps {
    setDepartmentId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TableDataDepartmentsManagement: React.FC<TableDataDepartmentsManagementProps> = props => {
    const { setDepartmentId, setIsModalOpen } = props;
    const isPermission = useHasAnyPermission([MyPermissions.DepartmentView]);
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { data, isLoading } = useFetchDepartments(tableParams);
    const { mutateAsync: deleteDepartment, isLoading: loadingDelete } = useDeleteDepartment();

    const departmentArr: SearchDepartmentViewDto[] = data?.data ?? [];
    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const handleSetDepartmentId = (id: string) => {
        if (isPermission) {
            setDepartmentId(id);
            setIsModalOpen(true);
        }
    };

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SearchDepartmentViewDto> | SorterResult<SearchDepartmentViewDto>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
            sorter,
        });
    };

    const columns: ColumnsType<DepartmentDto> = [
        {
            title: '#',
            width: 40,
            align: 'center',
            render: (_, _record: DepartmentDto, index: number) => <>{numberSTT(index, tableParams)}</>,
        },
        {
            title: i18n.t('Tên bộ phận'),
            dataIndex: 'name',
            key: 'Name',
            width: 250,
            sorter: true,
            render: (value, record: DepartmentDto) => (
                <Link className="line-clamp-2" onClick={() => handleSetDepartmentId(record.id!)}>
                    {value}
                </Link>
            ),
        },
        {
            title: i18n.t('Bộ phận trực thuộc'),
            dataIndex: 'parentName',
            key: 'ParentName',
            width: 250,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Trưởng bộ phận'),
            dataIndex: 'employeeName',
            key: 'EmployeeName',
            width: 250,
            sorter: true,
            render: (_, record: DepartmentDto) => (
                <Fragment>
                    <p className="line-clamp-2 font-semibold">{record.employeeName}</p>
                    <p>{record.employeePhone}</p>
                </Fragment>
            ),
        },
        {
            title: i18n.t('Chi nhánh'),
            dataIndex: 'branchName',
            width: 250,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Tình trạng'),
            dataIndex: 'status',
            key: 'Status',
            width: 120,
            render: value => (
                <StaticTag type={i18n.t(`departmentStatus.${value}`)} color={`${setDepartmentStatusColor(value)}`} />
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: 'right',
            width: 75,
            render: (_, record: DepartmentDto) => (
                <Flex className="gap-2" justify="center">
                    {record.status == ActiveStatus.Pending && (
                        <Can permissions={[MyPermissions.DepartmentDelete]}>
                            <DeleteButton
                                titleName={i18n.t('menu.department')}
                                content={`Tên ${i18n.t('menu.department')}: ${record.name}`}
                                disabled={loadingDelete}
                                onOk={async () => {
                                    await deleteDepartment(record.id!);
                                }}
                            />
                        </Can>
                    )}
                </Flex>
            ),
        },
    ];

    return (
        <GridTableComponent
            isHideSelectColumn
            columns={columns}
            tableParams={tableParams}
            dataSource={departmentArr}
            onChange={handleTableChange}
            bordered={true}
            scrollX={1200}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            loading={isLoading}
            showReport={true}
            tableName={i18n.t('menu.department')}
        />
    );
};
