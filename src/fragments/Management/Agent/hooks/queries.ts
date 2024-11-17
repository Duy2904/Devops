import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import { useQuery } from 'react-query';

import { AgentApi, EmployeeApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

import { AgentKey } from '../Feature/key-type';

export const AgentPaymentLimitApi = () => {
    return new AgentApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const EmployeesApi = () => {
    return new EmployeeApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchAgentPaymentLimit = (agentId: string) => {
    const requestFn = async () => {
        const response = await AgentPaymentLimitApi().agentGet(agentId, 'root');
        return response.data;
    };

    return useQuery({
        queryKey: [AgentKey.fetchAgentPaymentLimit, agentId],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!agentId,
    });
};

export const useFetchEmployeesDropdown = () => {
    const requestFn = async () => {
        const response = await EmployeesApi().employeeGetDropdown('root');
        return response.data;
    };

    return useQuery({
        queryKey: [AgentKey.fetchEmployeesDropdown],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};

export const useGetListGroupAgent = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');

    const requestFn = async () => {
        const response = await AgentPaymentLimitApi().agentSearch('hnh', request);
        return response.data;
    };

    return useQuery({
        queryKey: [AgentKey.getListGroupAgent, JSON.stringify(customKey)],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });
};
