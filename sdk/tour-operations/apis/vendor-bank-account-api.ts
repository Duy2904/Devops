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
import { CreateVendorBankAccountRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfVendorBankAccountDto } from '../models';
// @ts-ignore
import { SearchVendorBankAccountsRequest } from '../models';
// @ts-ignore
import { UpdateVendorBankAccountRequest } from '../models';
// @ts-ignore
import { VendorBankAccountDto } from '../models';
/**
 * VendorBankAccountApi - axios parameter creator
 * @export
 */
export const VendorBankAccountApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new VendorBankAccount.
         * @param {string} tenant Description
         * @param {CreateVendorBankAccountRequest} createVendorBankAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        vendorBankAccountCreate: async (tenant: string, createVendorBankAccountRequest: CreateVendorBankAccountRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('vendorBankAccountCreate', 'tenant', tenant)
            // verify required parameter 'createVendorBankAccountRequest' is not null or undefined
            assertParamExists('vendorBankAccountCreate', 'createVendorBankAccountRequest', createVendorBankAccountRequest)
            const localVarPath = `/api/v1/vendorbankaccount`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createVendorBankAccountRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a VendorBankAccount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        vendorBankAccountDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('vendorBankAccountDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('vendorBankAccountDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/vendorbankaccount/{id}`
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
         * @summary Get VendorBankAccount details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        vendorBankAccountGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('vendorBankAccountGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('vendorBankAccountGet', 'tenant', tenant)
            const localVarPath = `/api/v1/vendorbankaccount/{id}`
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
         * @summary Search VendorBankAccount using available filters.
         * @param {string} tenant Description
         * @param {SearchVendorBankAccountsRequest} searchVendorBankAccountsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        vendorBankAccountSearch: async (tenant: string, searchVendorBankAccountsRequest: SearchVendorBankAccountsRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('vendorBankAccountSearch', 'tenant', tenant)
            // verify required parameter 'searchVendorBankAccountsRequest' is not null or undefined
            assertParamExists('vendorBankAccountSearch', 'searchVendorBankAccountsRequest', searchVendorBankAccountsRequest)
            const localVarPath = `/api/v1/vendorbankaccount/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchVendorBankAccountsRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a VendorBankAccount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateVendorBankAccountRequest} updateVendorBankAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        vendorBankAccountUpdate: async (id: string, tenant: string, updateVendorBankAccountRequest: UpdateVendorBankAccountRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('vendorBankAccountUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('vendorBankAccountUpdate', 'tenant', tenant)
            // verify required parameter 'updateVendorBankAccountRequest' is not null or undefined
            assertParamExists('vendorBankAccountUpdate', 'updateVendorBankAccountRequest', updateVendorBankAccountRequest)
            const localVarPath = `/api/v1/vendorbankaccount/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateVendorBankAccountRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * VendorBankAccountApi - functional programming interface
 * @export
 */
export const VendorBankAccountApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = VendorBankAccountApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new VendorBankAccount.
         * @param {string} tenant Description
         * @param {CreateVendorBankAccountRequest} createVendorBankAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async vendorBankAccountCreate(tenant: string, createVendorBankAccountRequest: CreateVendorBankAccountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.vendorBankAccountCreate(tenant, createVendorBankAccountRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a VendorBankAccount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async vendorBankAccountDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.vendorBankAccountDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get VendorBankAccount details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async vendorBankAccountGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VendorBankAccountDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.vendorBankAccountGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search VendorBankAccount using available filters.
         * @param {string} tenant Description
         * @param {SearchVendorBankAccountsRequest} searchVendorBankAccountsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async vendorBankAccountSearch(tenant: string, searchVendorBankAccountsRequest: SearchVendorBankAccountsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfVendorBankAccountDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.vendorBankAccountSearch(tenant, searchVendorBankAccountsRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a VendorBankAccount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateVendorBankAccountRequest} updateVendorBankAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async vendorBankAccountUpdate(id: string, tenant: string, updateVendorBankAccountRequest: UpdateVendorBankAccountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.vendorBankAccountUpdate(id, tenant, updateVendorBankAccountRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * VendorBankAccountApi - factory interface
 * @export
 */
export const VendorBankAccountApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = VendorBankAccountApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new VendorBankAccount.
         * @param {string} tenant Description
         * @param {CreateVendorBankAccountRequest} createVendorBankAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        vendorBankAccountCreate(tenant: string, createVendorBankAccountRequest: CreateVendorBankAccountRequest, options?: any): AxiosPromise<string> {
            return localVarFp.vendorBankAccountCreate(tenant, createVendorBankAccountRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a VendorBankAccount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        vendorBankAccountDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.vendorBankAccountDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get VendorBankAccount details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        vendorBankAccountGet(id: string, tenant: string, options?: any): AxiosPromise<VendorBankAccountDto> {
            return localVarFp.vendorBankAccountGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search VendorBankAccount using available filters.
         * @param {string} tenant Description
         * @param {SearchVendorBankAccountsRequest} searchVendorBankAccountsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        vendorBankAccountSearch(tenant: string, searchVendorBankAccountsRequest: SearchVendorBankAccountsRequest, options?: any): AxiosPromise<PaginationResponseOfVendorBankAccountDto> {
            return localVarFp.vendorBankAccountSearch(tenant, searchVendorBankAccountsRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a VendorBankAccount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateVendorBankAccountRequest} updateVendorBankAccountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        vendorBankAccountUpdate(id: string, tenant: string, updateVendorBankAccountRequest: UpdateVendorBankAccountRequest, options?: any): AxiosPromise<string> {
            return localVarFp.vendorBankAccountUpdate(id, tenant, updateVendorBankAccountRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * VendorBankAccountApi - object-oriented interface
 * @export
 * @class VendorBankAccountApi
 * @extends {BaseAPI}
 */
export class VendorBankAccountApi extends BaseAPI {
    /**
     * 
     * @summary Create a new VendorBankAccount.
     * @param {string} tenant Description
     * @param {CreateVendorBankAccountRequest} createVendorBankAccountRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VendorBankAccountApi
     */
    public vendorBankAccountCreate(tenant: string, createVendorBankAccountRequest: CreateVendorBankAccountRequest, options?: AxiosRequestConfig) {
        return VendorBankAccountApiFp(this.configuration).vendorBankAccountCreate(tenant, createVendorBankAccountRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a VendorBankAccount.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VendorBankAccountApi
     */
    public vendorBankAccountDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return VendorBankAccountApiFp(this.configuration).vendorBankAccountDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get VendorBankAccount details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VendorBankAccountApi
     */
    public vendorBankAccountGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return VendorBankAccountApiFp(this.configuration).vendorBankAccountGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search VendorBankAccount using available filters.
     * @param {string} tenant Description
     * @param {SearchVendorBankAccountsRequest} searchVendorBankAccountsRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VendorBankAccountApi
     */
    public vendorBankAccountSearch(tenant: string, searchVendorBankAccountsRequest: SearchVendorBankAccountsRequest, options?: AxiosRequestConfig) {
        return VendorBankAccountApiFp(this.configuration).vendorBankAccountSearch(tenant, searchVendorBankAccountsRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a VendorBankAccount.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateVendorBankAccountRequest} updateVendorBankAccountRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VendorBankAccountApi
     */
    public vendorBankAccountUpdate(id: string, tenant: string, updateVendorBankAccountRequest: UpdateVendorBankAccountRequest, options?: AxiosRequestConfig) {
        return VendorBankAccountApiFp(this.configuration).vendorBankAccountUpdate(id, tenant, updateVendorBankAccountRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
