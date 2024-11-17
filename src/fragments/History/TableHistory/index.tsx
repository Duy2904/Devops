import { AppConfig } from '@utils/config';
import { Col } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GridTableComponent } from '@components/ui/GridTable';
import { HistoryDetailDto } from '@sdk/tour-operations';
import React from 'react';
import dayjs from 'dayjs';
import { historyDataParse } from '../Feature';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import lowerCase from 'lodash/lowerCase';
import { useSearchTableStore } from '@store/searchTableStore';

interface TableHistoryProps {
    isLoading?: boolean;
    data: HistoryDetailDto[];
}

export const TableHistory: React.FC<TableHistoryProps> = props => {
    // Store
    const { tableParams } = useSearchTableStore(state => state);

    const columnsData: ColumnsType<HistoryDetailDto> = [
        {
            title: i18n.t('Người thực hiện'),
            dataIndex: 'userName',
            key: 'History.editor',
            width: 200,
            render: value => <p className="text-sm">{value}</p>,
        },
        {
            title: i18n.t('Thời gian'),
            dataIndex: 'dateTime',
            key: 'History.time',
            width: 200,
            sorter: true,
            render: value => <p className="text-sm">{dayjs(value).format(AppConfig.DateTimeWithSecondsFormat)}</p>,
        },
        {
            title: i18n.t('Hành động'),
            dataIndex: 'type',
            key: 'History.type',
            width: 200,
            render: (_, record) => <p className="text-sm">{i18n.t(`action.${lowerCase(record.type!)}`)}</p>,
        },
        {
            title: i18n.t('Chi tiết'),
            width: 800,
            render: (_, record) => {
                const oldValues = record.from && historyDataParse(record.tableName!, record.from);
                const newValues = record.to && historyDataParse(record.tableName!, record.to);
                return (
                    <Col>
                        <p className="text-sm text-state-info font-semibold">{i18n.t(`history.${record.tableName}`)}</p>
                        <Col
                            className={`grid gap-5 ${!isEmpty(oldValues) && !isEmpty(newValues) ? 'grid-cols-2' : 'grid-cols-1'
                                }`}
                        >
                            {!isEmpty(oldValues) && (
                                <Col className="mt-3">
                                    <p className="text-sm font-semibold mb-1">{i18n.t('Giá trị cũ')}</p>
                                    {oldValues.map((item: string, index: number) => {
                                        return (
                                            <p className="text-xs font-light mb-1" key={index}>
                                                - {item}
                                            </p>
                                        );
                                    })}
                                </Col>
                            )}
                            {!isEmpty(newValues) && (
                                <Col className="mt-3">
                                    {!isEmpty(oldValues) && (
                                        <p className="text-sm font-semibold mb-1">{i18n.t('Giá trị mới')}</p>
                                    )}
                                    {newValues.map((item: string, index: number) => {
                                        return (
                                            <p className="text-xs font-light mb-1" key={index}>
                                                - {item}
                                            </p>
                                        );
                                    })}
                                </Col>
                            )}
                        </Col>
                    </Col>
                );
            },
        },
    ];

    return (
        <GridTableComponent
            loading={props.isLoading}
            columns={columnsData}
            dataSource={props.data}
            bordered={false}
            isStriped
            tableParams={tableParams}
            tableName={'Lịch sử chỉnh sửa'}
            isHideSelectColumn
            isHidePagination
        />
    );
};
