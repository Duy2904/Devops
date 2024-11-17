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



/**
 * 
 * @export
 * @interface Filter
 */
export interface Filter {
    /**
     * 
     * @type {string}
     * @memberof Filter
     */
    'logic'?: string | null;
    /**
     * 
     * @type {Array<Filter>}
     * @memberof Filter
     */
    'filters'?: Array<Filter> | null;
    /**
     * 
     * @type {string}
     * @memberof Filter
     */
    'field'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Filter
     */
    'operator'?: string | null;
    /**
     * 
     * @type {any}
     * @memberof Filter
     */
    'value'?: any | null;
}

