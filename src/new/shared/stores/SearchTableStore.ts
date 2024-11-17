import { currentPage, pageSize } from '@utils/filterSearch';

import { AnyObject } from 'antd/es/_util/type';
import { BaseFilterAdvancedSearch } from '@sdk/tour-operations';
import { ITableParamsType } from '../types/Search';
import { create } from 'zustand';

interface SearchTableStore {
    tableParams: ITableParamsType<AnyObject>;
    actions: {
        // eslint-disable-next-line no-unused-vars
        setSearchParams: (dataSearch: ITableParamsType<AnyObject>) => void;
        resetParamsNew: () => void;
    };
}

export const paramsDefaultSearch: ITableParamsType<BaseFilterAdvancedSearch> = {
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

export const useSearchTableStoreNew = create<SearchTableStore>()(set => ({
    tableParams: paramsDefaultSearch,
    actions: {
        setSearchParams: (dataSearch: ITableParamsType<AnyObject>) => {
            set(() => {
                return {
                    tableParams: dataSearch,
                };
            });
        },
        resetParamsNew: () => {
            set(() => {
                return {
                    tableParams: paramsDefaultSearch,
                };
            });
        },
    },
}));
