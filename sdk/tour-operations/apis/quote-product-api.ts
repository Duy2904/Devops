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
import { CreateQuoteProductRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfQuoteProductDto } from '../models';
// @ts-ignore
import { SearchQuoteProductRequest } from '../models';
// @ts-ignore
import { UpdateQuoteProductRequest } from '../models';
/**
 * QuoteProductApi - axios parameter creator
 * @export
 */
export const QuoteProductApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new product.
         * @param {string} tenant Description
         * @param {CreateQuoteProductRequest} createQuoteProductRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        quoteProductCreate: async (tenant: string, createQuoteProductRequest: CreateQuoteProductRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('quoteProductCreate', 'tenant', tenant)
            // verify required parameter 'createQuoteProductRequest' is not null or undefined
            assertParamExists('quoteProductCreate', 'createQuoteProductRequest', createQuoteProductRequest)
            const localVarPath = `/api/v1/quoteproduct`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createQuoteProductRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Search products using available filters.
         * @param {string} tenant Description
         * @param {SearchQuoteProductRequest} searchQuoteProductRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        quoteProductSearch: async (tenant: string, searchQuoteProductRequest: SearchQuoteProductRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('quoteProductSearch', 'tenant', tenant)
            // verify required parameter 'searchQuoteProductRequest' is not null or undefined
            assertParamExists('quoteProductSearch', 'searchQuoteProductRequest', searchQuoteProductRequest)
            const localVarPath = `/api/v1/quoteproduct/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchQuoteProductRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a product.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateQuoteProductRequest} updateQuoteProductRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        quoteProductUpdate: async (id: string, tenant: string, updateQuoteProductRequest: UpdateQuoteProductRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('quoteProductUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('quoteProductUpdate', 'tenant', tenant)
            // verify required parameter 'updateQuoteProductRequest' is not null or undefined
            assertParamExists('quoteProductUpdate', 'updateQuoteProductRequest', updateQuoteProductRequest)
            const localVarPath = `/api/v1/quoteproduct/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateQuoteProductRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * QuoteProductApi - functional programming interface
 * @export
 */
export const QuoteProductApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = QuoteProductApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new product.
         * @param {string} tenant Description
         * @param {CreateQuoteProductRequest} createQuoteProductRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async quoteProductCreate(tenant: string, createQuoteProductRequest: CreateQuoteProductRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.quoteProductCreate(tenant, createQuoteProductRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search products using available filters.
         * @param {string} tenant Description
         * @param {SearchQuoteProductRequest} searchQuoteProductRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async quoteProductSearch(tenant: string, searchQuoteProductRequest: SearchQuoteProductRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfQuoteProductDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.quoteProductSearch(tenant, searchQuoteProductRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a product.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateQuoteProductRequest} updateQuoteProductRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async quoteProductUpdate(id: string, tenant: string, updateQuoteProductRequest: UpdateQuoteProductRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.quoteProductUpdate(id, tenant, updateQuoteProductRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * QuoteProductApi - factory interface
 * @export
 */
export const QuoteProductApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = QuoteProductApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new product.
         * @param {string} tenant Description
         * @param {CreateQuoteProductRequest} createQuoteProductRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        quoteProductCreate(tenant: string, createQuoteProductRequest: CreateQuoteProductRequest, options?: any): AxiosPromise<string> {
            return localVarFp.quoteProductCreate(tenant, createQuoteProductRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search products using available filters.
         * @param {string} tenant Description
         * @param {SearchQuoteProductRequest} searchQuoteProductRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        quoteProductSearch(tenant: string, searchQuoteProductRequest: SearchQuoteProductRequest, options?: any): AxiosPromise<PaginationResponseOfQuoteProductDto> {
            return localVarFp.quoteProductSearch(tenant, searchQuoteProductRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a product.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateQuoteProductRequest} updateQuoteProductRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        quoteProductUpdate(id: string, tenant: string, updateQuoteProductRequest: UpdateQuoteProductRequest, options?: any): AxiosPromise<string> {
            return localVarFp.quoteProductUpdate(id, tenant, updateQuoteProductRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * QuoteProductApi - object-oriented interface
 * @export
 * @class QuoteProductApi
 * @extends {BaseAPI}
 */
export class QuoteProductApi extends BaseAPI {
    /**
     * 
     * @summary Create a new product.
     * @param {string} tenant Description
     * @param {CreateQuoteProductRequest} createQuoteProductRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QuoteProductApi
     */
    public quoteProductCreate(tenant: string, createQuoteProductRequest: CreateQuoteProductRequest, options?: AxiosRequestConfig) {
        return QuoteProductApiFp(this.configuration).quoteProductCreate(tenant, createQuoteProductRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search products using available filters.
     * @param {string} tenant Description
     * @param {SearchQuoteProductRequest} searchQuoteProductRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QuoteProductApi
     */
    public quoteProductSearch(tenant: string, searchQuoteProductRequest: SearchQuoteProductRequest, options?: AxiosRequestConfig) {
        return QuoteProductApiFp(this.configuration).quoteProductSearch(tenant, searchQuoteProductRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a product.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateQuoteProductRequest} updateQuoteProductRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QuoteProductApi
     */
    public quoteProductUpdate(id: string, tenant: string, updateQuoteProductRequest: UpdateQuoteProductRequest, options?: AxiosRequestConfig) {
        return QuoteProductApiFp(this.configuration).quoteProductUpdate(id, tenant, updateQuoteProductRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
