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
import { SearchTourSchedulesForDiscountDto } from './search-tour-schedules-for-discount-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfSearchTourSchedulesForDiscountDto
 */
export interface PaginationResponseOfSearchTourSchedulesForDiscountDto {
    /**
     * 
     * @type {Array<SearchTourSchedulesForDiscountDto>}
     * @memberof PaginationResponseOfSearchTourSchedulesForDiscountDto
     */
    'data'?: Array<SearchTourSchedulesForDiscountDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSearchTourSchedulesForDiscountDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSearchTourSchedulesForDiscountDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSearchTourSchedulesForDiscountDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSearchTourSchedulesForDiscountDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSearchTourSchedulesForDiscountDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSearchTourSchedulesForDiscountDto
     */
    'hasNextPage'?: boolean;
}

