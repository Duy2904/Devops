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
import { CreatePassengerTypeRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfPassengerTypeDto } from '../models';
// @ts-ignore
import { PassengerTypeDto } from '../models';
// @ts-ignore
import { SearchPassengerTypesRequest } from '../models';
// @ts-ignore
import { UpdatePassengerTypeRequest } from '../models';
/**
 * PassengerTypeApi - axios parameter creator
 * @export
 */
export const PassengerTypeApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new PassengerType.
         * @param {string} tenant Description
         * @param {CreatePassengerTypeRequest} createPassengerTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeCreate: async (tenant: string, createPassengerTypeRequest: CreatePassengerTypeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('passengerTypeCreate', 'tenant', tenant)
            // verify required parameter 'createPassengerTypeRequest' is not null or undefined
            assertParamExists('passengerTypeCreate', 'createPassengerTypeRequest', createPassengerTypeRequest)
            const localVarPath = `/api/v1/passengertype`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createPassengerTypeRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a PassengerType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('passengerTypeDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('passengerTypeDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/passengertype/{id}`
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
         * @summary Get PassengerType details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('passengerTypeGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('passengerTypeGet', 'tenant', tenant)
            const localVarPath = `/api/v1/passengertype/{id}`
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
         * @summary Get default PassengerTypes
         * @param {string} tenant Description
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeGetDefaults: async (tenant: string, body: object, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('passengerTypeGetDefaults', 'tenant', tenant)
            // verify required parameter 'body' is not null or undefined
            assertParamExists('passengerTypeGetDefaults', 'body', body)
            const localVarPath = `/api/v1/passengertype/defaults`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Search PassengerType using available filters.
         * @param {string} tenant Description
         * @param {SearchPassengerTypesRequest} searchPassengerTypesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeSearch: async (tenant: string, searchPassengerTypesRequest: SearchPassengerTypesRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('passengerTypeSearch', 'tenant', tenant)
            // verify required parameter 'searchPassengerTypesRequest' is not null or undefined
            assertParamExists('passengerTypeSearch', 'searchPassengerTypesRequest', searchPassengerTypesRequest)
            const localVarPath = `/api/v1/passengertype/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchPassengerTypesRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a PassengerType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePassengerTypeRequest} updatePassengerTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeUpdate: async (id: string, tenant: string, updatePassengerTypeRequest: UpdatePassengerTypeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('passengerTypeUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('passengerTypeUpdate', 'tenant', tenant)
            // verify required parameter 'updatePassengerTypeRequest' is not null or undefined
            assertParamExists('passengerTypeUpdate', 'updatePassengerTypeRequest', updatePassengerTypeRequest)
            const localVarPath = `/api/v1/passengertype/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updatePassengerTypeRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PassengerTypeApi - functional programming interface
 * @export
 */
export const PassengerTypeApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PassengerTypeApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new PassengerType.
         * @param {string} tenant Description
         * @param {CreatePassengerTypeRequest} createPassengerTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async passengerTypeCreate(tenant: string, createPassengerTypeRequest: CreatePassengerTypeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.passengerTypeCreate(tenant, createPassengerTypeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a PassengerType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async passengerTypeDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.passengerTypeDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get PassengerType details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async passengerTypeGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PassengerTypeDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.passengerTypeGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get default PassengerTypes
         * @param {string} tenant Description
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async passengerTypeGetDefaults(tenant: string, body: object, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<PassengerTypeDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.passengerTypeGetDefaults(tenant, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search PassengerType using available filters.
         * @param {string} tenant Description
         * @param {SearchPassengerTypesRequest} searchPassengerTypesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async passengerTypeSearch(tenant: string, searchPassengerTypesRequest: SearchPassengerTypesRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfPassengerTypeDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.passengerTypeSearch(tenant, searchPassengerTypesRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a PassengerType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePassengerTypeRequest} updatePassengerTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async passengerTypeUpdate(id: string, tenant: string, updatePassengerTypeRequest: UpdatePassengerTypeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.passengerTypeUpdate(id, tenant, updatePassengerTypeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PassengerTypeApi - factory interface
 * @export
 */
export const PassengerTypeApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PassengerTypeApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new PassengerType.
         * @param {string} tenant Description
         * @param {CreatePassengerTypeRequest} createPassengerTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeCreate(tenant: string, createPassengerTypeRequest: CreatePassengerTypeRequest, options?: any): AxiosPromise<string> {
            return localVarFp.passengerTypeCreate(tenant, createPassengerTypeRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a PassengerType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.passengerTypeDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get PassengerType details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeGet(id: string, tenant: string, options?: any): AxiosPromise<PassengerTypeDto> {
            return localVarFp.passengerTypeGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get default PassengerTypes
         * @param {string} tenant Description
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeGetDefaults(tenant: string, body: object, options?: any): AxiosPromise<Array<PassengerTypeDto>> {
            return localVarFp.passengerTypeGetDefaults(tenant, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search PassengerType using available filters.
         * @param {string} tenant Description
         * @param {SearchPassengerTypesRequest} searchPassengerTypesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeSearch(tenant: string, searchPassengerTypesRequest: SearchPassengerTypesRequest, options?: any): AxiosPromise<PaginationResponseOfPassengerTypeDto> {
            return localVarFp.passengerTypeSearch(tenant, searchPassengerTypesRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a PassengerType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdatePassengerTypeRequest} updatePassengerTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        passengerTypeUpdate(id: string, tenant: string, updatePassengerTypeRequest: UpdatePassengerTypeRequest, options?: any): AxiosPromise<string> {
            return localVarFp.passengerTypeUpdate(id, tenant, updatePassengerTypeRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PassengerTypeApi - object-oriented interface
 * @export
 * @class PassengerTypeApi
 * @extends {BaseAPI}
 */
export class PassengerTypeApi extends BaseAPI {
    /**
     * 
     * @summary Create a new PassengerType.
     * @param {string} tenant Description
     * @param {CreatePassengerTypeRequest} createPassengerTypeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PassengerTypeApi
     */
    public passengerTypeCreate(tenant: string, createPassengerTypeRequest: CreatePassengerTypeRequest, options?: AxiosRequestConfig) {
        return PassengerTypeApiFp(this.configuration).passengerTypeCreate(tenant, createPassengerTypeRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a PassengerType.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PassengerTypeApi
     */
    public passengerTypeDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return PassengerTypeApiFp(this.configuration).passengerTypeDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get PassengerType details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PassengerTypeApi
     */
    public passengerTypeGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return PassengerTypeApiFp(this.configuration).passengerTypeGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get default PassengerTypes
     * @param {string} tenant Description
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PassengerTypeApi
     */
    public passengerTypeGetDefaults(tenant: string, body: object, options?: AxiosRequestConfig) {
        return PassengerTypeApiFp(this.configuration).passengerTypeGetDefaults(tenant, body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search PassengerType using available filters.
     * @param {string} tenant Description
     * @param {SearchPassengerTypesRequest} searchPassengerTypesRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PassengerTypeApi
     */
    public passengerTypeSearch(tenant: string, searchPassengerTypesRequest: SearchPassengerTypesRequest, options?: AxiosRequestConfig) {
        return PassengerTypeApiFp(this.configuration).passengerTypeSearch(tenant, searchPassengerTypesRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a PassengerType.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdatePassengerTypeRequest} updatePassengerTypeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PassengerTypeApi
     */
    public passengerTypeUpdate(id: string, tenant: string, updatePassengerTypeRequest: UpdatePassengerTypeRequest, options?: AxiosRequestConfig) {
        return PassengerTypeApiFp(this.configuration).passengerTypeUpdate(id, tenant, updatePassengerTypeRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
