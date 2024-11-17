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
import { CreatePayableVoucherLineRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfPayableVoucherLineDto } from '../models';
// @ts-ignore
import { PayableVoucherLineDto } from '../models';
// @ts-ignore
import { SearchPayableVoucherLinesRequest } from '../models';
// @ts-ignore
import { UpdatePayableVoucherLineRequest } from '../models';
/**
 * PayableVoucherLineApi - axios parameter creator
 * @export
 */
export const PayableVoucherLineApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new PayableVoucherLine.
         * @param {string} tenant Description
         * @param {CreatePayableVoucherLineRequest} createPayableVoucherLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        payableVoucherLineCreate: async (tenant: string, createPayableVoucherLineRequest: CreatePayableVoucherLineRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('payableVoucherLineCreate', 'tenant', tenant)
            // verify required parameter 'createPayableVoucherLineRequest' is not null or undefined
            assertParamExists('payableVoucherLineCreate', 'createPayableVoucherLineRequest', createPayableVoucherLineRequest)
            const localVarPath = `/api/v1/payablevoucherline`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createPayableVoucherLineRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a PayableVoucherLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        payableVoucherLineDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('payableVoucherLineDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('payableVoucherLineDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/payablevoucherline/{id}`
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
         * @summary Get PayableVoucherLine details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        payableVoucherLineGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('payableVoucherLineGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('payableVoucherLineGet', 'tenant', tenant)
            const localVarPath = `/api/v1/payablevoucherline/{id}`
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
         * @summary Search PayableVoucherLine using available filters.
         * @param {string} tenant Description
         * @param {SearchPayableVoucherLinesRequest} searchPayableVoucherLinesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        payableVoucherLineSearch: async (tenant: string, searchPayableVoucherLinesRequest: SearchPayableVoucherLinesRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('payableVoucherLineSearch', 'tenant', tenant)
            // verify required parameter 'searchPayableVoucherLinesRequest' is not null or undefined
            assertParamExists('payableVoucherLineSearch', 'searchPayableVoucherLinesRequest', searchPayableVoucherLinesRequest)
            const localVarPath = `/api/v1/payablevoucherline/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchPayableVoucherLinesRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a PayableVoucherLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePayableVoucherLineRequest} updatePayableVoucherLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        payableVoucherLineUpdate: async (id: string, tenant: string, updatePayableVoucherLineRequest: UpdatePayableVoucherLineRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('payableVoucherLineUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('payableVoucherLineUpdate', 'tenant', tenant)
            // verify required parameter 'updatePayableVoucherLineRequest' is not null or undefined
            assertParamExists('payableVoucherLineUpdate', 'updatePayableVoucherLineRequest', updatePayableVoucherLineRequest)
            const localVarPath = `/api/v1/payablevoucherline/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updatePayableVoucherLineRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PayableVoucherLineApi - functional programming interface
 * @export
 */
export const PayableVoucherLineApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PayableVoucherLineApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new PayableVoucherLine.
         * @param {string} tenant Description
         * @param {CreatePayableVoucherLineRequest} createPayableVoucherLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async payableVoucherLineCreate(tenant: string, createPayableVoucherLineRequest: CreatePayableVoucherLineRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.payableVoucherLineCreate(tenant, createPayableVoucherLineRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a PayableVoucherLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async payableVoucherLineDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.payableVoucherLineDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get PayableVoucherLine details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async payableVoucherLineGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PayableVoucherLineDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.payableVoucherLineGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search PayableVoucherLine using available filters.
         * @param {string} tenant Description
         * @param {SearchPayableVoucherLinesRequest} searchPayableVoucherLinesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async payableVoucherLineSearch(tenant: string, searchPayableVoucherLinesRequest: SearchPayableVoucherLinesRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfPayableVoucherLineDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.payableVoucherLineSearch(tenant, searchPayableVoucherLinesRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a PayableVoucherLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePayableVoucherLineRequest} updatePayableVoucherLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async payableVoucherLineUpdate(id: string, tenant: string, updatePayableVoucherLineRequest: UpdatePayableVoucherLineRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.payableVoucherLineUpdate(id, tenant, updatePayableVoucherLineRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PayableVoucherLineApi - factory interface
 * @export
 */
export const PayableVoucherLineApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PayableVoucherLineApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new PayableVoucherLine.
         * @param {string} tenant Description
         * @param {CreatePayableVoucherLineRequest} createPayableVoucherLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        payableVoucherLineCreate(tenant: string, createPayableVoucherLineRequest: CreatePayableVoucherLineRequest, options?: any): AxiosPromise<string> {
            return localVarFp.payableVoucherLineCreate(tenant, createPayableVoucherLineRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a PayableVoucherLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        payableVoucherLineDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.payableVoucherLineDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get PayableVoucherLine details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        payableVoucherLineGet(id: string, tenant: string, options?: any): AxiosPromise<PayableVoucherLineDto> {
            return localVarFp.payableVoucherLineGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search PayableVoucherLine using available filters.
         * @param {string} tenant Description
         * @param {SearchPayableVoucherLinesRequest} searchPayableVoucherLinesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        payableVoucherLineSearch(tenant: string, searchPayableVoucherLinesRequest: SearchPayableVoucherLinesRequest, options?: any): AxiosPromise<PaginationResponseOfPayableVoucherLineDto> {
            return localVarFp.payableVoucherLineSearch(tenant, searchPayableVoucherLinesRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a PayableVoucherLine.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePayableVoucherLineRequest} updatePayableVoucherLineRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        payableVoucherLineUpdate(id: string, tenant: string, updatePayableVoucherLineRequest: UpdatePayableVoucherLineRequest, options?: any): AxiosPromise<string> {
            return localVarFp.payableVoucherLineUpdate(id, tenant, updatePayableVoucherLineRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PayableVoucherLineApi - object-oriented interface
 * @export
 * @class PayableVoucherLineApi
 * @extends {BaseAPI}
 */
export class PayableVoucherLineApi extends BaseAPI {
    /**
     * 
     * @summary Create a new PayableVoucherLine.
     * @param {string} tenant Description
     * @param {CreatePayableVoucherLineRequest} createPayableVoucherLineRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PayableVoucherLineApi
     */
    public payableVoucherLineCreate(tenant: string, createPayableVoucherLineRequest: CreatePayableVoucherLineRequest, options?: AxiosRequestConfig) {
        return PayableVoucherLineApiFp(this.configuration).payableVoucherLineCreate(tenant, createPayableVoucherLineRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a PayableVoucherLine.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PayableVoucherLineApi
     */
    public payableVoucherLineDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return PayableVoucherLineApiFp(this.configuration).payableVoucherLineDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get PayableVoucherLine details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PayableVoucherLineApi
     */
    public payableVoucherLineGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return PayableVoucherLineApiFp(this.configuration).payableVoucherLineGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search PayableVoucherLine using available filters.
     * @param {string} tenant Description
     * @param {SearchPayableVoucherLinesRequest} searchPayableVoucherLinesRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PayableVoucherLineApi
     */
    public payableVoucherLineSearch(tenant: string, searchPayableVoucherLinesRequest: SearchPayableVoucherLinesRequest, options?: AxiosRequestConfig) {
        return PayableVoucherLineApiFp(this.configuration).payableVoucherLineSearch(tenant, searchPayableVoucherLinesRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a PayableVoucherLine.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdatePayableVoucherLineRequest} updatePayableVoucherLineRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PayableVoucherLineApi
     */
    public payableVoucherLineUpdate(id: string, tenant: string, updatePayableVoucherLineRequest: UpdatePayableVoucherLineRequest, options?: AxiosRequestConfig) {
        return PayableVoucherLineApiFp(this.configuration).payableVoucherLineUpdate(id, tenant, updatePayableVoucherLineRequest, options).then((request) => request(this.axios, this.basePath));
    }
}