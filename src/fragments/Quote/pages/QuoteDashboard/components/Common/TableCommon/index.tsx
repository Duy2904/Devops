import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Link, useNavigate } from 'react-router-dom';
import { PaginationResponseOfSearchQuoteDto, QuoteStatus, SearchQuoteDto } from '@sdk/tour-operations';
import { PermissionType, TourType } from '@src/types/TypeEnum';
import { RouteCloneQuoteState, isOnlyOneStatus } from '@fragments/Quote/features';
import { toastErr, toastSuccess } from '@components/ui/Toast/Toast';

import { AppConfig } from '@utils/config';
import { ButtonExportExcelFit } from '@fragments/Quote/components/TourFit/ButtonExportExcelFit';
import { ButtonExportExcelGit } from '@fragments/Quote/components/TourGit/ButtonExportExcelGit';
import Can from '@components/common/Can';
import { CancelButton } from '@components/customizes/Button/CancelButton';
import { CloneButton } from '@components/customizes/Button/CloneButton';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { Flex } from 'antd';
import Format from '@utils/format';
import { GridTableComponent } from '@components/ui/GridTable';
import { ListActionTable } from '../../../ListActionTable';
import { StaticTag } from '@components/customizes/StaticTag';
import { UseMutateAsyncFunction } from 'react-query';
import dayjs from 'dayjs';
import { getLinkQuoteForm } from '@fragments/Quote/features/getLink';
import { getPermission } from '@fragments/Quote/features/getPermission';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { setQuoteStatusColor } from '@utils/colorStatus';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { useSearchTableStore } from '@store/searchTableStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';

interface TableQuoteCommonProps {
    data: PaginationResponseOfSearchQuoteDto | undefined;
    rowSelected: React.Key[];
    isLoading: boolean;
    setIsOpenConfirmationModal: Dispatch<SetStateAction<boolean>>;
    setRowSelected: Dispatch<SetStateAction<React.Key[]>>;
    setQuoteList: Dispatch<SetStateAction<SearchQuoteDto[]>>;
    cancelQuote: UseMutateAsyncFunction<string, unknown, string, unknown>;
    deleteQuote: UseMutateAsyncFunction<string, unknown, string, unknown>;
    setInvalidQuery: () => void;
    // eslint-disable-next-line no-unused-vars
    renderFileName: (quoteData: SearchQuoteDto) => string;
}

