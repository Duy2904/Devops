import { Flex } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import Table, { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import { useState } from 'react';

import { EmptyComponent } from '@components/common/Empty';

import { TableParams } from '../../../types/SearchResponse';
import Format from '../../../utils/format';
import { getRangeCount } from '../../../utils/getRankCount';
import i18n from '../../../i18n';

interface GridTableProps {
    columns: ColumnsType<AnyObject>;
    tableParams: TableParams<AnyObject>;
    rowKey?: () => void;
    dataSource: AnyObject[] | undefined;
    // eslint-disable-next-line no-unused-vars
    onChange?: (pagination: AnyObject, filters: AnyObject, sorter: AnyObject) => Promise<void>;
    scrollX?: number;
    scrollY?: number;
    bordered?: boolean;
    showReport?: boolean;
    tableName?: string;
    showFooter?: boolean;
    showAction?: boolean;
    listAction?: React.ReactNode;
    totalAmount?: number;
    loading?: boolean;
    setRowSelected?: React.Dispatch<React.SetStateAction<React.Key[]>>;
    // eslint-disable-next-line no-unused-vars
    summary?: (data: readonly AnyObject[]) => React.ReactNode;
    isHidePagination?: boolean;
    isHideSelectColumn?: boolean;
    total?: number;
    isStriped?: boolean;
}

export const GridTableComponent = (_props: GridTableProps) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const hasSelected = selectedRowKeys.length > 0;

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        if (_props.setRowSelected) {
            _props.setRowSelected(newSelectedRowKeys);
        }
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <>
            {_props.showReport && (
                <Flex className="pb-5 flex-wrap" align="center" justify="space-between">
                    <Flex align="center" className="flex-wrap">
                        {hasSelected ? (
                            <p className="m-0 pr-3">
                                {i18n.t('action.choiced')}{' '}
                                <span className="font-bold">
                                    "{selectedRowKeys.length} {_props.tableName}"
                                </span>
                            </p>
                        ) : (
                            <p></p>
                        )}
                        {_props.showAction && <>{_props.listAction}</>}
                    </Flex>
                    <div className="flex">
                        {_props.totalAmount && _props.totalAmount > 0 ? (
                            <p className="mr-10 text-rose-500">{Format.formatNumber(_props.totalAmount)}</p>
                        ) : (
                            <></>
                        )}
                        <p className="m-0">
                            {i18n.t('action.visible')}{' '}
                            <span className="font-bold">
                                {getRangeCount(_props.tableParams, true)}/
                                {_props.total ? _props.total : _props?.tableParams?.pagination?.total}
                            </span>{' '}
                            {_props.tableName}
                        </p>
                    </div>
                </Flex>
            )}
            <Table
                className={clsx('!overflow-auto', _props.isStriped && 'table-striped-rows')}
                bordered={_props.bordered}
                rowSelection={!_props.isHideSelectColumn ? rowSelection : undefined}
                columns={_props.columns}
                rowKey={item => item.id!}
                dataSource={_props.dataSource}
                pagination={
                    !_props.isHidePagination && _props.tableParams.pagination
                        ? {
                              ..._props.tableParams.pagination,
                              total: _props.total ? _props.total : _props.tableParams.pagination.total,
                          }
                        : false
                }
                onChange={_props.onChange}
                scroll={{ x: _props.scrollX, y: _props.scrollY }}
                showSorterTooltip={false}
                size="small"
                loading={!_props.dataSource || _props.loading}
                summary={_props.summary}
                locale={{
                    emptyText() {
                        return <EmptyComponent />;
                    },
                }}
            />
        </>
    );
};
