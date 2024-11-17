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
import { SaleOrderLineTravellerDto } from './sale-order-line-traveller-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfSaleOrderLineTravellerDto
 */
export interface PaginationResponseOfSaleOrderLineTravellerDto {
    /**
     * 
     * @type {Array<SaleOrderLineTravellerDto>}
     * @memberof PaginationResponseOfSaleOrderLineTravellerDto
     */
    'data'?: Array<SaleOrderLineTravellerDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLineTravellerDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLineTravellerDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLineTravellerDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLineTravellerDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSaleOrderLineTravellerDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSaleOrderLineTravellerDto
     */
    'hasNextPage'?: boolean;
}

