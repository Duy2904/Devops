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
import { CreateTourTypeRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfTourTypeDto } from '../models';
// @ts-ignore
import { SearchTourTypesRequest } from '../models';
// @ts-ignore
import { TourTypeDto } from '../models';
// @ts-ignore
import { UpdateTourTypeRequest } from '../models';
/**
 * TourTypeApi - axios parameter creator
 * @export
 */
export const TourTypeApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new TourType.
         * @param {string} tenant Description
         * @param {CreateTourTypeRequest} createTourTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourTypeCreate: async (tenant: string, createTourTypeRequest: CreateTourTypeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('tourTypeCreate', 'tenant', tenant)
            // verify required parameter 'createTourTypeRequest' is not null or undefined
            assertParamExists('tourTypeCreate', 'createTourTypeRequest', createTourTypeRequest)
            const localVarPath = `/api/v1/tourtype`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createTourTypeRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a TourType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourTypeDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('tourTypeDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('tourTypeDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/tourtype/{id}`
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
         * @summary Get TourType details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourTypeGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('tourTypeGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('tourTypeGet', 'tenant', tenant)
            const localVarPath = `/api/v1/tourtype/{id}`
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
         * @summary Search TourType using available filters.
         * @param {string} tenant Description
         * @param {SearchTourTypesRequest} searchTourTypesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourTypeSearch: async (tenant: string, searchTourTypesRequest: SearchTourTypesRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('tourTypeSearch', 'tenant', tenant)
            // verify required parameter 'searchTourTypesRequest' is not null or undefined
            assertParamExists('tourTypeSearch', 'searchTourTypesRequest', searchTourTypesRequest)
            const localVarPath = `/api/v1/tourtype/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchTourTypesRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a TourType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateTourTypeRequest} updateTourTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourTypeUpdate: async (id: string, tenant: string, updateTourTypeRequest: UpdateTourTypeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('tourTypeUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('tourTypeUpdate', 'tenant', tenant)
            // verify required parameter 'updateTourTypeRequest' is not null or undefined
            assertParamExists('tourTypeUpdate', 'updateTourTypeRequest', updateTourTypeRequest)
            const localVarPath = `/api/v1/tourtype/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateTourTypeRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TourTypeApi - functional programming interface
 * @export
 */
export const TourTypeApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TourTypeApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new TourType.
         * @param {string} tenant Description
         * @param {CreateTourTypeRequest} createTourTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tourTypeCreate(tenant: string, createTourTypeRequest: CreateTourTypeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tourTypeCreate(tenant, createTourTypeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a TourType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tourTypeDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tourTypeDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get TourType details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tourTypeGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TourTypeDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tourTypeGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search TourType using available filters.
         * @param {string} tenant Description
         * @param {SearchTourTypesRequest} searchTourTypesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tourTypeSearch(tenant: string, searchTourTypesRequest: SearchTourTypesRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfTourTypeDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tourTypeSearch(tenant, searchTourTypesRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a TourType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateTourTypeRequest} updateTourTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tourTypeUpdate(id: string, tenant: string, updateTourTypeRequest: UpdateTourTypeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tourTypeUpdate(id, tenant, updateTourTypeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TourTypeApi - factory interface
 * @export
 */
export const TourTypeApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TourTypeApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new TourType.
         * @param {string} tenant Description
         * @param {CreateTourTypeRequest} createTourTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourTypeCreate(tenant: string, createTourTypeRequest: CreateTourTypeRequest, options?: any): AxiosPromise<string> {
            return localVarFp.tourTypeCreate(tenant, createTourTypeRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a TourType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourTypeDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.tourTypeDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get TourType details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourTypeGet(id: string, tenant: string, options?: any): AxiosPromise<TourTypeDto> {
            return localVarFp.tourTypeGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search TourType using available filters.
         * @param {string} tenant Description
         * @param {SearchTourTypesRequest} searchTourTypesRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourTypeSearch(tenant: string, searchTourTypesRequest: SearchTourTypesRequest, options?: any): AxiosPromise<PaginationResponseOfTourTypeDto> {
            return localVarFp.tourTypeSearch(tenant, searchTourTypesRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a TourType.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateTourTypeRequest} updateTourTypeRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tourTypeUpdate(id: string, tenant: string, updateTourTypeRequest: UpdateTourTypeRequest, options?: any): AxiosPromise<string> {
            return localVarFp.tourTypeUpdate(id, tenant, updateTourTypeRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TourTypeApi - object-oriented interface
 * @export
 * @class TourTypeApi
 * @extends {BaseAPI}
 */
export class TourTypeApi extends BaseAPI {
    /**
     * 
     * @summary Create a new TourType.
     * @param {string} tenant Description
     * @param {CreateTourTypeRequest} createTourTypeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TourTypeApi
     */
    public tourTypeCreate(tenant: string, createTourTypeRequest: CreateTourTypeRequest, options?: AxiosRequestConfig) {
        return TourTypeApiFp(this.configuration).tourTypeCreate(tenant, createTourTypeRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a TourType.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TourTypeApi
     */
    public tourTypeDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return TourTypeApiFp(this.configuration).tourTypeDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get TourType details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TourTypeApi
     */
    public tourTypeGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return TourTypeApiFp(this.configuration).tourTypeGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search TourType using available filters.
     * @param {string} tenant Description
     * @param {SearchTourTypesRequest} searchTourTypesRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TourTypeApi
     */
    public tourTypeSearch(tenant: string, searchTourTypesRequest: SearchTourTypesRequest, options?: AxiosRequestConfig) {
        return TourTypeApiFp(this.configuration).tourTypeSearch(tenant, searchTourTypesRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a TourType.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateTourTypeRequest} updateTourTypeRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TourTypeApi
     */
    public tourTypeUpdate(id: string, tenant: string, updateTourTypeRequest: UpdateTourTypeRequest, options?: AxiosRequestConfig) {
        return TourTypeApiFp(this.configuration).tourTypeUpdate(id, tenant, updateTourTypeRequest, options).then((request) => request(this.axios, this.basePath));
    }
}