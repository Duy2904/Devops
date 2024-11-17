import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import { useQuery } from 'react-query';

import { AgentKey } from '@fragments/Management/Agent/Feature/key-type';
import { AgentApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

export const AgentDetailApi = () => {
    return new AgentApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetListGroupAgentDropdown = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');

    const requestFn = async () => {
        const response = await AgentDetailApi().agentSearch('hnh', request);
        return response.data;
    };

    return useQuery({
        queryKey: [AgentKey.getListGroupAgentDropdown, JSON.stringify(customKey)],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });
};
