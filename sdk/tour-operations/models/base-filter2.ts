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
import { BaseFilter2AdvancedFilter } from './base-filter2-advanced-filter';
// May contain unused imports in some cases
// @ts-ignore
import { BaseFilter2AdvancedSearch } from './base-filter2-advanced-search';

/**
 * 
 * @export
 * @interface BaseFilter2
 */
export interface BaseFilter2 {
    /**
     * 
     * @type {BaseFilter2AdvancedSearch}
     * @memberof BaseFilter2
     */
    'advancedSearch'?: BaseFilter2AdvancedSearch | null;
    /**
     * Keyword to Search in All the available columns of the Resource.
     * @type {string}
     * @memberof BaseFilter2
     */
    'keyword'?: string | null;
    /**
     * 
     * @type {BaseFilter2AdvancedFilter}
     * @memberof BaseFilter2
     */
    'advancedFilter'?: BaseFilter2AdvancedFilter | null;
    /**
     * The pagination list always contain these items that used for dropdown box.
     * @type {Array<string>}
     * @memberof BaseFilter2
     */
    'includeIds'?: Array<string> | null;
}

