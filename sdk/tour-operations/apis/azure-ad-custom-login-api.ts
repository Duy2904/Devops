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
import { ErrorResult } from '../models';
// @ts-ignore
import { HttpValidationProblemDetails } from '../models';
// @ts-ignore
import { SyncCustomLoginUiRequest } from '../models';
// @ts-ignore
import { UpdateCustomLoginUiRequest } from '../models';
/**
 * AzureAdCustomLoginApi - axios parameter creator
 * @export
 */
export const AzureAdCustomLoginApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get a preview template file.
         * @param {string} tenantId 
         * @param {string} template 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        azureAdCustomLoginPreView: async (tenantId: string, template: string, tenant: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenantId' is not null or undefined
            assertParamExists('azureAdCustomLoginPreView', 'tenantId', tenantId)
            // verify required parameter 'template' is not null or undefined
            assertParamExists('azureAdCustomLoginPreView', 'template', template)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('azureAdCustomLoginPreView', 'tenant', tenant)
            const localVarPath = `/api/v1/azureadcustomlogin/{tenantId}/{template}`
                .replace(`{${"tenantId"}}`, encodeURIComponent(String(tenantId)))
                .replace(`{${"template"}}`, encodeURIComponent(String(template)));
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
         * @summary Sync Custom Login UI.
         * @param {string} tenant Description
         * @param {SyncCustomLoginUiRequest} syncCustomLoginUiRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        azureAdCustomLoginSyncCustomLoginUi: async (tenant: string, syncCustomLoginUiRequest: SyncCustomLoginUiRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('azureAdCustomLoginSyncCustomLoginUi', 'tenant', tenant)
            // verify required parameter 'syncCustomLoginUiRequest' is not null or undefined
            assertParamExists('azureAdCustomLoginSyncCustomLoginUi', 'syncCustomLoginUiRequest', syncCustomLoginUiRequest)
            const localVarPath = `/api/v1/azureadcustomlogin/sync-ui`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(syncCustomLoginUiRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update Custom Login UI.
         * @param {string} tenant Description
         * @param {UpdateCustomLoginUiRequest} updateCustomLoginUiRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        azureAdCustomLoginUpdateCustomLoginUi: async (tenant: string, updateCustomLoginUiRequest: UpdateCustomLoginUiRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('azureAdCustomLoginUpdateCustomLoginUi', 'tenant', tenant)
            // verify required parameter 'updateCustomLoginUiRequest' is not null or undefined
            assertParamExists('azureAdCustomLoginUpdateCustomLoginUi', 'updateCustomLoginUiRequest', updateCustomLoginUiRequest)
            const localVarPath = `/api/v1/azureadcustomlogin/update-ui`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateCustomLoginUiRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update Custom Login UI Template Files.
         * @param {string} tenantId 
         * @param {string} tenant Description
         * @param {Array<File>} [files] 
         * @param {string} [tenantId2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        azureAdCustomLoginUpdateTemplate: async (tenantId: string, tenant: string, files?: Array<File>, tenantId2?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenantId' is not null or undefined
            assertParamExists('azureAdCustomLoginUpdateTemplate', 'tenantId', tenantId)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('azureAdCustomLoginUpdateTemplate', 'tenant', tenant)
            const localVarPath = `/api/v1/azureadcustomlogin/update-template/{tenantId}`
                .replace(`{${"tenantId"}}`, encodeURIComponent(String(tenantId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();

            // authentication Bearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "Bearer", [], configuration)

            if (tenant != null) {
                localVarHeaderParameter['tenant'] = String(tenant);
            }

            if (files) {
                files.forEach((element) => {
                    localVarFormParams.append('Files', element as any);
                })
            }

    
            if (tenantId2 !== undefined) { 
                localVarFormParams.append('TenantId', tenantId2 as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AzureAdCustomLoginApi - functional programming interface
 * @export
 */
export const AzureAdCustomLoginApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AzureAdCustomLoginApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get a preview template file.
         * @param {string} tenantId 
         * @param {string} template 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async azureAdCustomLoginPreView(tenantId: string, template: string, tenant: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.azureAdCustomLoginPreView(tenantId, template, tenant, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Sync Custom Login UI.
         * @param {string} tenant Description
         * @param {SyncCustomLoginUiRequest} syncCustomLoginUiRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async azureAdCustomLoginSyncCustomLoginUi(tenant: string, syncCustomLoginUiRequest: SyncCustomLoginUiRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.azureAdCustomLoginSyncCustomLoginUi(tenant, syncCustomLoginUiRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update Custom Login UI.
         * @param {string} tenant Description
         * @param {UpdateCustomLoginUiRequest} updateCustomLoginUiRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async azureAdCustomLoginUpdateCustomLoginUi(tenant: string, updateCustomLoginUiRequest: UpdateCustomLoginUiRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.azureAdCustomLoginUpdateCustomLoginUi(tenant, updateCustomLoginUiRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update Custom Login UI Template Files.
         * @param {string} tenantId 
         * @param {string} tenant Description
         * @param {Array<File>} [files] 
         * @param {string} [tenantId2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async azureAdCustomLoginUpdateTemplate(tenantId: string, tenant: string, files?: Array<File>, tenantId2?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.azureAdCustomLoginUpdateTemplate(tenantId, tenant, files, tenantId2, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AzureAdCustomLoginApi - factory interface
 * @export
 */
export const AzureAdCustomLoginApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AzureAdCustomLoginApiFp(configuration)
    return {
        /**
         * 
         * @summary Get a preview template file.
         * @param {string} tenantId 
         * @param {string} template 
         * @param {string} tenant Description
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        azureAdCustomLoginPreView(tenantId: string, template: string, tenant: string, options?: any): AxiosPromise<string> {
            return localVarFp.azureAdCustomLoginPreView(tenantId, template, tenant, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Sync Custom Login UI.
         * @param {string} tenant Description
         * @param {SyncCustomLoginUiRequest} syncCustomLoginUiRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        azureAdCustomLoginSyncCustomLoginUi(tenant: string, syncCustomLoginUiRequest: SyncCustomLoginUiRequest, options?: any): AxiosPromise<void> {
            return localVarFp.azureAdCustomLoginSyncCustomLoginUi(tenant, syncCustomLoginUiRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update Custom Login UI.
         * @param {string} tenant Description
         * @param {UpdateCustomLoginUiRequest} updateCustomLoginUiRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        azureAdCustomLoginUpdateCustomLoginUi(tenant: string, updateCustomLoginUiRequest: UpdateCustomLoginUiRequest, options?: any): AxiosPromise<string> {
            return localVarFp.azureAdCustomLoginUpdateCustomLoginUi(tenant, updateCustomLoginUiRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update Custom Login UI Template Files.
         * @param {string} tenantId 
         * @param {string} tenant Description
         * @param {Array<File>} [files] 
         * @param {string} [tenantId2] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        azureAdCustomLoginUpdateTemplate(tenantId: string, tenant: string, files?: Array<File>, tenantId2?: string, options?: any): AxiosPromise<void> {
            return localVarFp.azureAdCustomLoginUpdateTemplate(tenantId, tenant, files, tenantId2, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AzureAdCustomLoginApi - object-oriented interface
 * @export
 * @class AzureAdCustomLoginApi
 * @extends {BaseAPI}
 */
export class AzureAdCustomLoginApi extends BaseAPI {
    /**
     * 
     * @summary Get a preview template file.
     * @param {string} tenantId 
     * @param {string} template 
     * @param {string} tenant Description
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AzureAdCustomLoginApi
     */
    public azureAdCustomLoginPreView(tenantId: string, template: string, tenant: string, options?: AxiosRequestConfig) {
        return AzureAdCustomLoginApiFp(this.configuration).azureAdCustomLoginPreView(tenantId, template, tenant, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Sync Custom Login UI.
     * @param {string} tenant Description
     * @param {SyncCustomLoginUiRequest} syncCustomLoginUiRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AzureAdCustomLoginApi
     */
    public azureAdCustomLoginSyncCustomLoginUi(tenant: string, syncCustomLoginUiRequest: SyncCustomLoginUiRequest, options?: AxiosRequestConfig) {
        return AzureAdCustomLoginApiFp(this.configuration).azureAdCustomLoginSyncCustomLoginUi(tenant, syncCustomLoginUiRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update Custom Login UI.
     * @param {string} tenant Description
     * @param {UpdateCustomLoginUiRequest} updateCustomLoginUiRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AzureAdCustomLoginApi
     */
    public azureAdCustomLoginUpdateCustomLoginUi(tenant: string, updateCustomLoginUiRequest: UpdateCustomLoginUiRequest, options?: AxiosRequestConfig) {
        return AzureAdCustomLoginApiFp(this.configuration).azureAdCustomLoginUpdateCustomLoginUi(tenant, updateCustomLoginUiRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update Custom Login UI Template Files.
     * @param {string} tenantId 
     * @param {string} tenant Description
     * @param {Array<File>} [files] 
     * @param {string} [tenantId2] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AzureAdCustomLoginApi
     */
    public azureAdCustomLoginUpdateTemplate(tenantId: string, tenant: string, files?: Array<File>, tenantId2?: string, options?: AxiosRequestConfig) {
        return AzureAdCustomLoginApiFp(this.configuration).azureAdCustomLoginUpdateTemplate(tenantId, tenant, files, tenantId2, options).then((request) => request(this.axios, this.basePath));
    }
}