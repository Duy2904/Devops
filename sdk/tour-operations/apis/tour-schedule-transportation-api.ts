/* tslint:disable */
/* eslint-disable */
/**
 * WebAPI - Tour Operation
 * Clean Architecture Tour Operation for .NET 7 WebApi built with Multitenancy Support.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { CreateTourScheduleTransportationsRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
/**
 * TourScheduleTransportationApi - axios parameter creator
 * @export
 */
export const TourScheduleTransportationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create list transportations.
         * @param {string} tenant Description
         * @param {CreateTourScheduleTransportationsRequest} createTourScheduleTransportationsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourScheduleTransportationCreate: async (tenant: string, createTourScheduleTransportationsRequest: CreateTourScheduleTransportationsRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('tourScheduleTransportationCreate', 'tenant', tenant)
            // verify required parameter 'createTourScheduleTransportationsRequest' is not null or undefined
            assertParamExists('tourScheduleTransportationCreate', 'createTourScheduleTransportationsRequest', createTourScheduleTransportationsRequest)
            const localVarPath = `/api/v1/tourscheduletransportation`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "Bearer", [], configuration)

            if (tenant != null) {
                localVarHeaderParameter['tenant'] = String(tenant);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createTourScheduleTransportationsRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TourScheduleTransportationApi - functional programming interface
 * @export
 */
export const TourScheduleTransportationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TourScheduleTransportationApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create list transportations.
         * @param {string} tenant Description
         * @param {CreateTourScheduleTransportationsRequest} createTourScheduleTransportationsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tourScheduleTransportationCreate(tenant: string, createTourScheduleTransportationsRequest: CreateTourScheduleTransportationsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tourScheduleTransportationCreate(tenant, createTourScheduleTransportationsRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TourScheduleTransportationApi - factory interface
 * @export
 */
export const TourScheduleTransportationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TourScheduleTransportationApiFp(configuration)
    return {
        /**
         * 
         * @summary Create list transportations.
         * @param {string} tenant Description
         * @param {CreateTourScheduleTransportationsRequest} createTourScheduleTransportationsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourScheduleTransportationCreate(tenant: string, createTourScheduleTransportationsRequest: CreateTourScheduleTransportationsRequest, options?: any): AxiosPromise<number> {
            return localVarFp.tourScheduleTransportationCreate(tenant, createTourScheduleTransportationsRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TourScheduleTransportationApi - object-oriented interface
 * @export
 * @class TourScheduleTransportationApi
 * @extends {BaseAPI}
 */
export class TourScheduleTransportationApi extends BaseAPI {
    /**
     * 
     * @summary Create list transportations.
     * @param {string} tenant Description
     * @param {CreateTourScheduleTransportationsRequest} createTourScheduleTransportationsRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TourScheduleTransportationApi
     */
    public tourScheduleTransportationCreate(tenant: string, createTourScheduleTransportationsRequest: CreateTourScheduleTransportationsRequest, options?: AxiosRequestConfig) {
        return TourScheduleTransportationApiFp(this.configuration).tourScheduleTransportationCreate(tenant, createTourScheduleTransportationsRequest, options).then((request) => request(this.axios, this.basePath));
    }
}