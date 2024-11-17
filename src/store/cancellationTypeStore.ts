import { CancellationTypeDto } from '../../sdk/tour-operations';
import { create } from 'zustand';

interface CancellationTypeStore {
    cancellationTypeList: CancellationTypeDto[];
    selectCancellationType: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setCancellationType: (cancellationTypeList: CancellationTypeDto[]) => void;
    };
}

export const useCancellationTypeStore = create<CancellationTypeStore>()(set => ({
    cancellationTypeList: [],
    selectCancellationType: [],
    actions: {
        setCancellationType: (cancellationTypeList: CancellationTypeDto[]) => {
            set(() => {
                return {
                    cancellationTypeList: cancellationTypeList,
                    selectCancellationType: cancellationTypeList.map(CancellationType => ({
                        value: CancellationType.id ?? '',
                        label: `${CancellationType.name}`,
                    })),
                };
            });
        },
    },
}));
