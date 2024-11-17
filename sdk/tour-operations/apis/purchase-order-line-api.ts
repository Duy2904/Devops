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
import { CreatePurchaseOrderLineRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfPurchaseOrderLineDto } from '../models';
// @ts-ignore
import { PurchaseOrderLineDto } from '../models';
// @ts-ignore
import { SearchPurchaseOrderLinesRequest } from '../models';
// @ts-ignore
import { UpdatePurchaseOrderLineRequest } from '../models';
/**
 * PurchaseOrderLineApi - axios parameter creator
 * @export
 */
export const PurchaseOrderLineApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new PurchaseOrderLine.
         * @param {string} tenant Description
         * @param {CreatePurchaseOrderLineRequest} createPurchaseOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderLineCreate: async (tenant: string, createPurchaseOrderLineRequest: CreatePurchaseOrderLineRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('purchaseOrderLineCreate', 'tenant', tenant)
            // verify required parameter 'createPurchaseOrderLineRequest' is not null or undefined
            assertParamExists('purchaseOrderLineCreate', 'createPurchaseOrderLineRequest', createPurchaseOrderLineRequest)
            const localVarPath = `/api/v1/purchaseorderline`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createPurchaseOrderLineRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a PurchaseOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderLineDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('purchaseOrderLineDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('purchaseOrderLineDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/purchaseorderline/{id}`
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
         * @summary Get PurchaseOrderLine details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderLineGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('purchaseOrderLineGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('purchaseOrderLineGet', 'tenant', tenant)
            const localVarPath = `/api/v1/purchaseorderline/{id}`
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
         * @summary Search PurchaseOrderLine using available filters.
         * @param {string} tenant Description
         * @param {SearchPurchaseOrderLinesRequest} searchPurchaseOrderLinesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderLineSearch: async (tenant: string, searchPurchaseOrderLinesRequest: SearchPurchaseOrderLinesRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('purchaseOrderLineSearch', 'tenant', tenant)
            // verify required parameter 'searchPurchaseOrderLinesRequest' is not null or undefined
            assertParamExists('purchaseOrderLineSearch', 'searchPurchaseOrderLinesRequest', searchPurchaseOrderLinesRequest)
            const localVarPath = `/api/v1/purchaseorderline/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchPurchaseOrderLinesRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a PurchaseOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePurchaseOrderLineRequest} updatePurchaseOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderLineUpdate: async (id: string, tenant: string, updatePurchaseOrderLineRequest: UpdatePurchaseOrderLineRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('purchaseOrderLineUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('purchaseOrderLineUpdate', 'tenant', tenant)
            // verify required parameter 'updatePurchaseOrderLineRequest' is not null or undefined
            assertParamExists('purchaseOrderLineUpdate', 'updatePurchaseOrderLineRequest', updatePurchaseOrderLineRequest)
            const localVarPath = `/api/v1/purchaseorderline/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updatePurchaseOrderLineRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PurchaseOrderLineApi - functional programming interface
 * @export
 */
export const PurchaseOrderLineApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PurchaseOrderLineApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new PurchaseOrderLine.
         * @param {string} tenant Description
         * @param {CreatePurchaseOrderLineRequest} createPurchaseOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async purchaseOrderLineCreate(tenant: string, createPurchaseOrderLineRequest: CreatePurchaseOrderLineRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.purchaseOrderLineCreate(tenant, createPurchaseOrderLineRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a PurchaseOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async purchaseOrderLineDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.purchaseOrderLineDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get PurchaseOrderLine details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async purchaseOrderLineGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PurchaseOrderLineDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.purchaseOrderLineGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search PurchaseOrderLine using available filters.
         * @param {string} tenant Description
         * @param {SearchPurchaseOrderLinesRequest} searchPurchaseOrderLinesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async purchaseOrderLineSearch(tenant: string, searchPurchaseOrderLinesRequest: SearchPurchaseOrderLinesRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfPurchaseOrderLineDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.purchaseOrderLineSearch(tenant, searchPurchaseOrderLinesRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a PurchaseOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePurchaseOrderLineRequest} updatePurchaseOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async purchaseOrderLineUpdate(id: string, tenant: string, updatePurchaseOrderLineRequest: UpdatePurchaseOrderLineRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.purchaseOrderLineUpdate(id, tenant, updatePurchaseOrderLineRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PurchaseOrderLineApi - factory interface
 * @export
 */
export const PurchaseOrderLineApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PurchaseOrderLineApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new PurchaseOrderLine.
         * @param {string} tenant Description
         * @param {CreatePurchaseOrderLineRequest} createPurchaseOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderLineCreate(tenant: string, createPurchaseOrderLineRequest: CreatePurchaseOrderLineRequest, options?: any): AxiosPromise<string> {
            return localVarFp.purchaseOrderLineCreate(tenant, createPurchaseOrderLineRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a PurchaseOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderLineDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.purchaseOrderLineDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get PurchaseOrderLine details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderLineGet(id: string, tenant: string, options?: any): AxiosPromise<PurchaseOrderLineDto> {
            return localVarFp.purchaseOrderLineGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search PurchaseOrderLine using available filters.
         * @param {string} tenant Description
         * @param {SearchPurchaseOrderLinesRequest} searchPurchaseOrderLinesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderLineSearch(tenant: string, searchPurchaseOrderLinesRequest: SearchPurchaseOrderLinesRequest, options?: any): AxiosPromise<PaginationResponseOfPurchaseOrderLineDto> {
            return localVarFp.purchaseOrderLineSearch(tenant, searchPurchaseOrderLinesRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a PurchaseOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePurchaseOrderLineRequest} updatePurchaseOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderLineUpdate(id: string, tenant: string, updatePurchaseOrderLineRequest: UpdatePurchaseOrderLineRequest, options?: any): AxiosPromise<string> {
            return localVarFp.purchaseOrderLineUpdate(id, tenant, updatePurchaseOrderLineRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PurchaseOrderLineApi - object-oriented interface
 * @export
 * @class PurchaseOrderLineApi
 * @extends {BaseAPI}
 */
export class PurchaseOrderLineApi extends BaseAPI {
    /**
     * 
     * @summary Create a new PurchaseOrderLine.
     * @param {string} tenant Description
     * @param {CreatePurchaseOrderLineRequest} createPurchaseOrderLineRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PurchaseOrderLineApi
     */
    public purchaseOrderLineCreate(tenant: string, createPurchaseOrderLineRequest: CreatePurchaseOrderLineRequest, options?: AxiosRequestConfig) {
        return PurchaseOrderLineApiFp(this.configuration).purchaseOrderLineCreate(tenant, createPurchaseOrderLineRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a PurchaseOrderLine.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PurchaseOrderLineApi
     */
    public purchaseOrderLineDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return PurchaseOrderLineApiFp(this.configuration).purchaseOrderLineDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get PurchaseOrderLine details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PurchaseOrderLineApi
     */
    public purchaseOrderLineGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return PurchaseOrderLineApiFp(this.configuration).purchaseOrderLineGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search PurchaseOrderLine using available filters.
     * @param {string} tenant Description
     * @param {SearchPurchaseOrderLinesRequest} searchPurchaseOrderLinesRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PurchaseOrderLineApi
     */
    public purchaseOrderLineSearch(tenant: string, searchPurchaseOrderLinesRequest: SearchPurchaseOrderLinesRequest, options?: AxiosRequestConfig) {
        return PurchaseOrderLineApiFp(this.configuration).purchaseOrderLineSearch(tenant, searchPurchaseOrderLinesRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a PurchaseOrderLine.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdatePurchaseOrderLineRequest} updatePurchaseOrderLineRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PurchaseOrderLineApi
     */
    public purchaseOrderLineUpdate(id: string, tenant: string, updatePurchaseOrderLineRequest: UpdatePurchaseOrderLineRequest, options?: AxiosRequestConfig) {
        return PurchaseOrderLineApiFp(this.configuration).purchaseOrderLineUpdate(id, tenant, updatePurchaseOrderLineRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
