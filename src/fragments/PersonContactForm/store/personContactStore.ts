/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { TravellerDto } from '@sdk/tour-operations';

interface PersonContactStore {
    personContactDetail: TravellerDto;
    isCreatingPersonContact: boolean;
    actions: {
        setPersonContactDetail: (personContactDetail: TravellerDto) => void;
        setIsCreatingPersonContact: (isCreatingPersonContact: boolean) => void;
        resetPersonContactStore: () => void;
    };
}

const initialValue: Omit<PersonContactStore, 'actions'> = {
    personContactDetail: {},
    isCreatingPersonContact: false,
};

export const usePersonContactStore = create<PersonContactStore>()(set => ({
    ...initialValue,
    actions: {
        setPersonContactDetail: (personContactDetail: TravellerDto) => {
            set(() => ({ personContactDetail }));
        },
        setIsCreatingPersonContact: (isCreatingPersonContact: boolean) => {
            set(() => ({ isCreatingPersonContact }));
        },
        resetPersonContactStore: () => {
            set(() => initialValue);
        },
    },
}));
