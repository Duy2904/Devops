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
import { CustomerAddressDto } from './customer-address-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfCustomerAddressDto
 */
export interface PaginationResponseOfCustomerAddressDto {
    /**
     * 
     * @type {Array<CustomerAddressDto>}
     * @memberof PaginationResponseOfCustomerAddressDto
     */
    'data'?: Array<CustomerAddressDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfCustomerAddressDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfCustomerAddressDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfCustomerAddressDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfCustomerAddressDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfCustomerAddressDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfCustomerAddressDto
     */
    'hasNextPage'?: boolean;
}
