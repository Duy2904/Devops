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
import { ReceivableVoucherDto } from './receivable-voucher-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfReceivableVoucherDto
 */
export interface PaginationResponseOfReceivableVoucherDto {
    /**
     * 
     * @type {Array<ReceivableVoucherDto>}
     * @memberof PaginationResponseOfReceivableVoucherDto
     */
    'data'?: Array<ReceivableVoucherDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfReceivableVoucherDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfReceivableVoucherDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfReceivableVoucherDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfReceivableVoucherDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfReceivableVoucherDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfReceivableVoucherDto
     */
    'hasNextPage'?: boolean;
}

