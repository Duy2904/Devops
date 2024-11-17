/* tslint:disable */
/* eslint-disable */
/**
 * TripOTA Identity Next
 * TripOTA Identity Next built with Multitenancy Support.
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: touch@tripota.com.vn
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
import { CreateGroupPositionRequest } from '../models';
// @ts-ignore
import { DeleteGroupPositionRequest } from '../models';
// @ts-ignore
import { GroupPositionDto } from '../models';
// @ts-ignore
import { UpdateGroupPositionRequest } from '../models';
/**
 * GroupPositionApi - axios parameter creator
 * @export
 */
export const GroupPositionApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a group position.
         * @param {string} tenant Input your tenant Id to access this API
         * @param {CreateGroupPositionRequest} createGroupPositionRequest 
         * @param {string} [xApiRm] Request mode
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        groupPositionCreate: async (tenant: string, createGroupPositionRequest: CreateGroupPositionRequest, xApiRm?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('groupPositionCreate', 'tenant', tenant)
            // verify required parameter 'createGroupPositionRequest' is not null or undefined
            assertParamExists('groupPositionCreate', 'createGroupPositionRequest', createGroupPositionRequest)
            const localVarPath = `/api/v1/GroupPosition`;
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
            await setApiKeyToObject(localVarHeaderParameter, "x-api-key", configuration)

            if (xApiRm != null) {
                localVarHeaderParameter['x-api-rm'] = String(xApiRm);
            }

            if (tenant != null) {
                localVarHeaderParameter['tenant'] = String(tenant);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createGroupPositionRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a group position with id.
         * @param {string} id 
         * @param {DeleteGroupPositionRequest} deleteGroupPositionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        groupPositionDelete: async (id: string, deleteGroupPositionRequest: DeleteGroupPositionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('groupPositionDelete', 'id', id)
            // verify required parameter 'deleteGroupPositionRequest' is not null or undefined
            assertParamExists('groupPositionDelete', 'deleteGroupPositionRequest', deleteGroupPositionRequest)
            const localVarPath = `/api/v1/GroupPosition/{id}`
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
            await setApiKeyToObject(localVarHeaderParameter, "x-api-key", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(deleteGroupPositionRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get a group position with id.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        groupPositionGetById: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('groupPositionGetById', 'id', id)
            const localVarPath = `/api/v1/GroupPosition/{id}`
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
            await setApiKeyToObject(localVarHeaderParameter, "x-api-key", configuration)


    
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
         * @summary Update a group position.
         * @param {string} id 
         * @param {string} tenant Input your tenant Id to access this API
         * @param {UpdateGroupPositionRequest} updateGroupPositionRequest 
         * @param {string} [xApiRm] Request mode
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        groupPositionUpdate: async (id: string, tenant: string, updateGroupPositionRequest: UpdateGroupPositionRequest, xApiRm?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('groupPositionUpdate', 'id', id)
            // verify required parameter 'tenant' is not null or undefined
            assertParamExists('groupPositionUpdate', 'tenant', tenant)
            // verify required parameter 'updateGroupPositionRequest' is not null or undefined
            assertParamExists('groupPositionUpdate', 'updateGroupPositionRequest', updateGroupPositionRequest)
            const localVarPath = `/api/v1/GroupPosition/{id}`
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
            await setApiKeyToObject(localVarHeaderParameter, "x-api-key", configuration)

            if (xApiRm != null) {
                localVarHeaderParameter['x-api-rm'] = String(xApiRm);
            }

            if (tenant != null) {
                localVarHeaderParameter['tenant'] = String(tenant);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateGroupPositionRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * GroupPositionApi - functional programming interface
 * @export
 */
export const GroupPositionApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GroupPositionApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a group position.
         * @param {string} tenant Input your tenant Id to access this API
         * @param {CreateGroupPositionRequest} createGroupPositionRequest 
         * @param {string} [xApiRm] Request mode
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async groupPositionCreate(tenant: string, createGroupPositionRequest: CreateGroupPositionRequest, xApiRm?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GroupPositionDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.groupPositionCreate(tenant, createGroupPositionRequest, xApiRm, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete a group position with id.
         * @param {string} id 
         * @param {DeleteGroupPositionRequest} deleteGroupPositionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async groupPositionDelete(id: string, deleteGroupPositionRequest: DeleteGroupPositionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.groupPositionDelete(id, deleteGroupPositionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get a group position with id.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async groupPositionGetById(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GroupPositionDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.groupPositionGetById(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update a group position.
         * @param {string} id 
         * @param {string} tenant Input your tenant Id to access this API
         * @param {UpdateGroupPositionRequest} updateGroupPositionRequest 
         * @param {string} [xApiRm] Request mode
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async groupPositionUpdate(id: string, tenant: string, updateGroupPositionRequest: UpdateGroupPositionRequest, xApiRm?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GroupPositionDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.groupPositionUpdate(id, tenant, updateGroupPositionRequest, xApiRm, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * GroupPositionApi - factory interface
 * @export
 */
export const GroupPositionApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GroupPositionApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a group position.
         * @param {string} tenant Input your tenant Id to access this API
         * @param {CreateGroupPositionRequest} createGroupPositionRequest 
         * @param {string} [xApiRm] Request mode
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        groupPositionCreate(tenant: string, createGroupPositionRequest: CreateGroupPositionRequest, xApiRm?: string, options?: any): AxiosPromise<GroupPositionDto> {
            return localVarFp.groupPositionCreate(tenant, createGroupPositionRequest, xApiRm, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a group position with id.
         * @param {string} id 
         * @param {DeleteGroupPositionRequest} deleteGroupPositionRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        groupPositionDelete(id: string, deleteGroupPositionRequest: DeleteGroupPositionRequest, options?: any): AxiosPromise<string> {
            return localVarFp.groupPositionDelete(id, deleteGroupPositionRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get a group position with id.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        groupPositionGetById(id: string, options?: any): AxiosPromise<GroupPositionDto> {
            return localVarFp.groupPositionGetById(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a group position.
         * @param {string} id 
         * @param {string} tenant Input your tenant Id to access this API
         * @param {UpdateGroupPositionRequest} updateGroupPositionRequest 
         * @param {string} [xApiRm] Request mode
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        groupPositionUpdate(id: string, tenant: string, updateGroupPositionRequest: UpdateGroupPositionRequest, xApiRm?: string, options?: any): AxiosPromise<GroupPositionDto> {
            return localVarFp.groupPositionUpdate(id, tenant, updateGroupPositionRequest, xApiRm, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GroupPositionApi - object-oriented interface
 * @export
 * @class GroupPositionApi
 * @extends {BaseAPI}
 */
export class GroupPositionApi extends BaseAPI {
    /**
     * 
     * @summary Create a group position.
     * @param {string} tenant Input your tenant Id to access this API
     * @param {CreateGroupPositionRequest} createGroupPositionRequest 
     * @param {string} [xApiRm] Request mode
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupPositionApi
     */
    public groupPositionCreate(tenant: string, createGroupPositionRequest: CreateGroupPositionRequest, xApiRm?: string, options?: AxiosRequestConfig) {
        return GroupPositionApiFp(this.configuration).groupPositionCreate(tenant, createGroupPositionRequest, xApiRm, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a group position with id.
     * @param {string} id 
     * @param {DeleteGroupPositionRequest} deleteGroupPositionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupPositionApi
     */
    public groupPositionDelete(id: string, deleteGroupPositionRequest: DeleteGroupPositionRequest, options?: AxiosRequestConfig) {
        return GroupPositionApiFp(this.configuration).groupPositionDelete(id, deleteGroupPositionRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get a group position with id.
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupPositionApi
     */
    public groupPositionGetById(id: string, options?: AxiosRequestConfig) {
        return GroupPositionApiFp(this.configuration).groupPositionGetById(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a group position.
     * @param {string} id 
     * @param {string} tenant Input your tenant Id to access this API
     * @param {UpdateGroupPositionRequest} updateGroupPositionRequest 
     * @param {string} [xApiRm] Request mode
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupPositionApi
     */
    public groupPositionUpdate(id: string, tenant: string, updateGroupPositionRequest: UpdateGroupPositionRequest, xApiRm?: string, options?: AxiosRequestConfig) {
        return GroupPositionApiFp(this.configuration).groupPositionUpdate(id, tenant, updateGroupPositionRequest, xApiRm, options).then((request) => request(this.axios, this.basePath));
    }
}
