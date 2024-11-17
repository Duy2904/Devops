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
import { PositionDto } from './position-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfPositionDto
 */
export interface PaginationResponseOfPositionDto {
    /**
     * 
     * @type {Array<PositionDto>}
     * @memberof PaginationResponseOfPositionDto
     */
    'data'?: Array<PositionDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfPositionDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfPositionDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfPositionDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfPositionDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfPositionDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfPositionDto
     */
    'hasNextPage'?: boolean;
}

