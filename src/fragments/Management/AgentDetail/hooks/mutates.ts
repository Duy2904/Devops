import { AgentApi, CreateAgentRequest, UpdateAgentRequest } from '@sdk/tour-operations';
import { useMutation, useQueryClient } from 'react-query';

import { AgentKey } from '../Feature/key-type';
import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';

export const AgentPaymentLimitApi = () => {
    return new AgentApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useCreateAgentPaymentLimit = () => {
    return useMutation({
        mutationKey: [AgentKey.createAgentPaymentLimit],
        mutationFn: async (createRequest: CreateAgentRequest) => {
            const response = await AgentPaymentLimitApi().agentCreate('root', createRequest);
            return response.data;
        },
    });
};

export const useUpdateAgentPaymentLimit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [AgentKey.updateAgentPaymentLimit],
        mutationFn: async (data: { agencyId: string; updateRequest: UpdateAgentRequest }) => {
            const response = await AgentPaymentLimitApi().agentUpdate(data.agencyId, 'root', data.updateRequest);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([AgentKey.fetchAgentPaymentLimit]);
        },
    });
};

export const useDeleteAgentPaymentLimit = () => {
    return useMutation({
        mutationKey: [AgentKey.deleteAgentPaymentLimit],
        mutationFn: async (agencyId: string) => {
            const response = await AgentPaymentLimitApi().agentDelete(agencyId, 'root');
            return response.data;
        },
    });
};
