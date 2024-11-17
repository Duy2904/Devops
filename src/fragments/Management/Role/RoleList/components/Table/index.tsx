import { ActiveStatus, RoleDto, SearchRoleRequest } from '@sdk/tour-operations';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import React, { useCallback, useEffect, useState } from 'react';
import { customTableParamsListAgent, getURLFormNavigate } from '@fragments/Management/Role/features';
import { mapSearchRequest, useGetRoleSearch } from '@fragments/Management/Role/hooks/queries';
import { toastErr, toastSuccess } from '@components/ui/Toast/Toast';

import { AnyObject } from 'antd/es/_util/type';
import Can from '@components/common/Can';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { Flex } from 'antd';
import { GridTableComponent } from '@components/ui/GridTable';
import { Link } from 'react-router-dom';
import { MyPermissions } from '@utils/Permissions';
import { RoleType } from '@src/types/TypeEnum';
import { StaticTag } from '@components/customizes/StaticTag';
import { TableParams } from '@src/types/SearchResponse';
import i18n from '@src/i18n';
import { isNil } from 'lodash';
import { numberSTT } from '@utils/filterSearch';
import { setRoleStatusColor } from '@utils/colorStatus';
import { useDeleteRole } from '@fragments/Management/Role/hooks/mutates';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useSearchTableStore } from '@store/searchTableStore';

interface TableListProps {
    type: RoleType;
}

export const TableList: React.FC<TableListProps> = props => {
    const { type } = props;
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    // Store
    const { data: personInfo } = useFetchPersonalIdentityInfo();

    // State
    const [customTableParams, setCustomTableParams] = useState<TableParams<AnyObject>>({});

    const groupId = personInfo?.groups?.[0]?.groupId ?? '';
    // Query
    const { data, isLoading } = useGetRoleSearch(groupId, mapSearchRequest(customTableParams));

    // Mutate
    const { mutateAsync: deleteRole } = useDeleteRole();

    const roleArr: RoleDto[] = data?.data ?? [];

    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        _advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SearchRoleRequest> | SorterResult<SearchRoleRequest>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            sorter,
        });
    };

    const handleDeleteRole = useCallback(
        (record: RoleDto) => async () => {
            try {
                await deleteRole(record.id ?? '');
                toastSuccess(i18n.t('message.default.deleteContentSuccess'), `${record.name}`);
            } catch (err) {
                toastErr(i18n.t('message.default.error'), 'Xóa thất bại.');
            }
        },
        [deleteRole],
    );

    useEffect(() => {
        if (isNil(tableParams.iSMineData)) {
            tableParams.iSMineData = type === RoleType.Company;
        }

        return () => {
            delete tableParams.iSMineData;
        };
    }, [tableParams, type]);

    useEffect(() => {
        const newTableParams = customTableParamsListAgent(tableParams);
        setCustomTableParams(newTableParams);
    }, [tableParams]);

    const needPermissionsDelete =
        type === RoleType.Company ? [MyPermissions.OwnerRoleDelete] : [MyPermissions.AgentRoleDelete];

    const columnsData: ColumnsType<RoleDto> = [
        {
            title: '#',
            width: 40,
            align: 'center',
            render: (_, _record: RoleDto, index: number) => <>{numberSTT(index, tableParams)}</>,
        },
        {
            title: i18n.t('Quyền hạn'),
            dataIndex: 'name',
            key: 'Name',
            fixed: 'left',
            sorter: true,
            width: 200,
            render: (value: string, record) => (
                <Link className="font-medium" to={`${getURLFormNavigate(type)}/${record.id}`}>
                    {value}
                </Link>
            ),
        },
        {
            title: i18n.t('Tình trạng'),
            dataIndex: 'status',
            key: 'Status',
            width: 150,
            render: value => (
                <StaticTag type={i18n.t(`roleStatus.${value}`)} color={`${setRoleStatusColor(`${value}`)}`} />
            ),
        },
        {
            title: i18n.t('Đơn vị'),
            dataIndex: 'groupName',
            key: 'GroupName',
            width: 200,
            render(value, record) {
                return (
                    <p className="line-clamp-2">{`${record?.groupCode ? record?.groupCode + ' - ' : ''}${value}`}</p>
                );
            },
        },
        {
            title: i18n.t('action.action'),
            key: 'action',
            fixed: 'right',
            width: 80,
            render: (_, record) => (
                <>
                    {record.status === ActiveStatus.Pending && (
                        <Can permissions={needPermissionsDelete}>
                            <Flex className="gap-2" justify="center">
                                <DeleteButton titleName={record.name} onOk={handleDeleteRole(record)} />
                            </Flex>
                        </Can>
                    )}
                </>
            ),
        },
    ];

    return (
        <GridTableComponent
            loading={isLoading}
            isHideSelectColumn
            columns={columnsData}
            tableParams={tableParams}
            dataSource={roleArr}
            onChange={handleTableChange}
            bordered={true}
            scrollX={660}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            showReport={true}
            tableName={i18n.t('Quyền hạn')}
        />
    );
};
