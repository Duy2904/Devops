import { Checkbox, Flex } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DiscountDetailDto, DiscountDto } from '@sdk/tour-operations';
import { TableParams, typePromote } from '../Feature';
import { mapSearchRequest, useDeletePromotionDetail, useFetchPromotionPrograms } from '../hook/usePromoteProgram';

import { AppConfig } from '@utils/config';
import Can from '@components/common/Can';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { FilterValue } from 'antd/es/table/interface';
import { GridTableComponent } from '@components/ui/GridTable';
import { Link } from 'react-router-dom';
import { MyPermissions } from '@utils/Permissions/index.ts';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { numberSTT } from '@utils/filterSearch';
import { rootPaths } from '@src/routers/route';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useCallback } from 'react';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useQueryClient } from 'react-query';
import { useSearchTableStore } from '@store/searchTableStore';

interface TableDataPromotionProgramProps {
    typePromote: typePromote;
}

export const TableDataPromotionProgram: React.FC<TableDataPromotionProgramProps> = props => {
    const { typePromote } = props;
    const queryClient = useQueryClient();
    const isPermissionCanView = useHasAnyPermission([MyPermissions.DiscountView, MyPermissions.DiscountUpdate]);

    // store
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    // query
    const { data, isLoading } = useFetchPromotionPrograms(
        mapSearchRequest({ ...tableParams, typePromote: typePromote } as TableParams<DiscountDto>),
    );
    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const { mutateAsync: deletePromotionDetail } = useDeletePromotionDetail();

    const columns: ColumnsType<DiscountDetailDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 40,
            align: 'center',
            render: (_, _record: DiscountDetailDto, index: number) => <>{numberSTT(index, tableParams)}</>,
        },
        {
            title: i18n.t('Mã'),
            dataIndex: 'code',
            key: 'Code',
            sorter: true,
            render: (value: string, record: DiscountDetailDto) => {
                return (
                    <Link
                        className="font-medium"
                        to={`${isPermissionCanView
                            ? typePromote == '1'
                                ? `${rootPaths.promoteBySeatForm}/${record.id}`
                                : `${rootPaths.promoteByGroupForm}/${record.id}`
                            : '#'
                            }`}
                    >
                        {value}
                    </Link>
                );
            },
        },
        {
            title: i18n.t('Tên chương trình'),
            dataIndex: 'name',
            key: 'Name',
            render(value) {
                return <>{value}</>;
            },
        },
        {
            title: i18n.t('Sử dụng'),
            key: 'IsActive',
            align: 'center',
            width: 120,
            render: (record: DiscountDetailDto) => <Checkbox checked={record.isActive}></Checkbox>,
        },
        {
            title: typePromote === '1' ? i18n.t('Ngày khởi tạo') : i18n.t('Thời gian hiệu lực'),
            render: (_, record: DiscountDetailDto) => {
                return typePromote === '1' ? (
                    <>{dayjs(record.createdOn).format(AppConfig.DateFormat)}</>
                ) : (
                    <>
                        {dayjs(record.startDate).format(AppConfig.DateFormat)} -{' '}
                        {dayjs(record.endDate).format(AppConfig.DateFormat)}
                    </>
                );
            },
        },
        {
            title: i18n.t('Thao tác'),
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (_, record: DiscountDetailDto) => (
                <Flex className="gap-2" justify="center">
                    {!record?.isUsed && (
                        <Can permissions={[MyPermissions.DiscountDelete]}>
                            <DeleteButton
                                titleName={`${record.code}`}
                                content={``}
                                onOk={async () => {
                                    await deletePromotionDetail(record.id!);
                                    toastSuccess(
                                        i18n.t('menu.promoteProgram'),
                                        i18n.t('message.default.deleteContentSuccess'),
                                    );
                                    setInvalidQuery();
                                }}
                            />
                        </Can>
                    )}
                </Flex>
            ),
        },
    ];

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        advancedFilter: Record<string, FilterValue | null>,
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
        });
    };

    const setInvalidQuery = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['fetchPromotionProgram'] });
    }, [queryClient]);

    return (
        <GridTableComponent
            isHideSelectColumn
            columns={columns}
            tableParams={tableParams}
            dataSource={data?.data ?? []}
            onChange={handleTableChange}
            bordered={true}
            scrollX={1000}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            showReport={true}
            tableName={i18n.t('menu.promoteProgram')}
            loading={isLoading}
        />
    );
};
