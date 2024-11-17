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
import { BankInforDto } from '../models';
// @ts-ignore
import { CreateBankInforRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfBankInforDto } from '../models';
// @ts-ignore
import { SearchBankInforsRequest } from '../models';
// @ts-ignore
import { UpdateBankInforRequest } from '../models';
/**
 * BankInforApi - axios parameter creator
 * @export
 */
export const BankInforApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new BankInfor.
         * @param {string} tenant Description
         * @param {CreateBankInforRequest} createBankInforRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bankInforCreate: async (tenant: string, createBankInforRequest: CreateBankInforRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('bankInforCreate', 'tenant', tenant)
            // verify required parameter 'createBankInforRequest' is not null or undefined
            assertParamExists('bankInforCreate', 'createBankInforRequest', createBankInforRequest)
            const localVarPath = `/api/v1/bankinfor`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createBankInforRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a BankInfor.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bankInforDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('bankInforDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('bankInforDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/bankinfor/{id}`
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
         * @summary Get BankInfor details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bankInforGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('bankInforGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('bankInforGet', 'tenant', tenant)
            const localVarPath = `/api/v1/bankinfor/{id}`
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
         * @summary Search BankInfor using available filters.
         * @param {string} tenant Description
         * @param {SearchBankInforsRequest} searchBankInforsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bankInforSearch: async (tenant: string, searchBankInforsRequest: SearchBankInforsRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('bankInforSearch', 'tenant', tenant)
            // verify required parameter 'searchBankInforsRequest' is not null or undefined
            assertParamExists('bankInforSearch', 'searchBankInforsRequest', searchBankInforsRequest)
            const localVarPath = `/api/v1/bankinfor/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchBankInforsRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a BankInfor.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateBankInforRequest} updateBankInforRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bankInforUpdate: async (id: string, tenant: string, updateBankInforRequest: UpdateBankInforRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('bankInforUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('bankInforUpdate', 'tenant', tenant)
            // verify required parameter 'updateBankInforRequest' is not null or undefined
            assertParamExists('bankInforUpdate', 'updateBankInforRequest', updateBankInforRequest)
            const localVarPath = `/api/v1/bankinfor/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateBankInforRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BankInforApi - functional programming interface
 * @export
 */
export const BankInforApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BankInforApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new BankInfor.
         * @param {string} tenant Description
         * @param {CreateBankInforRequest} createBankInforRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async bankInforCreate(tenant: string, createBankInforRequest: CreateBankInforRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.bankInforCreate(tenant, createBankInforRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a BankInfor.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async bankInforDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.bankInforDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get BankInfor details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async bankInforGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BankInforDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.bankInforGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search BankInfor using available filters.
         * @param {string} tenant Description
         * @param {SearchBankInforsRequest} searchBankInforsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async bankInforSearch(tenant: string, searchBankInforsRequest: SearchBankInforsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfBankInforDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.bankInforSearch(tenant, searchBankInforsRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a BankInfor.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateBankInforRequest} updateBankInforRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async bankInforUpdate(id: string, tenant: string, updateBankInforRequest: UpdateBankInforRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.bankInforUpdate(id, tenant, updateBankInforRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * BankInforApi - factory interface
 * @export
 */
export const BankInforApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BankInforApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new BankInfor.
         * @param {string} tenant Description
         * @param {CreateBankInforRequest} createBankInforRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bankInforCreate(tenant: string, createBankInforRequest: CreateBankInforRequest, options?: any): AxiosPromise<string> {
            return localVarFp.bankInforCreate(tenant, createBankInforRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a BankInfor.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bankInforDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.bankInforDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get BankInfor details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bankInforGet(id: string, tenant: string, options?: any): AxiosPromise<BankInforDto> {
            return localVarFp.bankInforGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search BankInfor using available filters.
         * @param {string} tenant Description
         * @param {SearchBankInforsRequest} searchBankInforsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bankInforSearch(tenant: string, searchBankInforsRequest: SearchBankInforsRequest, options?: any): AxiosPromise<PaginationResponseOfBankInforDto> {
            return localVarFp.bankInforSearch(tenant, searchBankInforsRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a BankInfor.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateBankInforRequest} updateBankInforRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bankInforUpdate(id: string, tenant: string, updateBankInforRequest: UpdateBankInforRequest, options?: any): AxiosPromise<string> {
            return localVarFp.bankInforUpdate(id, tenant, updateBankInforRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * BankInforApi - object-oriented interface
 * @export
 * @class BankInforApi
 * @extends {BaseAPI}
 */
export class BankInforApi extends BaseAPI {
    /**
     * 
     * @summary Create a new BankInfor.
     * @param {string} tenant Description
     * @param {CreateBankInforRequest} createBankInforRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BankInforApi
     */
    public bankInforCreate(tenant: string, createBankInforRequest: CreateBankInforRequest, options?: AxiosRequestConfig) {
        return BankInforApiFp(this.configuration).bankInforCreate(tenant, createBankInforRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a BankInfor.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BankInforApi
     */
    public bankInforDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return BankInforApiFp(this.configuration).bankInforDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get BankInfor details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BankInforApi
     */
    public bankInforGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return BankInforApiFp(this.configuration).bankInforGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search BankInfor using available filters.
     * @param {string} tenant Description
     * @param {SearchBankInforsRequest} searchBankInforsRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BankInforApi
     */
    public bankInforSearch(tenant: string, searchBankInforsRequest: SearchBankInforsRequest, options?: AxiosRequestConfig) {
        return BankInforApiFp(this.configuration).bankInforSearch(tenant, searchBankInforsRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a BankInfor.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateBankInforRequest} updateBankInforRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BankInforApi
     */
    public bankInforUpdate(id: string, tenant: string, updateBankInforRequest: UpdateBankInforRequest, options?: AxiosRequestConfig) {
        return BankInforApiFp(this.configuration).bankInforUpdate(id, tenant, updateBankInforRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
