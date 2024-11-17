import { create } from 'zustand';

import { ProductTypeDto } from '../../sdk/tour-operations/index.ts';

interface ProductTypeStore {
    ProductTypes: ProductTypeDto[];
    selectCurrentProductTypes: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setProductTypes: (ProductTypes: ProductTypeDto[]) => void;
    };
}

export const useProductTypesStore = create<ProductTypeStore>()(set => ({
    ProductTypes: [],
    selectCurrentProductTypes: [],
    actions: {
        setProductTypes: (ProductTypes: ProductTypeDto[]) => {
            set(() => {
                return {
                    ProductTypes: ProductTypes,
                    selectCurrentProductTypes: ProductTypes.map(ProductType => ({
                        value: ProductType.id ?? '',
                        label: ProductType.name ?? '',
                    })),
                };
            });
        },
    },
}));
