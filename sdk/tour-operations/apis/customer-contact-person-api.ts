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
import { CreateCustomerContactPersonRequest } from '../models';
// @ts-ignore
import { CustomerContactPersonDto } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfCustomerContactPersonDto } from '../models';
// @ts-ignore
import { SearchCustomerContactPersonsRequest } from '../models';
// @ts-ignore
import { UpdateCustomerContactPersonRequest } from '../models';
/**
 * CustomerContactPersonApi - axios parameter creator
 * @export
 */
export const CustomerContactPersonApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new CustomerContactPerson.
         * @param {string} tenant Description
         * @param {CreateCustomerContactPersonRequest} createCustomerContactPersonRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerContactPersonCreate: async (tenant: string, createCustomerContactPersonRequest: CreateCustomerContactPersonRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('customerContactPersonCreate', 'tenant', tenant)
            // verify required parameter 'createCustomerContactPersonRequest' is not null or undefined
            assertParamExists('customerContactPersonCreate', 'createCustomerContactPersonRequest', createCustomerContactPersonRequest)
            const localVarPath = `/api/v1/customercontactperson`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createCustomerContactPersonRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a CustomerContactPerson.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerContactPersonDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('customerContactPersonDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('customerContactPersonDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/customercontactperson/{id}`
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
         * @summary Get CustomerContactPerson details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerContactPersonGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('customerContactPersonGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('customerContactPersonGet', 'tenant', tenant)
            const localVarPath = `/api/v1/customercontactperson/{id}`
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
         * @summary Search CustomerContactPerson using available filters.
         * @param {string} tenant Description
         * @param {SearchCustomerContactPersonsRequest} searchCustomerContactPersonsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerContactPersonSearch: async (tenant: string, searchCustomerContactPersonsRequest: SearchCustomerContactPersonsRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('customerContactPersonSearch', 'tenant', tenant)
            // verify required parameter 'searchCustomerContactPersonsRequest' is not null or undefined
            assertParamExists('customerContactPersonSearch', 'searchCustomerContactPersonsRequest', searchCustomerContactPersonsRequest)
            const localVarPath = `/api/v1/customercontactperson/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchCustomerContactPersonsRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a CustomerContactPerson.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateCustomerContactPersonRequest} updateCustomerContactPersonRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerContactPersonUpdate: async (id: string, tenant: string, updateCustomerContactPersonRequest: UpdateCustomerContactPersonRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('customerContactPersonUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('customerContactPersonUpdate', 'tenant', tenant)
            // verify required parameter 'updateCustomerContactPersonRequest' is not null or undefined
            assertParamExists('customerContactPersonUpdate', 'updateCustomerContactPersonRequest', updateCustomerContactPersonRequest)
            const localVarPath = `/api/v1/customercontactperson/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateCustomerContactPersonRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CustomerContactPersonApi - functional programming interface
 * @export
 */
export const CustomerContactPersonApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CustomerContactPersonApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new CustomerContactPerson.
         * @param {string} tenant Description
         * @param {CreateCustomerContactPersonRequest} createCustomerContactPersonRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async customerContactPersonCreate(tenant: string, createCustomerContactPersonRequest: CreateCustomerContactPersonRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.customerContactPersonCreate(tenant, createCustomerContactPersonRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a CustomerContactPerson.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async customerContactPersonDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.customerContactPersonDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get CustomerContactPerson details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async customerContactPersonGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CustomerContactPersonDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.customerContactPersonGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search CustomerContactPerson using available filters.
         * @param {string} tenant Description
         * @param {SearchCustomerContactPersonsRequest} searchCustomerContactPersonsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async customerContactPersonSearch(tenant: string, searchCustomerContactPersonsRequest: SearchCustomerContactPersonsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfCustomerContactPersonDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.customerContactPersonSearch(tenant, searchCustomerContactPersonsRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a CustomerContactPerson.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateCustomerContactPersonRequest} updateCustomerContactPersonRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async customerContactPersonUpdate(id: string, tenant: string, updateCustomerContactPersonRequest: UpdateCustomerContactPersonRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.customerContactPersonUpdate(id, tenant, updateCustomerContactPersonRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CustomerContactPersonApi - factory interface
 * @export
 */
export const CustomerContactPersonApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CustomerContactPersonApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new CustomerContactPerson.
         * @param {string} tenant Description
         * @param {CreateCustomerContactPersonRequest} createCustomerContactPersonRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerContactPersonCreate(tenant: string, createCustomerContactPersonRequest: CreateCustomerContactPersonRequest, options?: any): AxiosPromise<string> {
            return localVarFp.customerContactPersonCreate(tenant, createCustomerContactPersonRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a CustomerContactPerson.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerContactPersonDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.customerContactPersonDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get CustomerContactPerson details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerContactPersonGet(id: string, tenant: string, options?: any): AxiosPromise<CustomerContactPersonDto> {
            return localVarFp.customerContactPersonGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search CustomerContactPerson using available filters.
         * @param {string} tenant Description
         * @param {SearchCustomerContactPersonsRequest} searchCustomerContactPersonsRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerContactPersonSearch(tenant: string, searchCustomerContactPersonsRequest: SearchCustomerContactPersonsRequest, options?: any): AxiosPromise<PaginationResponseOfCustomerContactPersonDto> {
            return localVarFp.customerContactPersonSearch(tenant, searchCustomerContactPersonsRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a CustomerContactPerson.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateCustomerContactPersonRequest} updateCustomerContactPersonRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        customerContactPersonUpdate(id: string, tenant: string, updateCustomerContactPersonRequest: UpdateCustomerContactPersonRequest, options?: any): AxiosPromise<string> {
            return localVarFp.customerContactPersonUpdate(id, tenant, updateCustomerContactPersonRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CustomerContactPersonApi - object-oriented interface
 * @export
 * @class CustomerContactPersonApi
 * @extends {BaseAPI}
 */
export class CustomerContactPersonApi extends BaseAPI {
    /**
     * 
     * @summary Create a new CustomerContactPerson.
     * @param {string} tenant Description
     * @param {CreateCustomerContactPersonRequest} createCustomerContactPersonRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerContactPersonApi
     */
    public customerContactPersonCreate(tenant: string, createCustomerContactPersonRequest: CreateCustomerContactPersonRequest, options?: AxiosRequestConfig) {
        return CustomerContactPersonApiFp(this.configuration).customerContactPersonCreate(tenant, createCustomerContactPersonRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a CustomerContactPerson.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerContactPersonApi
     */
    public customerContactPersonDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return CustomerContactPersonApiFp(this.configuration).customerContactPersonDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get CustomerContactPerson details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerContactPersonApi
     */
    public customerContactPersonGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return CustomerContactPersonApiFp(this.configuration).customerContactPersonGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search CustomerContactPerson using available filters.
     * @param {string} tenant Description
     * @param {SearchCustomerContactPersonsRequest} searchCustomerContactPersonsRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerContactPersonApi
     */
    public customerContactPersonSearch(tenant: string, searchCustomerContactPersonsRequest: SearchCustomerContactPersonsRequest, options?: AxiosRequestConfig) {
        return CustomerContactPersonApiFp(this.configuration).customerContactPersonSearch(tenant, searchCustomerContactPersonsRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a CustomerContactPerson.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateCustomerContactPersonRequest} updateCustomerContactPersonRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerContactPersonApi
     */
    public customerContactPersonUpdate(id: string, tenant: string, updateCustomerContactPersonRequest: UpdateCustomerContactPersonRequest, options?: AxiosRequestConfig) {
        return CustomerContactPersonApiFp(this.configuration).customerContactPersonUpdate(id, tenant, updateCustomerContactPersonRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
