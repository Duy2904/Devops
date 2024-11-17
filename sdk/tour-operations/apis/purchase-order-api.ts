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
import { CreatePurchaseOrderRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PurchaseOrderDto } from '../models';
// @ts-ignore
import { PurchaseOrderPaginationDto } from '../models';
// @ts-ignore
import { SearchPurchaseOrdersRequest } from '../models';
// @ts-ignore
import { UpdatePurchaseOrderRequest } from '../models';
/**
 * PurchaseOrderApi - axios parameter creator
 * @export
 */
export const PurchaseOrderApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new PurchaseOrder.
         * @param {string} tenant Description
         * @param {CreatePurchaseOrderRequest} createPurchaseOrderRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderCreate: async (tenant: string, createPurchaseOrderRequest: CreatePurchaseOrderRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('purchaseOrderCreate', 'tenant', tenant)
            // verify required parameter 'createPurchaseOrderRequest' is not null or undefined
            assertParamExists('purchaseOrderCreate', 'createPurchaseOrderRequest', createPurchaseOrderRequest)
            const localVarPath = `/api/v1/purchaseorder`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createPurchaseOrderRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a PurchaseOrder.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('purchaseOrderDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('purchaseOrderDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/purchaseorder/{id}`
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
         * @summary Get PurchaseOrder details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('purchaseOrderGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('purchaseOrderGet', 'tenant', tenant)
            const localVarPath = `/api/v1/purchaseorder/{id}`
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
         * @summary Search PurchaseOrder using available filters.
         * @param {string} tenant Description
         * @param {SearchPurchaseOrdersRequest} searchPurchaseOrdersRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderSearch: async (tenant: string, searchPurchaseOrdersRequest: SearchPurchaseOrdersRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('purchaseOrderSearch', 'tenant', tenant)
            // verify required parameter 'searchPurchaseOrdersRequest' is not null or undefined
            assertParamExists('purchaseOrderSearch', 'searchPurchaseOrdersRequest', searchPurchaseOrdersRequest)
            const localVarPath = `/api/v1/purchaseorder/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchPurchaseOrdersRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a PurchaseOrder.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePurchaseOrderRequest} updatePurchaseOrderRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderUpdate: async (id: string, tenant: string, updatePurchaseOrderRequest: UpdatePurchaseOrderRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('purchaseOrderUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('purchaseOrderUpdate', 'tenant', tenant)
            // verify required parameter 'updatePurchaseOrderRequest' is not null or undefined
            assertParamExists('purchaseOrderUpdate', 'updatePurchaseOrderRequest', updatePurchaseOrderRequest)
            const localVarPath = `/api/v1/purchaseorder/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updatePurchaseOrderRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PurchaseOrderApi - functional programming interface
 * @export
 */
export const PurchaseOrderApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PurchaseOrderApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new PurchaseOrder.
         * @param {string} tenant Description
         * @param {CreatePurchaseOrderRequest} createPurchaseOrderRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async purchaseOrderCreate(tenant: string, createPurchaseOrderRequest: CreatePurchaseOrderRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.purchaseOrderCreate(tenant, createPurchaseOrderRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a PurchaseOrder.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async purchaseOrderDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.purchaseOrderDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get PurchaseOrder details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async purchaseOrderGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PurchaseOrderDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.purchaseOrderGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search PurchaseOrder using available filters.
         * @param {string} tenant Description
         * @param {SearchPurchaseOrdersRequest} searchPurchaseOrdersRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async purchaseOrderSearch(tenant: string, searchPurchaseOrdersRequest: SearchPurchaseOrdersRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PurchaseOrderPaginationDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.purchaseOrderSearch(tenant, searchPurchaseOrdersRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a PurchaseOrder.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePurchaseOrderRequest} updatePurchaseOrderRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async purchaseOrderUpdate(id: string, tenant: string, updatePurchaseOrderRequest: UpdatePurchaseOrderRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.purchaseOrderUpdate(id, tenant, updatePurchaseOrderRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PurchaseOrderApi - factory interface
 * @export
 */
export const PurchaseOrderApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PurchaseOrderApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new PurchaseOrder.
         * @param {string} tenant Description
         * @param {CreatePurchaseOrderRequest} createPurchaseOrderRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderCreate(tenant: string, createPurchaseOrderRequest: CreatePurchaseOrderRequest, options?: any): AxiosPromise<string> {
            return localVarFp.purchaseOrderCreate(tenant, createPurchaseOrderRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a PurchaseOrder.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.purchaseOrderDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get PurchaseOrder details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderGet(id: string, tenant: string, options?: any): AxiosPromise<PurchaseOrderDto> {
            return localVarFp.purchaseOrderGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search PurchaseOrder using available filters.
         * @param {string} tenant Description
         * @param {SearchPurchaseOrdersRequest} searchPurchaseOrdersRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderSearch(tenant: string, searchPurchaseOrdersRequest: SearchPurchaseOrdersRequest, options?: any): AxiosPromise<PurchaseOrderPaginationDto> {
            return localVarFp.purchaseOrderSearch(tenant, searchPurchaseOrdersRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a PurchaseOrder.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePurchaseOrderRequest} updatePurchaseOrderRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        purchaseOrderUpdate(id: string, tenant: string, updatePurchaseOrderRequest: UpdatePurchaseOrderRequest, options?: any): AxiosPromise<string> {
            return localVarFp.purchaseOrderUpdate(id, tenant, updatePurchaseOrderRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PurchaseOrderApi - object-oriented interface
 * @export
 * @class PurchaseOrderApi
 * @extends {BaseAPI}
 */
export class PurchaseOrderApi extends BaseAPI {
    /**
     * 
     * @summary Create a new PurchaseOrder.
     * @param {string} tenant Description
     * @param {CreatePurchaseOrderRequest} createPurchaseOrderRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PurchaseOrderApi
     */
    public purchaseOrderCreate(tenant: string, createPurchaseOrderRequest: CreatePurchaseOrderRequest, options?: AxiosRequestConfig) {
        return PurchaseOrderApiFp(this.configuration).purchaseOrderCreate(tenant, createPurchaseOrderRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a PurchaseOrder.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PurchaseOrderApi
     */
    public purchaseOrderDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return PurchaseOrderApiFp(this.configuration).purchaseOrderDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get PurchaseOrder details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PurchaseOrderApi
     */
    public purchaseOrderGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return PurchaseOrderApiFp(this.configuration).purchaseOrderGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search PurchaseOrder using available filters.
     * @param {string} tenant Description
     * @param {SearchPurchaseOrdersRequest} searchPurchaseOrdersRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PurchaseOrderApi
     */
    public purchaseOrderSearch(tenant: string, searchPurchaseOrdersRequest: SearchPurchaseOrdersRequest, options?: AxiosRequestConfig) {
        return PurchaseOrderApiFp(this.configuration).purchaseOrderSearch(tenant, searchPurchaseOrdersRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a PurchaseOrder.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdatePurchaseOrderRequest} updatePurchaseOrderRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PurchaseOrderApi
     */
    public purchaseOrderUpdate(id: string, tenant: string, updatePurchaseOrderRequest: UpdatePurchaseOrderRequest, options?: AxiosRequestConfig) {
        return PurchaseOrderApiFp(this.configuration).purchaseOrderUpdate(id, tenant, updatePurchaseOrderRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
