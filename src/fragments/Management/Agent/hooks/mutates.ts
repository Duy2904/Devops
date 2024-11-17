import {
    AgentApi,
    BankInforApi,
    CreateAgentRequest,
    ExportAgentRequest,
    RoleApi,
    UpdateAgentRequest,
} from '@sdk/tour-operations';
import { AnyObject } from 'antd/es/_util/type';
import { useMutation, useQueryClient } from 'react-query';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';

import { AgentKey } from '../Feature/key-type';

export const AgentsApi = () => {
    return new AgentApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const BankInfoApi = () => {
    return new BankInforApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useCreateAgentPaymentLimit = () => {
    return useMutation({
        mutationKey: [AgentKey.createAgentPaymentLimit],
        mutationFn: async (createRequest: CreateAgentRequest) => {
            const response = await AgentsApi().agentCreate('root', createRequest);
            return response.data;
        },
    });
};

export const useUpdateAgentPaymentLimit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [AgentKey.updateAgentPaymentLimit],
        mutationFn: async (data: { agencyId: string; updateRequest: UpdateAgentRequest }) => {
            const response = await AgentsApi().agentUpdate(data.agencyId, 'root', data.updateRequest);
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
            const response = await AgentsApi().agentDelete(agencyId, 'root');
            return response.data;
        },
    });
};

export const useActiveRole = () => {
    return useMutation({
        mutationKey: [AgentKey.activeRole],
        mutationFn: async (agencyId: string) => {
            const response = await new RoleApi(undefined, AppConfig.ApiHost, getAxiosInstance()).roleActive(
                agencyId,
                'root',
            );
            return response.data;
        },
    });
};

export const useExportExcelAgents = () => {
    const response = async (request: ExportAgentRequest) => {
        const res = await AgentsApi().agentExport('root', request);
        return res.data;
    };

    return useMutation(['exportExcelAgents'], response);
};

export const useGetListBankDropdown = () => {
    const response = async (request: AnyObject) => {
        const res = await BankInfoApi().bankInforSearch('root', request);
        const responseMap =
            res.data?.data?.map(item => ({
                value: `${item.id}`,
                label: `${item?.bankCode} - ${item?.name}`,
            })) ?? [];
        return responseMap;
    };
    return useMutation(['FETCH_LIST_BANK_DROPDOWN'], response);
};
