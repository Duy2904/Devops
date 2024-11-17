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
 * @interface SearchTourInforsRequestAllOf
 */
export interface SearchTourInforsRequestAllOf {
    /**
     * 
     * @type {string}
     * @memberof SearchTourInforsRequestAllOf
     */
    'tourTypeId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SearchTourInforsRequestAllOf
     */
    'tourCategoryId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SearchTourInforsRequestAllOf
     */
    'departureLocationId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SearchTourInforsRequestAllOf
     */
    'destinationLocationId'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof SearchTourInforsRequestAllOf
     */
    'fromDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SearchTourInforsRequestAllOf
     */
    'toDate'?: Date | null;
}

