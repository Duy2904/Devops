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
import { SaleOrderLineDto } from './sale-order-line-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfSaleOrderLineDto
 */
export interface PaginationResponseOfSaleOrderLineDto {
    /**
     * 
     * @type {Array<SaleOrderLineDto>}
     * @memberof PaginationResponseOfSaleOrderLineDto
     */
    'data'?: Array<SaleOrderLineDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLineDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLineDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLineDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLineDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSaleOrderLineDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSaleOrderLineDto
     */
    'hasNextPage'?: boolean;
}
