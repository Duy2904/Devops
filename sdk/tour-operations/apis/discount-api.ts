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
import { CreateDiscountRequest } from '../models';
// @ts-ignore
import { DiscountDetailDto } from '../models';
// @ts-ignore
import { DiscountOnType } from '../models';
// @ts-ignore
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { PaginationResponseOfDiscountDto } from '../models';
// @ts-ignore
import { PaginationResponseOfSearchTourSchedulesForDiscountDto } from '../models';
// @ts-ignore
import { SaleOrderByDiscountIdDto } from '../models';
// @ts-ignore
import { SearchDiscountRequest } from '../models';
// @ts-ignore
import { SearchTourSchedulesForDiscountRequest } from '../models';
// @ts-ignore
import { UpdateDiscountRequest } from '../models';
/**
 * DiscountApi - axios parameter creator
 * @export
 */
export const DiscountApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new Discount.
         * @param {string} tenant Description
         * @param {CreateDiscountRequest} createDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountCreate: async (tenant: string, createDiscountRequest: CreateDiscountRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('discountCreate', 'tenant', tenant)
            // verify required parameter 'createDiscountRequest' is not null or undefined
            assertParamExists('discountCreate', 'createDiscountRequest', createDiscountRequest)
            const localVarPath = `/api/v1/discount`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createDiscountRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a Discount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountDelete: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('discountDelete', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('discountDelete', 'tenant', tenant)
            const localVarPath = `/api/v1/discount/{id}`
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
         * @summary Get Discount detail.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountGet: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('discountGet', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('discountGet', 'tenant', tenant)
            const localVarPath = `/api/v1/discount/{id}`
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
         * @summary Get sale orders of discount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountGetSaleOrders: async (id: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('discountGetSaleOrders', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('discountGetSaleOrders', 'tenant', tenant)
            const localVarPath = `/api/v1/discount/{id}/saleorders`
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
         * @summary Get Discount with page SaleOrder.
         * @param {string} tenant Description
         * @param {SearchDiscountRequest} searchDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountGetWithSaleOrder: async (tenant: string, searchDiscountRequest: SearchDiscountRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('discountGetWithSaleOrder', 'tenant', tenant)
            // verify required parameter 'searchDiscountRequest' is not null or undefined
            assertParamExists('discountGetWithSaleOrder', 'searchDiscountRequest', searchDiscountRequest)
            const localVarPath = `/api/v1/discount/saleorders`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchDiscountRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Search Discount using available filters.
         * @param {string} tenant Description
         * @param {SearchDiscountRequest} searchDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountSearch: async (tenant: string, searchDiscountRequest: SearchDiscountRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('discountSearch', 'tenant', tenant)
            // verify required parameter 'searchDiscountRequest' is not null or undefined
            assertParamExists('discountSearch', 'searchDiscountRequest', searchDiscountRequest)
            const localVarPath = `/api/v1/discount/search`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchDiscountRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get tour schedules.
         * @param {string} tenant Description
         * @param {SearchTourSchedulesForDiscountRequest} searchTourSchedulesForDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountSearchTourSchedules: async (tenant: string, searchTourSchedulesForDiscountRequest: SearchTourSchedulesForDiscountRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('discountSearchTourSchedules', 'tenant', tenant)
            // verify required parameter 'searchTourSchedulesForDiscountRequest' is not null or undefined
            assertParamExists('discountSearchTourSchedules', 'searchTourSchedulesForDiscountRequest', searchTourSchedulesForDiscountRequest)
            const localVarPath = `/api/v1/discount/tourschedules`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(searchTourSchedulesForDiscountRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Search Discount By TourScheduleId.
         * @param {string} tenant Description
         * @param {string} [tourScheduleId] 
         * @param {DiscountOnType} [type] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountTourSearch: async (tenant: string, tourScheduleId?: string, type?: DiscountOnType, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('discountTourSearch', 'tenant', tenant)
            const localVarPath = `/api/v1/discount/tour`;
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

            if (tourScheduleId !== undefined) {
                localVarQueryParameter['TourScheduleId'] = tourScheduleId;
            }

            if (type !== undefined) {
                localVarQueryParameter['Type'] = type;
            }

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
         * @summary Update a Discount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateDiscountRequest} updateDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountUpdate: async (id: string, tenant: string, updateDiscountRequest: UpdateDiscountRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('discountUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('discountUpdate', 'tenant', tenant)
            // verify required parameter 'updateDiscountRequest' is not null or undefined
            assertParamExists('discountUpdate', 'updateDiscountRequest', updateDiscountRequest)
            const localVarPath = `/api/v1/discount/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateDiscountRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DiscountApi - functional programming interface
 * @export
 */
export const DiscountApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DiscountApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new Discount.
         * @param {string} tenant Description
         * @param {CreateDiscountRequest} createDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async discountCreate(tenant: string, createDiscountRequest: CreateDiscountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.discountCreate(tenant, createDiscountRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a Discount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async discountDelete(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.discountDelete(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get Discount detail.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async discountGet(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DiscountDetailDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.discountGet(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get sale orders of discount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async discountGetSaleOrders(id: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<SaleOrderByDiscountIdDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.discountGetSaleOrders(id, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get Discount with page SaleOrder.
         * @param {string} tenant Description
         * @param {SearchDiscountRequest} searchDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async discountGetWithSaleOrder(tenant: string, searchDiscountRequest: SearchDiscountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfDiscountDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.discountGetWithSaleOrder(tenant, searchDiscountRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search Discount using available filters.
         * @param {string} tenant Description
         * @param {SearchDiscountRequest} searchDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async discountSearch(tenant: string, searchDiscountRequest: SearchDiscountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfDiscountDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.discountSearch(tenant, searchDiscountRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get tour schedules.
         * @param {string} tenant Description
         * @param {SearchTourSchedulesForDiscountRequest} searchTourSchedulesForDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async discountSearchTourSchedules(tenant: string, searchTourSchedulesForDiscountRequest: SearchTourSchedulesForDiscountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginationResponseOfSearchTourSchedulesForDiscountDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.discountSearchTourSchedules(tenant, searchTourSchedulesForDiscountRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Search Discount By TourScheduleId.
         * @param {string} tenant Description
         * @param {string} [tourScheduleId] 
         * @param {DiscountOnType} [type] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async discountTourSearch(tenant: string, tourScheduleId?: string, type?: DiscountOnType, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DiscountDetailDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.discountTourSearch(tenant, tourScheduleId, type, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a Discount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateDiscountRequest} updateDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async discountUpdate(id: string, tenant: string, updateDiscountRequest: UpdateDiscountRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.discountUpdate(id, tenant, updateDiscountRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DiscountApi - factory interface
 * @export
 */
export const DiscountApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DiscountApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new Discount.
         * @param {string} tenant Description
         * @param {CreateDiscountRequest} createDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountCreate(tenant: string, createDiscountRequest: CreateDiscountRequest, options?: any): AxiosPromise<string> {
            return localVarFp.discountCreate(tenant, createDiscountRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a Discount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountDelete(id: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.discountDelete(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Discount detail.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountGet(id: string, tenant: string, options?: any): AxiosPromise<DiscountDetailDto> {
            return localVarFp.discountGet(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get sale orders of discount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountGetSaleOrders(id: string, tenant: string, options?: any): AxiosPromise<Array<SaleOrderByDiscountIdDto>> {
            return localVarFp.discountGetSaleOrders(id, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Discount with page SaleOrder.
         * @param {string} tenant Description
         * @param {SearchDiscountRequest} searchDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountGetWithSaleOrder(tenant: string, searchDiscountRequest: SearchDiscountRequest, options?: any): AxiosPromise<PaginationResponseOfDiscountDto> {
            return localVarFp.discountGetWithSaleOrder(tenant, searchDiscountRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search Discount using available filters.
         * @param {string} tenant Description
         * @param {SearchDiscountRequest} searchDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountSearch(tenant: string, searchDiscountRequest: SearchDiscountRequest, options?: any): AxiosPromise<PaginationResponseOfDiscountDto> {
            return localVarFp.discountSearch(tenant, searchDiscountRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get tour schedules.
         * @param {string} tenant Description
         * @param {SearchTourSchedulesForDiscountRequest} searchTourSchedulesForDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountSearchTourSchedules(tenant: string, searchTourSchedulesForDiscountRequest: SearchTourSchedulesForDiscountRequest, options?: any): AxiosPromise<PaginationResponseOfSearchTourSchedulesForDiscountDto> {
            return localVarFp.discountSearchTourSchedules(tenant, searchTourSchedulesForDiscountRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Search Discount By TourScheduleId.
         * @param {string} tenant Description
         * @param {string} [tourScheduleId] 
         * @param {DiscountOnType} [type] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountTourSearch(tenant: string, tourScheduleId?: string, type?: DiscountOnType, options?: any): AxiosPromise<DiscountDetailDto> {
            return localVarFp.discountTourSearch(tenant, tourScheduleId, type, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a Discount.
         * @param {string} id 
         * @param {string} tenant Description
         * @param {UpdateDiscountRequest} updateDiscountRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        discountUpdate(id: string, tenant: string, updateDiscountRequest: UpdateDiscountRequest, options?: any): AxiosPromise<string> {
            return localVarFp.discountUpdate(id, tenant, updateDiscountRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DiscountApi - object-oriented interface
 * @export
 * @class DiscountApi
 * @extends {BaseAPI}
 */
export class DiscountApi extends BaseAPI {
    /**
     * 
     * @summary Create a new Discount.
     * @param {string} tenant Description
     * @param {CreateDiscountRequest} createDiscountRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscountApi
     */
    public discountCreate(tenant: string, createDiscountRequest: CreateDiscountRequest, options?: AxiosRequestConfig) {
        return DiscountApiFp(this.configuration).discountCreate(tenant, createDiscountRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a Discount.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscountApi
     */
    public discountDelete(id: string, tenant: string, options?: AxiosRequestConfig) {
        return DiscountApiFp(this.configuration).discountDelete(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Discount detail.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscountApi
     */
    public discountGet(id: string, tenant: string, options?: AxiosRequestConfig) {
        return DiscountApiFp(this.configuration).discountGet(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get sale orders of discount.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscountApi
     */
    public discountGetSaleOrders(id: string, tenant: string, options?: AxiosRequestConfig) {
        return DiscountApiFp(this.configuration).discountGetSaleOrders(id, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Discount with page SaleOrder.
     * @param {string} tenant Description
     * @param {SearchDiscountRequest} searchDiscountRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscountApi
     */
    public discountGetWithSaleOrder(tenant: string, searchDiscountRequest: SearchDiscountRequest, options?: AxiosRequestConfig) {
        return DiscountApiFp(this.configuration).discountGetWithSaleOrder(tenant, searchDiscountRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search Discount using available filters.
     * @param {string} tenant Description
     * @param {SearchDiscountRequest} searchDiscountRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscountApi
     */
    public discountSearch(tenant: string, searchDiscountRequest: SearchDiscountRequest, options?: AxiosRequestConfig) {
        return DiscountApiFp(this.configuration).discountSearch(tenant, searchDiscountRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get tour schedules.
     * @param {string} tenant Description
     * @param {SearchTourSchedulesForDiscountRequest} searchTourSchedulesForDiscountRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscountApi
     */
    public discountSearchTourSchedules(tenant: string, searchTourSchedulesForDiscountRequest: SearchTourSchedulesForDiscountRequest, options?: AxiosRequestConfig) {
        return DiscountApiFp(this.configuration).discountSearchTourSchedules(tenant, searchTourSchedulesForDiscountRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Search Discount By TourScheduleId.
     * @param {string} tenant Description
     * @param {string} [tourScheduleId] 
     * @param {DiscountOnType} [type] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscountApi
     */
    public discountTourSearch(tenant: string, tourScheduleId?: string, type?: DiscountOnType, options?: AxiosRequestConfig) {
        return DiscountApiFp(this.configuration).discountTourSearch(tenant, tourScheduleId, type, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a Discount.
     * @param {string} id 
     * @param {string} tenant Description
     * @param {UpdateDiscountRequest} updateDiscountRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiscountApi
     */
    public discountUpdate(id: string, tenant: string, updateDiscountRequest: UpdateDiscountRequest, options?: AxiosRequestConfig) {
        return DiscountApiFp(this.configuration).discountUpdate(id, tenant, updateDiscountRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
