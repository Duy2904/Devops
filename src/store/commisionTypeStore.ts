import { create } from 'zustand';
import { CommissionTypeDto } from '../../sdk/tour-operations';

interface CommissionTypeStore {
    agentTypes: CommissionTypeDto[];
    referrerTypes: CommissionTypeDto[];
    selectAgentType: {
        value: string;
        label: string;
    }[];
    selectReferrerType: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setAgentType: (agentTypes: CommissionTypeDto[]) => void;
        // eslint-disable-next-line no-unused-vars
        setReferrerType: (referrerTypes: CommissionTypeDto[]) => void;
    };
}

export const useCommissionTypeStore = create<CommissionTypeStore>()(set => ({
    agentTypes: [],
    referrerTypes: [],
    selectAgentType: [],
    selectReferrerType: [],
    actions: {
        setAgentType: (agentTypes: CommissionTypeDto[]) => {
            set(() => {
                return {
                    agentTypes: agentTypes,
                    selectAgentType: agentTypes.map(agentType => ({
                        value: agentType.id ?? '',
                        label: agentType.name ?? '',
                    })),
                };
            });
        },
        setReferrerType: (referrerTypes: CommissionTypeDto[]) => {
            set(() => {
                return {
                    referrerTypes: referrerTypes,
                    selectReferrerType: referrerTypes.map(referrerType => ({
                        value: referrerType.id ?? '',
                        label: referrerType.name ?? '',
                    })),
                };
            });
        },
    },
}));
