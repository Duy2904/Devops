import { Checkbox, Form, FormInstance, Table } from 'antd';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { TourVisaLineDto, TourVisaLineStatus, TourVisaStatus } from '@sdk/tour-operations';
import { isLessThanSixMonthAgo, isReceivedDocument, sortDataWithStatus } from '../../../Feature';
import { isNil, isNull, size } from 'lodash';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
import { LineStatus } from './LineStatus';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { useGetCheckList } from '../../../hook/useDocumentReceiptVisa';

interface TableDataProps {
    form: FormInstance;
    dataSOSelected: AnyObject;
    dataStatus?: TourVisaStatus;
    documentReceiptId?: string;
    setIsEnableEdit?: Dispatch<SetStateAction<boolean>>;
}

export const TableData: React.FC<TableDataProps> = props => {
    const { dataSOSelected, dataStatus, documentReceiptId, form, setIsEnableEdit } = props;

    const [dataTable, setDataTable] = useState<TourVisaLineDto[]>([]);
    const visaLineExpiredFormUseWatch = Form.useWatch('visaLineExpiredPassport', form);
    const useWatchForm = Form.useWatch([], form);

    const { data: dataCheckList } = useGetCheckList();

    const columns: ColumnsType<TourVisaLineDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            align: 'center',
            render: (_, record: TourVisaLineDto, index: number) => (
                <>
                    <BaseInput isForm isHidden name={['visaLineId', record.id!]} initialValue={record.id} />
                    <>{index + 1}</>
                </>
            ),
        },
        {
            title: i18n.t('Khách đi tour'),
            key: 'infoTraveller',
            width: 250,
            render: (record: TourVisaLineDto) => (
                <div>
                    <p className="mb-1">{record?.fullName}</p>
                    <p className="text-black/40">{record.passengerTypeName}</p>
                    <p className="text-black/40 mb-1">
                        {`${record?.gender ? i18n.t(`GenderType.${record?.gender}`) : ''} ${record?.dateOfBirth ? `${dayjs(record?.dateOfBirth).format(AppConfig.DateFormat)}` : ''
                            } ${record.countryName ?? ''}`}
                    </p>
                    {!isNil(record?.phone) && <p className="text-black/40">SĐT: {record?.phone}</p>}
                    {!isNil(record?.identityId) && <p className="text-black/40">CCCD: {record?.identityId}</p>}
                </div>
            ),
        },
        {
            title: i18n.t('Đã có Visa'),
            key: 'hasVisa',
            width: 120,
            align: 'center',
            render: (record: TourVisaLineDto) => <Checkbox checked={record.hasVisa ?? false}></Checkbox>,
        },
        {
            title: i18n.t('Hộ chiếu'),
            key: 'passport',
            width: 150,
            render: (record: TourVisaLineDto) => (
                <BaseInput
                    isForm
                    name={['visaLinePassport', record.id!]}
                    className="mb-0"
                    placeholder={i18n.t('Số hộ chiếu')}
                    initialValue={record.passport}
                />
            ),
        },
        {
            title: i18n.t('Ngày hết hạn hộ chiếu'),
            key: 'expiryDate',
            width: 150,
            render: (record: TourVisaLineDto) => (
                <>
                    <BaseDatePicker
                        className="mb-0"
                        name={['visaLineExpiredPassport', record.id!]}
                        format={'date'}
                        placeholder={i18n.t('Ngày hết hạn')}
                        initialValue={record.expiryDate ? dayjs(record.expiryDate) : undefined}
                    />
                    {visaLineExpiredFormUseWatch &&
                        visaLineExpiredFormUseWatch[record.id!] &&
                        isLessThanSixMonthAgo(
                            visaLineExpiredFormUseWatch[record.id!],
                            dataSOSelected?.tourSchedule?.endDate,
                        ) && (
                            <p className="text-red-500 text-[10px] font-semibold mt-1">
                                {i18n.t('Hiệu lực của hộ chiếu dưới 6 tháng khi đến ngày kết thúc tour')}
                            </p>
                        )}
                </>
            ),
        },
        {
            title: i18n.t('Check list'),
            key: 'checkLists',
            width: 300,
            children: [
                {
                    title: i18n.t('Nội dung'),
                    width: 150,
                    render: (record: TourVisaLineDto) => {
                        return (
                            dataCheckList &&
                            dataCheckList
                                .filter(
                                    x =>
                                        x.destinationLocationId === dataSOSelected?.tourSchedule?.destinationLocationId,
                                )
                                .map(item => {
                                    return (
                                        <div key={record.id! + item.id! + 'contentId'}>
                                            <p
                                                className={`h-8 flex items-center ${isReceivedDocument(useWatchForm, record.id!, item.id!)
                                                    ? 'text-green-500'
                                                    : 'text-red-500 font-semibold'
                                                    }`}
                                            >
                                                {item.checkListName}
                                            </p>
                                            <BaseInput
                                                isForm
                                                isHidden
                                                name={['visaLineCheckList', record.id!, item.id!]}
                                                initialValue={item.id!}
                                            />
                                        </div>
                                    );
                                })
                        );
                    },
                },
                {
                    title: i18n.t('Bản gốc'),
                    width: 70,
                    align: 'center',
                    render: (record: TourVisaLineDto) => {
                        return (
                            dataCheckList &&
                            dataCheckList
                                .filter(
                                    x =>
                                        x.destinationLocationId === dataSOSelected?.tourSchedule?.destinationLocationId,
                                )
                                .map(item => {
                                    const isOriginal = record.checkLists?.find(x => x.id === item.id)?.isOriginal;
                                    return (
                                        <Form.Item
                                            className="mb-0"
                                            name={['visaLineIsOriginal', record.id!, item.id!]}
                                            initialValue={isOriginal ?? false}
                                            valuePropName="checked"
                                            key={record.id! + item.id! + 'isOriginal'}
                                        >
                                            <Checkbox></Checkbox>
                                        </Form.Item>
                                    );
                                })
                        );
                    },
                },
                {
                    title: i18n.t('Sao y'),
                    width: 70,
                    align: 'center',
                    render: (record: TourVisaLineDto) => {
                        return (
                            dataCheckList &&
                            dataCheckList
                                .filter(
                                    x =>
                                        x.destinationLocationId === dataSOSelected?.tourSchedule?.destinationLocationId,
                                )
                                .map(item => {
                                    const isCopy = record.checkLists?.find(x => x.id === item.id)?.isCopy;
                                    return (
                                        <Form.Item
                                            className="mb-0"
                                            name={['visaLineIsCopy', record.id!, item.id!]}
                                            initialValue={isCopy ?? false}
                                            valuePropName="checked"
                                            key={record.id! + item.id! + 'isCopy'}
                                        >
                                            <Checkbox checked={isCopy}></Checkbox>
                                        </Form.Item>
                                    );
                                })
                        );
                    },
                },
                {
                    title: i18n.t('Photo'),
                    width: 70,
                    align: 'center',
                    render: (record: TourVisaLineDto) => {
                        return (
                            dataCheckList &&
                            dataCheckList
                                .filter(
                                    x =>
                                        x.destinationLocationId === dataSOSelected?.tourSchedule?.destinationLocationId,
                                )
                                .map(item => {
                                    const isPhoto = record.checkLists?.find(x => x.id === item.id)?.isPhoto;
                                    return (
                                        <Form.Item
                                            className="mb-0"
                                            name={['visaLineIsPhoto', record.id!, item.id!]}
                                            initialValue={isPhoto ?? false}
                                            valuePropName="checked"
                                            key={record.id! + item.id! + 'isPhoto'}
                                        >
                                            <Checkbox checked={isPhoto}></Checkbox>
                                        </Form.Item>
                                    );
                                })
                        );
                    },
                },
            ],
        },
        {
            title: i18n.t('Tình trạng Visa'),
            key: 'status',
            width: 150,
            render: (record: TourVisaLineDto) => (
                <LineStatus name={['visaLineStatus', record.id!]} initialValue={record?.status} />
            ),
        },
        {
            title: i18n.t('Ghi chú'),
            key: 'note',
            width: 200,
            render: (record: TourVisaLineDto) => (
                <Form.Item name={['visaLineNote', record.id!]} className="mb-0" initialValue={record.note}>
                    <TextArea showCount maxLength={500} />
                </Form.Item>
            ),
        },
        {
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 50,
            render: (_, record: TourVisaLineDto) =>
                size(dataTable) > 1 &&
                dataStatus !== TourVisaStatus.Cancel && <DeleteOutlined onClick={() => handleDeleteRowData(record)} />,
        },
    ];

    const handleDeleteRowData = (record: TourVisaLineDto) => {
        const newData = dataTable.filter(item => item.id !== record.id);
        setIsEnableEdit && setIsEnableEdit(true);
        setDataTable(newData);
    };

    const handleFetchData = useCallback(() => {
        if (!isNull(dataSOSelected)) {
            const tempData = dataSOSelected?.saleOrderLineTravellers ?? dataSOSelected.tourVisaLines;
            if (documentReceiptId) {
                const sortStatus = sortDataWithStatus(tempData);
                setDataTable(sortStatus);
            } else {
                const dataStatusDefault = tempData?.map((item: AnyObject) => {
                    return {
                        ...item,
                        note: item.description,
                        status: item.hasVisa ? TourVisaLineStatus.Pass : TourVisaLineStatus.Wait,
                    };
                });
                const sortStatus = sortDataWithStatus(dataStatusDefault);
                setDataTable(sortStatus);
            }
        }
    }, [dataSOSelected, documentReceiptId]);

    useEffect(() => {
        handleFetchData();
    }, [handleFetchData]);

    return (
        <div className="p-4">
            <Table
                columns={columns}
                dataSource={dataTable}
                rowKey="id"
                bordered
                pagination={false}
                size="small"
                scroll={{ x: 1200 }}
            />
        </div>
    );
};
