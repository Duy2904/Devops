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
import { QuoteProductDto2 } from './quote-product-dto2';

/**
 * 
 * @export
 * @interface PaginationResponseOfQuoteProductDto
 */
export interface PaginationResponseOfQuoteProductDto {
    /**
     * 
     * @type {Array<QuoteProductDto2>}
     * @memberof PaginationResponseOfQuoteProductDto
     */
    'data'?: Array<QuoteProductDto2>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfQuoteProductDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfQuoteProductDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfQuoteProductDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfQuoteProductDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfQuoteProductDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfQuoteProductDto
     */
    'hasNextPage'?: boolean;
}
