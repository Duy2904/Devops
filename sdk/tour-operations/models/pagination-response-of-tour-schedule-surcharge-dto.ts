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
import { TourScheduleSurchargeDto } from './tour-schedule-surcharge-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfTourScheduleSurchargeDto
 */
export interface PaginationResponseOfTourScheduleSurchargeDto {
    /**
     * 
     * @type {Array<TourScheduleSurchargeDto>}
     * @memberof PaginationResponseOfTourScheduleSurchargeDto
     */
    'data'?: Array<TourScheduleSurchargeDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTourScheduleSurchargeDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTourScheduleSurchargeDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTourScheduleSurchargeDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTourScheduleSurchargeDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfTourScheduleSurchargeDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfTourScheduleSurchargeDto
     */
    'hasNextPage'?: boolean;
}