export const TableQuoteCommon: React.FC<TableQuoteCommonProps> = props => {
    const navigate = useNavigate();
    const {
        rowSelected,
        data,
        isLoading,
        setRowSelected,
        setIsOpenConfirmationModal,
        setQuoteList,
        deleteQuote,
        cancelQuote,
        setInvalidQuery,
        renderFileName,
    } = props;

    // store
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);
    const {
        tourType,
        actions: { setTourType },
    } = useQuoteStore(state => state);
    const {
        actions: { removeTourSchedule },
    } = useTourScheduleStore(state => state);

    const quoteList: SearchQuoteDto[] = data?.data ?? [];
    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const renderColor = (number: number) => {
        if (number > 0) {
            return 'text-green-500';
        } else if (number < 0) {
            return 'text-red-500';
        } else {
            return '';
        }
    };

    const handleCancelQuote = (id: string) => async () => {
        try {
            const response = await cancelQuote(id);
            if (!isEmpty(response)) {
                toastSuccess('', i18n.t('quote.dashboard.cancel.success'));
                setInvalidQuery();
            }
        } catch {
            toastErr('', i18n.t('quote.dashboard.cancel.failed'));
            setInvalidQuery();
        }
    };

    const handleDeleteQuote = (id: string) => async () => {
        try {
            const response = await deleteQuote(id);
            if (!isEmpty(response)) {
                toastSuccess('', i18n.t('message.default.deleteContentSuccess'));
                setInvalidQuery();
            }
        } catch {
            toastErr('', i18n.t('quote.dashboard.cancel.failed'));
            setInvalidQuery();
        }
    };

    const handleCloneQuote = (id: string) => () => {
        setTourType(tourType);
        removeTourSchedule();
        navigate(getLinkQuoteForm(tourType), {
            state: {
                clonedId: id,
            } as RouteCloneQuoteState,
        });
    };

    const columns: ColumnsType<SearchQuoteDto> = [
        {
            title: '',
            dataIndex: '',
            key: '',
            fixed: 'left',
            width: 0,
        },
        {
            title: i18n.t('Mã'),
            dataIndex: 'orderNo',
            key: 'OrderNo',
            width: 150,
            sorter: true,
            render: (value: string, record: SearchQuoteDto) => {
                return (
                    <Can permissions={getPermission(tourType, [PermissionType.Update, PermissionType.View])}>
                        <Link className="font-medium" to={getLinkQuoteForm(tourType, record.id)}>
                            {value}
                        </Link>
                    </Can>
                );
            },
        },
        {
            title: i18n.t('Diễn giải'),
            dataIndex: 'description',
            key: 'Description',
            width: 200,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Trạng thái'),
            dataIndex: 'status',
            key: 'Status',
            align: 'center',
            width: 120,
            render(text) {
                return (
                    <StaticTag
                        type={i18n.t(`quote.status.${text}`) || ''}
                        color={`${setQuoteStatusColor(text ?? '')}`}
                    />
                );
            },
        },
        {
            title: i18n.t('Tour'),
            dataIndex: 'tourScheduleName',
            key: 'TourCodeName',
            width: 200,
            sorter: true,
            render: (_, record: SearchQuoteDto) => <>{`${record.tourScheduleTourCode} - ${record.tourScheduleName}`}</>,
        },
        {
            title: i18n.t('Doanh thu'),
            dataIndex: 'revenue',
            key: 'Revenue',
            width: 130,
            align: 'right',
            render: (_, record: SearchQuoteDto) => <>{Format.formatNumber(record.revenue)}</>,
        },
        {
            title: i18n.t('Chi phí'),
            dataIndex: 'cost',
            key: 'Cost',
            width: 130,
            align: 'right',
            render: (_, record: SearchQuoteDto) => <>{Format.formatNumber(record.cost)}</>,
        },
        {
            title: i18n.t('Lợi nhuận'),
            dataIndex: 'profit',
            key: 'Profit',
            width: 120,
            align: 'right',
            render: (_, record: SearchQuoteDto) => (
                <p className={`${renderColor(record.profit ?? 0)}`}>{Format.formatNumber(record.profit)}</p>
            ),
        },
        {
            title: i18n.t('ROS'),
            dataIndex: 'rosAmount',
            key: 'RosAmount',
            width: 120,
            align: 'right',
            render: (_, record: SearchQuoteDto) => (
                <p className={`${renderColor(record.rosAmount ?? 0)}`}>{`${Format.formatNumber(record.rosAmount)}${
                    record.rosAmount ? '%' : ''
                }`}</p>
            ),
        },
        {
            title: i18n.t('ROE'),
            dataIndex: 'roeAmount',
            key: 'RoeAmount',
            width: 120,
            align: 'right',
            render: (_, record: SearchQuoteDto) => (
                <p className={`${renderColor(record.roeAmount ?? 0)}`}>{`${Format.formatNumber(record.roeAmount)}${
                    record.roeAmount ? '%' : ''
                }`}</p>
            ),
        },
        {
            title: i18n.t('Ngày tạo phiếu'),
            dataIndex: 'createdOn',
            key: 'CreatedOn',
            width: 150,
            sorter: true,
            render: a => <>{dayjs(a).format(AppConfig.DateFormat)}</>,
        },
        {
            title: i18n.t('Thao tác'),
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 110,
            render: (_, record: SearchQuoteDto) => (
                <Flex className="gap-2" justify="right">
                    <Can permissions={getPermission(tourType, [PermissionType.Create])}>
                        <CloneButton tooltip={i18n.t('action.clone')} onClick={handleCloneQuote(record.id ?? '')} />
                    </Can>
                    {tourType === TourType.GIT ? (
                        <ButtonExportExcelGit isSmall quoteId={record.id} fileName={renderFileName(record)} />
                    ) : (
                        <ButtonExportExcelFit isSmall quoteId={record.id} fileName={renderFileName(record)} />
                    )}
                    {record.status === QuoteStatus.Confirm && (
                        <Can permissions={getPermission(tourType, [PermissionType.Cancel])}>
                            <CancelButton
                                titleName={i18n.t('quote.dashboard.cancel.title')}
                                content={`${i18n.t('quote.dashboard.cancel.content')} ${record.orderNo}`}
                                onOk={handleCancelQuote(record.id ?? '')}
                                tooltip={i18n.t('action.cancel')}
                            />
                        </Can>
                    )}
                    {record.status === QuoteStatus.Draft && (
                        <Can permissions={getPermission(tourType, [PermissionType.Delete])}>
                            <DeleteButton
                                titleName={i18n.t('menu.quote')}
                                content={`Mã ${i18n.t('menu.quote')}: ${record.orderNo}`}
                                onOk={handleDeleteQuote(record.id ?? '')}
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
        sorter: SorterResult<SearchQuoteDto> | SorterResult<SearchQuoteDto>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
            sorter,
        });
    };

    useEffect(() => {
        if (data?.data && !isEmpty(data?.data)) {
            setQuoteList(data?.data);
        }
    }, [data?.data, setQuoteList]);

    const isSelectOneRow = useMemo(() => rowSelected.length == 1, [rowSelected.length]);
    const isSendRequest =
        isSelectOneRow &&
        (isOnlyOneStatus(QuoteStatus.Deny, rowSelected, quoteList) ||
            isOnlyOneStatus(QuoteStatus.Draft, rowSelected, quoteList));
    const isApproveRequest = isSelectOneRow && isOnlyOneStatus(QuoteStatus.WaitConfirm, rowSelected, quoteList);

    return (
        <GridTableComponent
            columns={columns}
            tableParams={tableParams}
            dataSource={quoteList}
            onChange={handleTableChange}
            bordered={true}
            scrollX={1200}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            showReport={true}
            tableName={i18n.t('menu.quote')}
            loading={isLoading}
            setRowSelected={setRowSelected}
            showAction
            listAction={
                <ListActionTable
                    isSendRequest={isSendRequest}
                    isApproveRequest={isApproveRequest}
                    quoteId={rowSelected[0] as string}
                    setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                />
            }
        />
    );
};
