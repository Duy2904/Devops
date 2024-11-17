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
import { TransportationDto } from './transportation-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfTransportationDto
 */
export interface PaginationResponseOfTransportationDto {
    /**
     * 
     * @type {Array<TransportationDto>}
     * @memberof PaginationResponseOfTransportationDto
     */
    'data'?: Array<TransportationDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTransportationDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTransportationDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTransportationDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTransportationDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfTransportationDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfTransportationDto
     */
    'hasNextPage'?: boolean;
}
