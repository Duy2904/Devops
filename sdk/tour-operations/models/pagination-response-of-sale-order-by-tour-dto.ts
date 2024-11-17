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
import { SaleOrderByTourDto } from './sale-order-by-tour-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfSaleOrderByTourDto
 */
export interface PaginationResponseOfSaleOrderByTourDto {
    /**
     * 
     * @type {Array<SaleOrderByTourDto>}
     * @memberof PaginationResponseOfSaleOrderByTourDto
     */
    'data'?: Array<SaleOrderByTourDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderByTourDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderByTourDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderByTourDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderByTourDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSaleOrderByTourDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSaleOrderByTourDto
     */
    'hasNextPage'?: boolean;
}
