/* tslint:disable */
/* eslint-disable */
/**
 * TripOTA TMC WebAPI
 * The TripOTA TMC WebApi built with Multitenancy Support.
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: touch@tripota.com.vn
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { AccommodationDto } from './accommodation-dto';
// May contain unused imports in some cases
// @ts-ignore
import { FilterOption } from './filter-option';

/**
 * 
 * @export
 * @interface PaginationResponseOfAccommodationDto
 */
export interface PaginationResponseOfAccommodationDto {
    /**
     * 
     * @type {Array<AccommodationDto>}
     * @memberof PaginationResponseOfAccommodationDto
     */
    'data'?: Array<AccommodationDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfAccommodationDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfAccommodationDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfAccommodationDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfAccommodationDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfAccommodationDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfAccommodationDto
     */
    'hasNextPage'?: boolean;
    /**
     * 
     * @type {Array<FilterOption>}
     * @memberof PaginationResponseOfAccommodationDto
     */
    'filterOptions'?: Array<FilterOption> | null;
}
