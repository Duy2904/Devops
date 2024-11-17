import { Flex } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Can from '@components/common/Can';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { StaticTag } from '@components/customizes/StaticTag';
import { GridTableComponent } from '@components/ui/GridTable';
import { customTableParamsListAgent, mapSearchRequest } from '@fragments/Management/Agent/Feature';
import { useDeleteAgentPaymentLimit } from '@fragments/Management/Agent/hooks/mutates';
import { useFetchEmployeesDropdown, useGetListGroupAgent } from '@fragments/Management/Agent/hooks/queries';
import { useDeleteGroupAgent } from '@hooks/identity-next/mutates/useGroup';
import { LiteAgentDto, SearchAgentsRequest } from '@sdk/identity-next/models';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { TableParams } from '@src/types/SearchResponse';
import { useSearchTableStore } from '@store/searchTableStore';
import { setAgentStatusColor } from '@utils/colorStatus';
import { numberSTT } from '@utils/filterSearch';
import { MyPermissions } from '@utils/Permissions';

export const TableDataAgentsManagement: React.FC = () => {
    // State
    const [customTableParams, setCustomTableParams] = useState<TableParams<AnyObject>>({});

    // Store
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    // Query
    const { data, isLoading } = useGetListGroupAgent(mapSearchRequest(customTableParams));

    // Mutate
    const { mutateAsync: deleteGroupAgent } = useDeleteGroupAgent();
    const { mutateAsync: deletePaymentLimit } = useDeleteAgentPaymentLimit();
    const { data: fetchDataEmployeeDropdown } = useFetchEmployeesDropdown();

    const mapItemsEmployeeDropdown = new Map(fetchDataEmployeeDropdown?.map(item => [item.id, item]));

    const agentsArr = data?.data ?? [];
    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        _advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SearchAgentsRequest> | SorterResult<SearchAgentsRequest>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            sorter,
        });
    };

    useEffect(() => {
        const newTableParams = customTableParamsListAgent(tableParams);
        setCustomTableParams(newTableParams);
    }, [tableParams]);

    const columns: ColumnsType<LiteAgentDto> = [
        {
            title: '#',
            width: 40,
            align: 'center',
            render: (_, _record: LiteAgentDto, index: number) => <>{numberSTT(index, tableParams)}</>,
        },
        {
            title: i18n.t('Mã hệ thống'),
            dataIndex: 'systemId',
            key: 'SystemId',
            width: 120,
            sorter: true,
            render: (value, record) => (
                <Link className="font-medium" to={`${rootPaths.agentForm}/${record.id}`}>
                    {value}
                </Link>
            ),
        },
        {
            title: i18n.t('Mã đại lý'),
            dataIndex: 'code',
            key: 'Code',
            width: 120,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Tên đại lý'),
            dataIndex: 'name',
            key: 'Name',
            width: 250,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Chi nhánh'),
            dataIndex: 'branchName',
            key: 'BranchName',
            width: 150,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Tình trạng HĐ'),
            dataIndex: 'agentState',
            key: 'AgentState',
            width: 150,
            render: value =>
                value ? (
                    <StaticTag type={i18n.t(`agentStatus.${value}`)} color={`${setAgentStatusColor(`${value}`)}`} />
                ) : null,
        },
        {
            title: i18n.t('Hiệu lực HĐ'),
            dataIndex: 'effectiveDate',
            key: 'EffectiveDate',
            width: 200,
            sorter: true,
            render: (_, record) => (
                <>
                    {record.effectiveDate && (
                        <p className="line-clamp-2">{dayjs(record.effectiveDate).format('DD/MM/YYYY')}</p>
                    )}
                    {record.expirationDate && (
                        <p className="line-clamp-2">{dayjs(record.expirationDate).format('DD/MM/YYYY')}</p>
                    )}
                </>
            ),
        },
        {
            title: i18n.t('Người phụ trách'),
            width: 200,
            render: (_, record) => (
                <>
                    <p className="line-clamp-2">
                        {`${mapItemsEmployeeDropdown.get(record.personInChargeId!)?.name ?? ''}`}
                    </p>
                    <p className="line-clamp-2">{`${
                        mapItemsEmployeeDropdown.get(record.personInChargeId!)?.phone ?? ''
                    }`}</p>
                </>
            ),
        },
        {
            title: i18n.t('TK Đại lý'),
            dataIndex: 'accountCreation',
            key: 'AccountCreation',
            width: 200,
            render: value => (
                <StaticTag type={i18n.t(`agentStatus.${value}`)} color={`${setAgentStatusColor(`${value}`)}`} />
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: 'right',
            width: 75,
            render: (_, record: AnyObject) => (
                <>
                    {!record.isActive && !record.inUse && (
                        <Can permissions={[MyPermissions.AgentDelete]}>
                            <Flex className="gap-2" justify="center">
                                <DeleteButton
                                    titleName={`${record.code} - ${record.name}`}
                                    onOk={async () => {
                                        await deleteGroupAgent(record.id!);
                                        await deletePaymentLimit(record.id!);
                                    }}
                                />
                            </Flex>
                        </Can>
                    )}
                </>
            ),
        },
    ];

    return (
        <GridTableComponent
            isHideSelectColumn
            columns={columns}
            tableParams={customTableParams}
            dataSource={agentsArr}
            bordered={true}
            scrollX={1200}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            showReport={true}
            tableName={i18n.t('menu.agent')}
            loading={isLoading}
            onChange={handleTableChange}
        />
    );
};
