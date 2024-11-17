/* tslint:disable */
/* eslint-disable */
/**
 * .NET 7 WebAPI - Clean Architecture
 * Clean Architecture Template for .NET 7 WebApi built with Multitenancy Support.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: hello@codewithmukesh.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { TourScheduleDtoAllOfStatus } from './tour-schedule-dto-all-of-status';

/**
 * 
 * @export
 * @interface SearchTourSchedulesRequestAllOf
 */
export interface SearchTourSchedulesRequestAllOf {
    /**
     * 
     * @type {string}
     * @memberof SearchTourSchedulesRequestAllOf
     */
    'tourTypeId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SearchTourSchedulesRequestAllOf
     */
    'tourCategoryId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SearchTourSchedulesRequestAllOf
     */
    'departureLocationId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SearchTourSchedulesRequestAllOf
     */
    'destinationLocationId'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof SearchTourSchedulesRequestAllOf
     */
    'departureDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SearchTourSchedulesRequestAllOf
     */
    'endDate'?: Date | null;
    /**
     * 
     * @type {TourScheduleDtoAllOfStatus}
     * @memberof SearchTourSchedulesRequestAllOf
     */
    'status'?: TourScheduleDtoAllOfStatus | null;
    /**
     * 
     * @type {Date}
     * @memberof SearchTourSchedulesRequestAllOf
     */
    'fromDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SearchTourSchedulesRequestAllOf
     */
    'toDate'?: Date | null;
}

