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


// May contain unused imports in some cases
// @ts-ignore
import { KeyValuePairOfStringAndString } from './key-value-pair-of-string-and-string';

/**
 * 
 * @export
 * @interface UpdateCustomLoginUiRequest
 */
export interface UpdateCustomLoginUiRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomLoginUiRequest
     */
    'tenantId'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomLoginUiRequest
     */
    'template'?: string;
    /**
     * 
     * @type {Array<KeyValuePairOfStringAndString>}
     * @memberof UpdateCustomLoginUiRequest
     */
    'fields'?: Array<KeyValuePairOfStringAndString>;
}
