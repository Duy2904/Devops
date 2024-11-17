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
import { CreateSaleOrderLineTravellerRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfSaleOrderLineTravellerDto } from '../models';
// @ts-ignore
import { SaleOrderLineTravellerDto } from '../models';
// @ts-ignore
import { SearchSaleOrderLineTravellersRequest } from '../models';
// @ts-ignore
import { UpdateSaleOrderLineTravellerRequest } from '../models';
/**
 * SaleOrderLineTravellerApi - axios parameter creator
 * @export
 */
export const SaleOrderLineTravellerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new SaleOrderLineTraveller.
         * @param {string} tenant Description
         * @param {CreateSaleOrderLineTravellerRequest} createSaleOrderLineTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineTravellerCreate: async (tenant: string, createSaleOrderLineTravellerRequest: CreateSaleOrderLineTravellerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('saleOrderLineTravellerCreate', 'tenant', tenant)
            // verify required parameter 'createSaleOrderLineTravellerRequest' is not null or undefined
            assertParamExists('saleOrderLineTravellerCreate', 'createSaleOrderLineTravellerRequest', createSaleOrderLineTravellerRequest)
            const localVarPath = `/api/v1/saleorderlinetraveller`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createSaleOrderLineTravellerRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a SaleOrderLineTraveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineTravellerDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('saleOrderLineTravellerDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('saleOrderLineTravellerDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/saleorderlinetraveller/{id}`
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
         * @summary Get SaleOrderLineTraveller details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineTravellerGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('saleOrderLineTravellerGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('saleOrderLineTravellerGet', 'tenant', tenant)
            const localVarPath = `/api/v1/saleorderlinetraveller/{id}`
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
         * @summary Search SaleOrderLineTraveller using available filters.
         * @param {string} tenant Description
         * @param {SearchSaleOrderLineTravellersRequest} searchSaleOrderLineTravellersRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineTravellerSearch: async (tenant: string, searchSaleOrderLineTravellersRequest: SearchSaleOrderLineTravellersRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('saleOrderLineTravellerSearch', 'tenant', tenant)
            // verify required parameter 'searchSaleOrderLineTravellersRequest' is not null or undefined
            assertParamExists('saleOrderLineTravellerSearch', 'searchSaleOrderLineTravellersRequest', searchSaleOrderLineTravellersRequest)
            const localVarPath = `/api/v1/saleorderlinetraveller/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchSaleOrderLineTravellersRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a SaleOrderLineTraveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateSaleOrderLineTravellerRequest} updateSaleOrderLineTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineTravellerUpdate: async (id: string, tenant: string, updateSaleOrderLineTravellerRequest: UpdateSaleOrderLineTravellerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('saleOrderLineTravellerUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('saleOrderLineTravellerUpdate', 'tenant', tenant)
            // verify required parameter 'updateSaleOrderLineTravellerRequest' is not null or undefined
            assertParamExists('saleOrderLineTravellerUpdate', 'updateSaleOrderLineTravellerRequest', updateSaleOrderLineTravellerRequest)
            const localVarPath = `/api/v1/saleorderlinetraveller/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateSaleOrderLineTravellerRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SaleOrderLineTravellerApi - functional programming interface
 * @export
 */
export const SaleOrderLineTravellerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SaleOrderLineTravellerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new SaleOrderLineTraveller.
         * @param {string} tenant Description
         * @param {CreateSaleOrderLineTravellerRequest} createSaleOrderLineTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saleOrderLineTravellerCreate(tenant: string, createSaleOrderLineTravellerRequest: CreateSaleOrderLineTravellerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saleOrderLineTravellerCreate(tenant, createSaleOrderLineTravellerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a SaleOrderLineTraveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saleOrderLineTravellerDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saleOrderLineTravellerDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get SaleOrderLineTraveller details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saleOrderLineTravellerGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SaleOrderLineTravellerDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saleOrderLineTravellerGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search SaleOrderLineTraveller using available filters.
         * @param {string} tenant Description
         * @param {SearchSaleOrderLineTravellersRequest} searchSaleOrderLineTravellersRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saleOrderLineTravellerSearch(tenant: string, searchSaleOrderLineTravellersRequest: SearchSaleOrderLineTravellersRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfSaleOrderLineTravellerDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saleOrderLineTravellerSearch(tenant, searchSaleOrderLineTravellersRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a SaleOrderLineTraveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateSaleOrderLineTravellerRequest} updateSaleOrderLineTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async saleOrderLineTravellerUpdate(id: string, tenant: string, updateSaleOrderLineTravellerRequest: UpdateSaleOrderLineTravellerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.saleOrderLineTravellerUpdate(id, tenant, updateSaleOrderLineTravellerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SaleOrderLineTravellerApi - factory interface
 * @export
 */
export const SaleOrderLineTravellerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SaleOrderLineTravellerApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new SaleOrderLineTraveller.
         * @param {string} tenant Description
         * @param {CreateSaleOrderLineTravellerRequest} createSaleOrderLineTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineTravellerCreate(tenant: string, createSaleOrderLineTravellerRequest: CreateSaleOrderLineTravellerRequest, options?: any): AxiosPromise<string> {
            return localVarFp.saleOrderLineTravellerCreate(tenant, createSaleOrderLineTravellerRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a SaleOrderLineTraveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineTravellerDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.saleOrderLineTravellerDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get SaleOrderLineTraveller details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineTravellerGet(id: string, tenant: string, options?: any): AxiosPromise<SaleOrderLineTravellerDto> {
            return localVarFp.saleOrderLineTravellerGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search SaleOrderLineTraveller using available filters.
         * @param {string} tenant Description
         * @param {SearchSaleOrderLineTravellersRequest} searchSaleOrderLineTravellersRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineTravellerSearch(tenant: string, searchSaleOrderLineTravellersRequest: SearchSaleOrderLineTravellersRequest, options?: any): AxiosPromise<PaginationResponseOfSaleOrderLineTravellerDto> {
            return localVarFp.saleOrderLineTravellerSearch(tenant, searchSaleOrderLineTravellersRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a SaleOrderLineTraveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateSaleOrderLineTravellerRequest} updateSaleOrderLineTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        saleOrderLineTravellerUpdate(id: string, tenant: string, updateSaleOrderLineTravellerRequest: UpdateSaleOrderLineTravellerRequest, options?: any): AxiosPromise<string> {
            return localVarFp.saleOrderLineTravellerUpdate(id, tenant, updateSaleOrderLineTravellerRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SaleOrderLineTravellerApi - object-oriented interface
 * @export
 * @class SaleOrderLineTravellerApi
 * @extends {BaseAPI}
 */
export class SaleOrderLineTravellerApi extends BaseAPI {
    /**
     * 
     * @summary Create a new SaleOrderLineTraveller.
     * @param {string} tenant Description
     * @param {CreateSaleOrderLineTravellerRequest} createSaleOrderLineTravellerRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaleOrderLineTravellerApi
     */
    public saleOrderLineTravellerCreate(tenant: string, createSaleOrderLineTravellerRequest: CreateSaleOrderLineTravellerRequest, options?: AxiosRequestConfig) {
        return SaleOrderLineTravellerApiFp(this.configuration).saleOrderLineTravellerCreate(tenant, createSaleOrderLineTravellerRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a SaleOrderLineTraveller.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaleOrderLineTravellerApi
     */
    public saleOrderLineTravellerDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return SaleOrderLineTravellerApiFp(this.configuration).saleOrderLineTravellerDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get SaleOrderLineTraveller details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaleOrderLineTravellerApi
     */
    public saleOrderLineTravellerGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return SaleOrderLineTravellerApiFp(this.configuration).saleOrderLineTravellerGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search SaleOrderLineTraveller using available filters.
     * @param {string} tenant Description
     * @param {SearchSaleOrderLineTravellersRequest} searchSaleOrderLineTravellersRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaleOrderLineTravellerApi
     */
    public saleOrderLineTravellerSearch(tenant: string, searchSaleOrderLineTravellersRequest: SearchSaleOrderLineTravellersRequest, options?: AxiosRequestConfig) {
        return SaleOrderLineTravellerApiFp(this.configuration).saleOrderLineTravellerSearch(tenant, searchSaleOrderLineTravellersRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a SaleOrderLineTraveller.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateSaleOrderLineTravellerRequest} updateSaleOrderLineTravellerRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaleOrderLineTravellerApi
     */
    public saleOrderLineTravellerUpdate(id: string, tenant: string, updateSaleOrderLineTravellerRequest: UpdateSaleOrderLineTravellerRequest, options?: AxiosRequestConfig) {
        return SaleOrderLineTravellerApiFp(this.configuration).saleOrderLineTravellerUpdate(id, tenant, updateSaleOrderLineTravellerRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
