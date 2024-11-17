import { AnyObject } from 'antd/es/_util/type';
import { useMutation } from 'react-query';

import { AppConfig } from '@utils/config';
import { AgentApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';

export const AgentDetailApi = () => {
    return new AgentApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetListAgentDropdown = () => {
    const response = async (request: AnyObject) => {
        const res = await AgentDetailApi().agentDropdown('root', request);
        const responseMap =
            res.data?.map(item => ({
                value: `${item.id}`,
                label: `${item?.name}`,
            })) ?? [];
        return responseMap;
    };
    return useMutation(['FETCH_LIST_AGENT_DROPDOWN'], response);
};
