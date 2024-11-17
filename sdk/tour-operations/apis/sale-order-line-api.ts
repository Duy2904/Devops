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
import { CreateSaleOrderLineRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfSaleOrderLineDto } from '../models';
// @ts-ignore
import { SaleOrderLineDto } from '../models';
// @ts-ignore
import { SearchSaleOrderLinesRequest } from '../models';
// @ts-ignore
import { UpdateSaleOrderLineRequest } from '../models';
/**
 * SaleOrderLineApi - axios parameter creator
 * @export
 */
export const SaleOrderLineApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new SaleOrderLine.
         * @param {string} tenant Description
         * @param {CreateSaleOrderLineRequest} createSaleOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineCreate: async (tenant: string, createSaleOrderLineRequest: CreateSaleOrderLineRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('saleOrderLineCreate', 'tenant', tenant)
            // verify required parameter 'createSaleOrderLineRequest' is not null or undefined
            assertParamExists('saleOrderLineCreate', 'createSaleOrderLineRequest', createSaleOrderLineRequest)
            const localVarPath = `/api/v1/saleorderline`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createSaleOrderLineRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a SaleOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('saleOrderLineDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('saleOrderLineDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/saleorderline/{id}`
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
         * @summary Get SaleOrderLine details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('saleOrderLineGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('saleOrderLineGet', 'tenant', tenant)
            const localVarPath = `/api/v1/saleorderline/{id}`
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
         * @summary Search SaleOrderLine using available filters.
         * @param {string} tenant Description
         * @param {SearchSaleOrderLinesRequest} searchSaleOrderLinesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineSearch: async (tenant: string, searchSaleOrderLinesRequest: SearchSaleOrderLinesRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('saleOrderLineSearch', 'tenant', tenant)
            // verify required parameter 'searchSaleOrderLinesRequest' is not null or undefined
            assertParamExists('saleOrderLineSearch', 'searchSaleOrderLinesRequest', searchSaleOrderLinesRequest)
            const localVarPath = `/api/v1/saleorderline/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchSaleOrderLinesRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a SaleOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateSaleOrderLineRequest} updateSaleOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineUpdate: async (id: string, tenant: string, updateSaleOrderLineRequest: UpdateSaleOrderLineRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('saleOrderLineUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('saleOrderLineUpdate', 'tenant', tenant)
            // verify required parameter 'updateSaleOrderLineRequest' is not null or undefined
            assertParamExists('saleOrderLineUpdate', 'updateSaleOrderLineRequest', updateSaleOrderLineRequest)
            const localVarPath = `/api/v1/saleorderline/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateSaleOrderLineRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SaleOrderLineApi - functional programming interface
 * @export
 */
export const SaleOrderLineApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SaleOrderLineApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new SaleOrderLine.
         * @param {string} tenant Description
         * @param {CreateSaleOrderLineRequest} createSaleOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saleOrderLineCreate(tenant: string, createSaleOrderLineRequest: CreateSaleOrderLineRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saleOrderLineCreate(tenant, createSaleOrderLineRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a SaleOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saleOrderLineDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saleOrderLineDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get SaleOrderLine details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saleOrderLineGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SaleOrderLineDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saleOrderLineGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search SaleOrderLine using available filters.
         * @param {string} tenant Description
         * @param {SearchSaleOrderLinesRequest} searchSaleOrderLinesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saleOrderLineSearch(tenant: string, searchSaleOrderLinesRequest: SearchSaleOrderLinesRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfSaleOrderLineDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saleOrderLineSearch(tenant, searchSaleOrderLinesRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a SaleOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateSaleOrderLineRequest} updateSaleOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saleOrderLineUpdate(id: string, tenant: string, updateSaleOrderLineRequest: UpdateSaleOrderLineRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saleOrderLineUpdate(id, tenant, updateSaleOrderLineRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SaleOrderLineApi - factory interface
 * @export
 */
export const SaleOrderLineApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SaleOrderLineApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new SaleOrderLine.
         * @param {string} tenant Description
         * @param {CreateSaleOrderLineRequest} createSaleOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineCreate(tenant: string, createSaleOrderLineRequest: CreateSaleOrderLineRequest, options?: any): AxiosPromise<string> {
            return localVarFp.saleOrderLineCreate(tenant, createSaleOrderLineRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a SaleOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.saleOrderLineDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get SaleOrderLine details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineGet(id: string, tenant: string, options?: any): AxiosPromise<SaleOrderLineDto> {
            return localVarFp.saleOrderLineGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search SaleOrderLine using available filters.
         * @param {string} tenant Description
         * @param {SearchSaleOrderLinesRequest} searchSaleOrderLinesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineSearch(tenant: string, searchSaleOrderLinesRequest: SearchSaleOrderLinesRequest, options?: any): AxiosPromise<PaginationResponseOfSaleOrderLineDto> {
            return localVarFp.saleOrderLineSearch(tenant, searchSaleOrderLinesRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a SaleOrderLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateSaleOrderLineRequest} updateSaleOrderLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineUpdate(id: string, tenant: string, updateSaleOrderLineRequest: UpdateSaleOrderLineRequest, options?: any): AxiosPromise<string> {
            return localVarFp.saleOrderLineUpdate(id, tenant, updateSaleOrderLineRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SaleOrderLineApi - object-oriented interface
 * @export
 * @class SaleOrderLineApi
 * @extends {BaseAPI}
 */
export class SaleOrderLineApi extends BaseAPI {
    /**
     * 
     * @summary Create a new SaleOrderLine.
     * @param {string} tenant Description
     * @param {CreateSaleOrderLineRequest} createSaleOrderLineRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaleOrderLineApi
     */
    public saleOrderLineCreate(tenant: string, createSaleOrderLineRequest: CreateSaleOrderLineRequest, options?: AxiosRequestConfig) {
        return SaleOrderLineApiFp(this.configuration).saleOrderLineCreate(tenant, createSaleOrderLineRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a SaleOrderLine.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaleOrderLineApi
     */
    public saleOrderLineDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return SaleOrderLineApiFp(this.configuration).saleOrderLineDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get SaleOrderLine details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaleOrderLineApi
     */
    public saleOrderLineGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return SaleOrderLineApiFp(this.configuration).saleOrderLineGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search SaleOrderLine using available filters.
     * @param {string} tenant Description
     * @param {SearchSaleOrderLinesRequest} searchSaleOrderLinesRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaleOrderLineApi
     */
    public saleOrderLineSearch(tenant: string, searchSaleOrderLinesRequest: SearchSaleOrderLinesRequest, options?: AxiosRequestConfig) {
        return SaleOrderLineApiFp(this.configuration).saleOrderLineSearch(tenant, searchSaleOrderLinesRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a SaleOrderLine.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateSaleOrderLineRequest} updateSaleOrderLineRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaleOrderLineApi
     */
    public saleOrderLineUpdate(id: string, tenant: string, updateSaleOrderLineRequest: UpdateSaleOrderLineRequest, options?: AxiosRequestConfig) {
        return SaleOrderLineApiFp(this.configuration).saleOrderLineUpdate(id, tenant, updateSaleOrderLineRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
