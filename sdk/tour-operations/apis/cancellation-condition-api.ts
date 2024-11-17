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
import { CreateCancellationConditionCollectionRequest } from '../models';
// @ts-ignore
import { CreateCancellationConditionRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { UpdateCancellationConditionRequest } from '../models';
/**
 * CancellationConditionApi - axios parameter creator
 * @export
 */
export const CancellationConditionApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new CancellationCondition.
         * @param {string} tenant Description
         * @param {CreateCancellationConditionRequest} createCancellationConditionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancellationConditionCreate: async (tenant: string, createCancellationConditionRequest: CreateCancellationConditionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('cancellationConditionCreate', 'tenant', tenant)
            // verify required parameter 'createCancellationConditionRequest' is not null or undefined
            assertParamExists('cancellationConditionCreate', 'createCancellationConditionRequest', createCancellationConditionRequest)
            const localVarPath = `/api/v1/cancellationcondition`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createCancellationConditionRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Create a CancellationCondition collection.
         * @param {string} tenant Description
         * @param {CreateCancellationConditionCollectionRequest} createCancellationConditionCollectionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancellationConditionCreateCollection: async (tenant: string, createCancellationConditionCollectionRequest: CreateCancellationConditionCollectionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('cancellationConditionCreateCollection', 'tenant', tenant)
            // verify required parameter 'createCancellationConditionCollectionRequest' is not null or undefined
            assertParamExists('cancellationConditionCreateCollection', 'createCancellationConditionCollectionRequest', createCancellationConditionCollectionRequest)
            const localVarPath = `/api/v1/cancellationcondition/collection`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createCancellationConditionCollectionRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a CancellationCondition.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancellationConditionDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('cancellationConditionDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('cancellationConditionDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/cancellationcondition/{id}`
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
         * @summary Update a CancellationCondition.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateCancellationConditionRequest} updateCancellationConditionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancellationConditionUpdate: async (id: string, tenant: string, updateCancellationConditionRequest: UpdateCancellationConditionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('cancellationConditionUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('cancellationConditionUpdate', 'tenant', tenant)
            // verify required parameter 'updateCancellationConditionRequest' is not null or undefined
            assertParamExists('cancellationConditionUpdate', 'updateCancellationConditionRequest', updateCancellationConditionRequest)
            const localVarPath = `/api/v1/cancellationcondition/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateCancellationConditionRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CancellationConditionApi - functional programming interface
 * @export
 */
export const CancellationConditionApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CancellationConditionApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new CancellationCondition.
         * @param {string} tenant Description
         * @param {CreateCancellationConditionRequest} createCancellationConditionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async cancellationConditionCreate(tenant: string, createCancellationConditionRequest: CreateCancellationConditionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.cancellationConditionCreate(tenant, createCancellationConditionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Create a CancellationCondition collection.
         * @param {string} tenant Description
         * @param {CreateCancellationConditionCollectionRequest} createCancellationConditionCollectionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async cancellationConditionCreateCollection(tenant: string, createCancellationConditionCollectionRequest: CreateCancellationConditionCollectionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.cancellationConditionCreateCollection(tenant, createCancellationConditionCollectionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a CancellationCondition.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async cancellationConditionDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.cancellationConditionDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a CancellationCondition.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateCancellationConditionRequest} updateCancellationConditionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async cancellationConditionUpdate(id: string, tenant: string, updateCancellationConditionRequest: UpdateCancellationConditionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.cancellationConditionUpdate(id, tenant, updateCancellationConditionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CancellationConditionApi - factory interface
 * @export
 */
export const CancellationConditionApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CancellationConditionApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new CancellationCondition.
         * @param {string} tenant Description
         * @param {CreateCancellationConditionRequest} createCancellationConditionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancellationConditionCreate(tenant: string, createCancellationConditionRequest: CreateCancellationConditionRequest, options?: any): AxiosPromise<string> {
            return localVarFp.cancellationConditionCreate(tenant, createCancellationConditionRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Create a CancellationCondition collection.
         * @param {string} tenant Description
         * @param {CreateCancellationConditionCollectionRequest} createCancellationConditionCollectionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancellationConditionCreateCollection(tenant: string, createCancellationConditionCollectionRequest: CreateCancellationConditionCollectionRequest, options?: any): AxiosPromise<number> {
            return localVarFp.cancellationConditionCreateCollection(tenant, createCancellationConditionCollectionRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a CancellationCondition.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancellationConditionDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.cancellationConditionDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a CancellationCondition.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateCancellationConditionRequest} updateCancellationConditionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancellationConditionUpdate(id: string, tenant: string, updateCancellationConditionRequest: UpdateCancellationConditionRequest, options?: any): AxiosPromise<string> {
            return localVarFp.cancellationConditionUpdate(id, tenant, updateCancellationConditionRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CancellationConditionApi - object-oriented interface
 * @export
 * @class CancellationConditionApi
 * @extends {BaseAPI}
 */
export class CancellationConditionApi extends BaseAPI {
    /**
     * 
     * @summary Create a new CancellationCondition.
     * @param {string} tenant Description
     * @param {CreateCancellationConditionRequest} createCancellationConditionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CancellationConditionApi
     */
    public cancellationConditionCreate(tenant: string, createCancellationConditionRequest: CreateCancellationConditionRequest, options?: AxiosRequestConfig) {
        return CancellationConditionApiFp(this.configuration).cancellationConditionCreate(tenant, createCancellationConditionRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Create a CancellationCondition collection.
     * @param {string} tenant Description
     * @param {CreateCancellationConditionCollectionRequest} createCancellationConditionCollectionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CancellationConditionApi
     */
    public cancellationConditionCreateCollection(tenant: string, createCancellationConditionCollectionRequest: CreateCancellationConditionCollectionRequest, options?: AxiosRequestConfig) {
        return CancellationConditionApiFp(this.configuration).cancellationConditionCreateCollection(tenant, createCancellationConditionCollectionRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a CancellationCondition.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CancellationConditionApi
     */
    public cancellationConditionDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return CancellationConditionApiFp(this.configuration).cancellationConditionDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a CancellationCondition.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateCancellationConditionRequest} updateCancellationConditionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CancellationConditionApi
     */
    public cancellationConditionUpdate(id: string, tenant: string, updateCancellationConditionRequest: UpdateCancellationConditionRequest, options?: AxiosRequestConfig) {
        return CancellationConditionApiFp(this.configuration).cancellationConditionUpdate(id, tenant, updateCancellationConditionRequest, options).then((request) => request(this.axios, this.basePath));
    }
}