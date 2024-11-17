import { create } from 'zustand';
import { CustomerDto } from '../../sdk/tour-operations';

interface CustomersStore {
    customers: CustomerDto[];
    selectCustomers: {
        value: string;
        label: string;
    }[];
    actions: {
        setCustomers: (customers: CustomerDto[]) => void;
    };
}

export const useCustomersStore = create<CustomersStore>()(set => ({
    customers: [],
    selectCustomers: [],
    actions: {
        setCustomers: (customers: CustomerDto[]) => {
            set(() => {
                return {
                    customers: customers,
                    selectCustomers: customers.map(customer => ({
                        value: customer.id ?? '',
                        label: `${customer?.customerNo} - ${customer?.name}`,
                    })),
                };
            });
        },
    },
}));
