import { Flex, Select } from 'antd';
import { currentPage, pageSize } from '@src/new/shared/types/BaseTypes';

import { AnyObject } from 'antd/es/_util/type';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { IconChecked } from '@src/new/components/common/svg';
import { SorterResult } from 'antd/es/table/interface';
import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const SortItem = () => {
    const { t } = useTranslation();
    const [itemChecked, setItemChecked] = useState<string>('CreatedOn descend');

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const optionData = [
        { label: 'Mới nhất', value: 'CreatedOn descend' },
        { label: 'Cũ nhất', value: 'CreatedOn ascend' },
        { label: 'Giá thấp nhất', value: 'taxInclusivePrice ascend' },
        { label: 'Giá cao nhất', value: 'taxInclusivePrice descend' },
        { label: 'Hoa hồng cao nhất', value: 'commissionValue descend' },
        { label: 'Còn nhiều chỗ nhất', value: 'remainingCapacity descend' },
        { label: 'Nhiều đơn bán nhất', value: 'bookedQuantity descend' },
    ];

    const options = optionData.map(option => ({
        label: t(option.label),
        value: option.value,
    }));

    const optionsItem = [
        {
            label: <span>{t('Sắp xếp theo')}</span>,
            options: options,
        },
    ];

    const handleOnChange = useDebouncedCallback((value: string) => {
        setItemChecked(value);
        const itemTemp = value ? value.split(' ') : [];
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            sorter: value ? ({ columnKey: itemTemp[0], order: itemTemp[1] } as SorterResult<AnyObject>) : undefined,
        });
    }, 500);

    return (
        <Flex align="center" gap={10}>
            <p className={clsx(Color.text_2A2A2A_80)}>{t('Sắp xếp:')}</p>
            <Select
                className="w-44"
                options={optionsItem}
                defaultValue={itemChecked}
                variant="filled"
                onChange={handleOnChange}
                labelRender={data => <p>{data.label}</p>}
                optionRender={data => (
                    <Flex
                        align="center"
                        justify="space-between"
                        className={`${itemChecked == data.value && 'text-state-info'} font-medium text-sm`}
                    >
                        {data.label} {itemChecked == data.value && <IconChecked />}
                    </Flex>
                )}
            />
        </Flex>
    );
};
