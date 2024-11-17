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
/**
 * TestApi - axios parameter creator
 * @export
 */
export const TestApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        testSyncData: async (tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('testSyncData', 'tenant', tenant)
            const localVarPath = `/api/v1/test/thiennhien/sync-data`;
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


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TestApi - functional programming interface
 * @export
 */
export const TestApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TestApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async testSyncData(tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.testSyncData(tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TestApi - factory interface
 * @export
 */
export const TestApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TestApiFp(configuration)
    return {
        /**
         * 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        testSyncData(tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.testSyncData(tenant, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TestApi - object-oriented interface
 * @export
 * @class TestApi
 * @extends {BaseAPI}
 */
export class TestApi extends BaseAPI {
    /**
     * 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TestApi
     */
    public testSyncData(tenant: string, options?: AxiosRequestConfig) {
        return TestApiFp(this.configuration).testSyncData(tenant, options).then((request) => request(this.axios, this.basePath));
    }
}