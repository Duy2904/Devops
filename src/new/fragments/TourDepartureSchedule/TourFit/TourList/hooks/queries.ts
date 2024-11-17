import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { TourFitApi } from '@sdk/tour-operations';
import _ from 'lodash';
import { filterAdvanceListTourFit } from '@utils/filterSearch';
import { getAxiosInstance } from '@services/auth';
import { mapSearchRequest } from '../features';
import { useQuery } from 'react-query';

export const getTourFitApi = () => {
    return new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

// get list tour Fit
export const useGetListTourFit = (request: AnyObject) => {
    const customRequest = {
        ...request,
        advancedFilter: filterAdvanceListTourFit(),
    };
    const response = async () => {
        const res = await getTourFitApi().tourFitSearchV2('root', mapSearchRequest(customRequest));
        return res.data;
    };
    const customKey = _.omit(request, 'pagination.total');
    return useQuery(['getListTourFit', JSON.stringify(customKey)], response, {
        refetchOnWindowFocus: false,
        enabled: !!request,
    });
};
