import { create } from 'zustand';

import { ProductCategoryDto } from '@sdk/tour-operations';

interface ProductCategoryStore {
    productCategory: ProductCategoryDto[];
    selectCurrentProductCategory: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setProductCategory: (productCategory: ProductCategoryDto[]) => void;
    };
}

const initialValue: Omit<ProductCategoryStore, 'actions'> = {
    productCategory: [],
    selectCurrentProductCategory: [],
};

export const useProductCategoryStore = create<ProductCategoryStore>()(set => ({
    ...initialValue,
    actions: {
        setProductCategory: (productCategory: ProductCategoryDto[]) => {
            set(() => {
                return {
                    productCategory: productCategory,
                    selectCurrentProductCategory: productCategory.map(item => ({
                        value: item.id ?? '',
                        label: item.name ?? '',
                    })),
                };
            });
        },
    },
}));
