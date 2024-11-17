import { create } from 'zustand';
import { ProductDto } from '../../sdk/tour-operations/index.ts';

interface ProductStore {
    products: ProductDto[];
    selectCurrentProducts: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setProducts: (products: ProductDto[]) => void;
    };
}

export const useProductsStore = create<ProductStore>()(set => ({
    products: [],
    selectCurrentProducts: [],
    actions: {
        setProducts: (products: ProductDto[]) => {
            set(() => {
                return {
                    products: products,
                    selectCurrentProducts: products.map(product => ({
                        value: product.id ?? '',
                        label: product.name ?? '',
                    })),
                };
            });
        },
    },
}));
