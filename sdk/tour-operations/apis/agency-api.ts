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
import { Agency } from '../models';
// @ts-ignore
import { CreateAgencyRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { UpdateAgencyRequest } from '../models';
/**
 * AgencyApi - axios parameter creator
 * @export
 */
export const AgencyApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new info Agency.
         * @param {string} tenant Description
         * @param {CreateAgencyRequest} createAgencyRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyCreate: async (tenant: string, createAgencyRequest: CreateAgencyRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('agencyCreate', 'tenant', tenant)
            // verify required parameter 'createAgencyRequest' is not null or undefined
            assertParamExists('agencyCreate', 'createAgencyRequest', createAgencyRequest)
            const localVarPath = `/api/v1/agency`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createAgencyRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete info Agency.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('agencyDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('agencyDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/agency/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "Bearer", [], configuration)

            if (tenant != null) {
                localVarHeaderParameter['tenant'] = String(tenant);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get info Agency.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('agencyGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('agencyGet', 'tenant', tenant)
            const localVarPath = `/api/v1/agency/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "Bearer", [], configuration)

            if (tenant != null) {
                localVarHeaderParameter['tenant'] = String(tenant);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update info Agency.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateAgencyRequest} updateAgencyRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyUpdate: async (id: string, tenant: string, updateAgencyRequest: UpdateAgencyRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('agencyUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('agencyUpdate', 'tenant', tenant)
            // verify required parameter 'updateAgencyRequest' is not null or undefined
            assertParamExists('agencyUpdate', 'updateAgencyRequest', updateAgencyRequest)
            const localVarPath = `/api/v1/agency/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateAgencyRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AgencyApi - functional programming interface
 * @export
 */
export const AgencyApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AgencyApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new info Agency.
         * @param {string} tenant Description
         * @param {CreateAgencyRequest} createAgencyRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async agencyCreate(tenant: string, createAgencyRequest: CreateAgencyRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.agencyCreate(tenant, createAgencyRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete info Agency.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async agencyDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.agencyDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get info Agency.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async agencyGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Agency>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.agencyGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update info Agency.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateAgencyRequest} updateAgencyRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async agencyUpdate(id: string, tenant: string, updateAgencyRequest: UpdateAgencyRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.agencyUpdate(id, tenant, updateAgencyRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AgencyApi - factory interface
 * @export
 */
export const AgencyApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AgencyApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new info Agency.
         * @param {string} tenant Description
         * @param {CreateAgencyRequest} createAgencyRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyCreate(tenant: string, createAgencyRequest: CreateAgencyRequest, options?: any): AxiosPromise<string> {
            return localVarFp.agencyCreate(tenant, createAgencyRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete info Agency.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.agencyDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get info Agency.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyGet(id: string, tenant: string, options?: any): AxiosPromise<Agency> {
            return localVarFp.agencyGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update info Agency.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateAgencyRequest} updateAgencyRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agencyUpdate(id: string, tenant: string, updateAgencyRequest: UpdateAgencyRequest, options?: any): AxiosPromise<string> {
            return localVarFp.agencyUpdate(id, tenant, updateAgencyRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AgencyApi - object-oriented interface
 * @export
 * @class AgencyApi
 * @extends {BaseAPI}
 */
export class AgencyApi extends BaseAPI {
    /**
     * 
     * @summary Create a new info Agency.
     * @param {string} tenant Description
     * @param {CreateAgencyRequest} createAgencyRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AgencyApi
     */
    public agencyCreate(tenant: string, createAgencyRequest: CreateAgencyRequest, options?: AxiosRequestConfig) {
        return AgencyApiFp(this.configuration).agencyCreate(tenant, createAgencyRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete info Agency.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AgencyApi
     */
    public agencyDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return AgencyApiFp(this.configuration).agencyDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get info Agency.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AgencyApi
     */
    public agencyGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return AgencyApiFp(this.configuration).agencyGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update info Agency.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateAgencyRequest} updateAgencyRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AgencyApi
     */
    public agencyUpdate(id: string, tenant: string, updateAgencyRequest: UpdateAgencyRequest, options?: AxiosRequestConfig) {
        return AgencyApiFp(this.configuration).agencyUpdate(id, tenant, updateAgencyRequest, options).then((request) => request(this.axios, this.basePath));
    }
}