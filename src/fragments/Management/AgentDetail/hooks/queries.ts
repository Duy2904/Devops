import { AgentApi } from '@sdk/tour-operations';
import { AgentKey } from '../Feature/key-type';
import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const AgentPaymentLimitApi = () => {
    return new AgentApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchAgentPaymentLimit = (agentId?: string) => {
    const requestFn = async () => {
        const response = await AgentPaymentLimitApi().agentGet(agentId!, 'root');
        return response.data;
    };

    return useQuery({
        queryKey: [AgentKey.fetchAgentPaymentLimit, agentId],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!agentId,
    });
};
