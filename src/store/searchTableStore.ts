import { currentPage, pageSize } from '@utils/filterSearch';

import { AnyObject } from 'antd/es/_util/type';
import { BaseFilterAdvancedSearch } from '@sdk/tour-operations';
import { TableParams } from '../types/SearchResponse';
import { create } from 'zustand';

interface SearchTableStore {
    tableParams: TableParams<AnyObject>;
    actions: {
        // eslint-disable-next-line no-unused-vars
        setSearchParams: (dataSearch: TableParams<AnyObject>) => void;
        resetParams: () => void;
    };
}

export const paramsDefaultSearch: TableParams<BaseFilterAdvancedSearch> = {
    pagination: {
        current: currentPage,
        pageSize: pageSize,
        showSizeChanger: true,
    },
    sorter: {
        columnKey: 'CreatedOn',
        order: 'descend',
    },
};

export const useSearchTableStore = create<SearchTableStore>()(set => ({
    tableParams: paramsDefaultSearch,
    actions: {
        setSearchParams: (dataSearch: TableParams<AnyObject>) => {
            set(() => {
                return {
                    tableParams: dataSearch,
                };
            });
        },
        resetParams: () => {
            set(() => {
                return {
                    tableParams: paramsDefaultSearch,
                };
            });
        },
    },
}));
