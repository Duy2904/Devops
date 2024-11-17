import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { DocumentType, SearchTourVisaDto, TourVisaStatus } from '@sdk/tour-operations';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useChangeStatus, useDownloadFile, useFetchDocumentReceiptVisa } from '../hook/useDocumentReceiptVisa';
import { useEffect, useState } from 'react';

import { AppConfig } from '@utils/config';
import Can from '@components/common/Can';
import { CancelButton } from '@components/customizes/Button/CancelButton';
import { Flex } from 'antd';
import { GridTableComponent } from '@components/ui/GridTable';
import { Link } from 'react-router-dom';
import { ListAction } from './ListAction';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PrintButton } from '@components/customizes/Button/PrintButton';
import { StaticTag } from '@components/customizes/StaticTag';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { setDocumentVisaColor } from '@utils/colorStatus';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useSearchTableStore } from '@store/searchTableStore';

export const TableDocumentReceiptVisa: React.FC = () => {
    const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
    const [checkedId, setCheckedId] = useState<string | undefined>();
    const [statusChange, setStatusChange] = useState<(TourVisaStatus | undefined)[]>([]);
    // store
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    // query & mutate
    const { data, isLoading } = useFetchDocumentReceiptVisa(tableParams);
    const { mutateAsync: changeStatus } = useChangeStatus();
    const { mutateAsync: downloadFile, isLoading: loadingDownload } = useDownloadFile();

    const documentReceiptVisaData: SearchTourVisaDto[] = data?.data ?? [];
    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SearchTourVisaDto> | SorterResult<SearchTourVisaDto>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
            sorter,
        });
    };

    const handleDownload = async (id: string) => {
        const request = {
            id: id,
            type: DocumentType.Pdf,
        };
        const url = await downloadFile(request);
        window.open(url, '_blank');
    };

    const columns: ColumnsType<SearchTourVisaDto> = [
        {
            title: '',
            dataIndex: '',
            key: '',
            fixed: 'left',
            width: 0,
        },
        {
            title: i18n.t('Mã'),
            dataIndex: 'code',
            key: 'Code',
            width: 150,
            sorter: true,
            render: (value: string, record: SearchTourVisaDto) => {
                return (
                    <Can permissions={[MyPermissions.TourVisaUpdate, MyPermissions.TourVisaView]}>
                        <Link className="font-medium" to={`${rootPaths.documentReceiptForm}/${record.id}`}>
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
            width: 230,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Trạng thái'),
            dataIndex: 'tourVisaStatus',
            key: 'TourVisaStatus',
            align: 'center',
            width: 100,
            render(text) {
                return (
                    <StaticTag
                        type={i18n.t(`tourVisa.status.${text}`) || ''}
                        color={`${setDocumentVisaColor(text ?? '')}`}
                    />
                );
            },
        },
        {
            title: i18n.t('Tour'),
            dataIndex: 'tourInfo',
            key: 'tourSchedule.tourCode',
            width: 230,
            sorter: true,
            render: (_, record: SearchTourVisaDto) => (
                <>
                    <p className="font-bold">{record.tourSchedule?.tourCode}</p>
                    <p className="line-clamp-2">{record.tourSchedule?.name}</p>
                </>
            ),
        },
        {
            title: i18n.t('Visa'),
            width: 150,
            render: (_, record: SearchTourVisaDto) => <>{record?.tourSchedule?.destinationLocation?.countryName}</>,
        },
        {
            title: i18n.t('tour.tourList.personContact'),
            dataIndex: 'fullName',
            key: 'FullName',
            width: 150,
            render: (_, record: SearchTourVisaDto) => (
                <>
                    <p>{record.fullName}</p>
                    <p>{record.phone}</p>
                </>
            ),
        },
        {
            title: i18n.t('Ngày tạo phiếu'),
            dataIndex: 'createdOn',
            key: 'CreatedOn',
            width: 150,
            sorter: true,
            render: a => <>{dayjs(a).format(AppConfig.DateTimeFormat)}</>,
        },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: 'right',
            width: 75,
            render: (_, record: SearchTourVisaDto) => (
                <Flex className="gap-2" justify="right">
                    {record.tourVisaStatus !== TourVisaStatus.Cancel && (
                        <Can permissions={[MyPermissions.TourVisaUpdate]}>
                            <CancelButton
                                titleName={i18n.t('menu.visaReceipt')}
                                content={`${i18n.t('Mã biên nhận')}: ${record.code}`}
                                onOk={async () => {
                                    await changeStatus({
                                        ids: [record.id!],
                                        status: TourVisaStatus.Cancel,
                                    });
                                    toastSuccess(
                                        i18n.t('menu.visaReceipt'),
                                        i18n.t('message.default.cancelContentSuccess'),
                                    );
                                }}
                                tooltip={i18n.t('action.cancel')}
                            />
                        </Can>
                    )}
                    <Can permissions={[MyPermissions.ReceivableVoucherView]}>
                        <PrintButton
                            onClick={() => {
                                handleDownload(record.id!);
                                setCheckedId(record.id!);
                            }}
                            isLoading={loadingDownload && record.id === checkedId}
                        />
                    </Can>
                </Flex>
            ),
        },
    ];

    useEffect(() => {
        if (rowSelected) {
            const listItem = data?.data?.filter(item => rowSelected.includes(item.id ?? ''));
            const listStatus = listItem?.map(item => item.tourVisaStatus);
            const tempArray = [...new Set(listStatus)];
            setStatusChange(tempArray);
        }
    }, [data?.data, rowSelected]);

    return (
        <GridTableComponent
            columns={columns}
            tableParams={tableParams}
            dataSource={documentReceiptVisaData}
            onChange={handleTableChange}
            bordered={true}
            scrollX={1200}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            showReport={true}
            tableName={i18n.t('menu.visaReceipt')}
            loading={isLoading}
            setRowSelected={setRowSelected}
            showAction
            listAction={<ListAction rowSelected={rowSelected} statusChange={statusChange} />}
        />
    );
};
