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
import { CreateTravellerRequest } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfTravellerDto } from '../models';
// @ts-ignore
import { SearchTravellersRequest } from '../models';
// @ts-ignore
import { TravellerDto } from '../models';
// @ts-ignore
import { UpdateTravellerRequest } from '../models';
/**
 * TravellerApi - axios parameter creator
 * @export
 */
export const TravellerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new Traveller.
         * @param {string} tenant Description
         * @param {CreateTravellerRequest} createTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        travellerCreate: async (tenant: string, createTravellerRequest: CreateTravellerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('travellerCreate', 'tenant', tenant)
            // verify required parameter 'createTravellerRequest' is not null or undefined
            assertParamExists('travellerCreate', 'createTravellerRequest', createTravellerRequest)
            const localVarPath = `/api/v1/traveller`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createTravellerRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a Traveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        travellerDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('travellerDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('travellerDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/traveller/{id}`
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
         * @summary Get Traveller details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        travellerGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('travellerGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('travellerGet', 'tenant', tenant)
            const localVarPath = `/api/v1/traveller/{id}`
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
         * @summary Search Traveller using available filters.
         * @param {string} tenant Description
         * @param {SearchTravellersRequest} searchTravellersRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        travellerSearch: async (tenant: string, searchTravellersRequest: SearchTravellersRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('travellerSearch', 'tenant', tenant)
            // verify required parameter 'searchTravellersRequest' is not null or undefined
            assertParamExists('travellerSearch', 'searchTravellersRequest', searchTravellersRequest)
            const localVarPath = `/api/v1/traveller/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchTravellersRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a Traveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateTravellerRequest} updateTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        travellerUpdate: async (id: string, tenant: string, updateTravellerRequest: UpdateTravellerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('travellerUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('travellerUpdate', 'tenant', tenant)
            // verify required parameter 'updateTravellerRequest' is not null or undefined
            assertParamExists('travellerUpdate', 'updateTravellerRequest', updateTravellerRequest)
            const localVarPath = `/api/v1/traveller/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateTravellerRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TravellerApi - functional programming interface
 * @export
 */
export const TravellerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TravellerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new Traveller.
         * @param {string} tenant Description
         * @param {CreateTravellerRequest} createTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async travellerCreate(tenant: string, createTravellerRequest: CreateTravellerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.travellerCreate(tenant, createTravellerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a Traveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async travellerDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.travellerDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get Traveller details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async travellerGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TravellerDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.travellerGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search Traveller using available filters.
         * @param {string} tenant Description
         * @param {SearchTravellersRequest} searchTravellersRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async travellerSearch(tenant: string, searchTravellersRequest: SearchTravellersRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfTravellerDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.travellerSearch(tenant, searchTravellersRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a Traveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateTravellerRequest} updateTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async travellerUpdate(id: string, tenant: string, updateTravellerRequest: UpdateTravellerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.travellerUpdate(id, tenant, updateTravellerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TravellerApi - factory interface
 * @export
 */
export const TravellerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TravellerApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new Traveller.
         * @param {string} tenant Description
         * @param {CreateTravellerRequest} createTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        travellerCreate(tenant: string, createTravellerRequest: CreateTravellerRequest, options?: any): AxiosPromise<string> {
            return localVarFp.travellerCreate(tenant, createTravellerRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a Traveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        travellerDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.travellerDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Traveller details.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        travellerGet(id: string, tenant: string, options?: any): AxiosPromise<TravellerDto> {
            return localVarFp.travellerGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search Traveller using available filters.
         * @param {string} tenant Description
         * @param {SearchTravellersRequest} searchTravellersRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        travellerSearch(tenant: string, searchTravellersRequest: SearchTravellersRequest, options?: any): AxiosPromise<PaginationResponseOfTravellerDto> {
            return localVarFp.travellerSearch(tenant, searchTravellersRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a Traveller.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateTravellerRequest} updateTravellerRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        travellerUpdate(id: string, tenant: string, updateTravellerRequest: UpdateTravellerRequest, options?: any): AxiosPromise<string> {
            return localVarFp.travellerUpdate(id, tenant, updateTravellerRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TravellerApi - object-oriented interface
 * @export
 * @class TravellerApi
 * @extends {BaseAPI}
 */
export class TravellerApi extends BaseAPI {
    /**
     * 
     * @summary Create a new Traveller.
     * @param {string} tenant Description
     * @param {CreateTravellerRequest} createTravellerRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TravellerApi
     */
    public travellerCreate(tenant: string, createTravellerRequest: CreateTravellerRequest, options?: AxiosRequestConfig) {
        return TravellerApiFp(this.configuration).travellerCreate(tenant, createTravellerRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a Traveller.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TravellerApi
     */
    public travellerDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return TravellerApiFp(this.configuration).travellerDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Traveller details.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TravellerApi
     */
    public travellerGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return TravellerApiFp(this.configuration).travellerGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search Traveller using available filters.
     * @param {string} tenant Description
     * @param {SearchTravellersRequest} searchTravellersRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TravellerApi
     */
    public travellerSearch(tenant: string, searchTravellersRequest: SearchTravellersRequest, options?: AxiosRequestConfig) {
        return TravellerApiFp(this.configuration).travellerSearch(tenant, searchTravellersRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a Traveller.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateTravellerRequest} updateTravellerRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TravellerApi
     */
    public travellerUpdate(id: string, tenant: string, updateTravellerRequest: UpdateTravellerRequest, options?: AxiosRequestConfig) {
        return TravellerApiFp(this.configuration).travellerUpdate(id, tenant, updateTravellerRequest, options).then((request) => request(this.axios, this.basePath));
    }
}