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
import { Country } from './country';

/**
 * 
 * @export
 * @interface LocationAllOf
 */
export interface LocationAllOf {
    /**
     * 
     * @type {string}
     * @memberof LocationAllOf
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocationAllOf
     */
    'code'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocationAllOf
     */
    'type'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocationAllOf
     */
    'countryId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocationAllOf
     */
    'parentId'?: string | null;
    /**
     * 
     * @type {Country}
     * @memberof LocationAllOf
     */
    'country'?: Country;
}

