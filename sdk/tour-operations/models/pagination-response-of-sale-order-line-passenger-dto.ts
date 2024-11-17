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
import { SaleOrderLinePassengerDto } from './sale-order-line-passenger-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfSaleOrderLinePassengerDto
 */
export interface PaginationResponseOfSaleOrderLinePassengerDto {
    /**
     * 
     * @type {Array<SaleOrderLinePassengerDto>}
     * @memberof PaginationResponseOfSaleOrderLinePassengerDto
     */
    'data'?: Array<SaleOrderLinePassengerDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLinePassengerDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLinePassengerDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLinePassengerDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSaleOrderLinePassengerDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSaleOrderLinePassengerDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSaleOrderLinePassengerDto
     */
    'hasNextPage'?: boolean;
}

