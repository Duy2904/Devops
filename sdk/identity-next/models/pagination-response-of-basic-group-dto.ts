/* tslint:disable */
/* eslint-disable */
/**
 * TripOTA Identity Next
 * TripOTA Identity Next built with Multitenancy Support.
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: touch@tripota.com.vn
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { BasicGroupDto } from './basic-group-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfBasicGroupDto
 */
export interface PaginationResponseOfBasicGroupDto {
    /**
     * 
     * @type {Array<BasicGroupDto>}
     * @memberof PaginationResponseOfBasicGroupDto
     */
    'data'?: Array<BasicGroupDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfBasicGroupDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfBasicGroupDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfBasicGroupDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfBasicGroupDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfBasicGroupDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfBasicGroupDto
     */
    'hasNextPage'?: boolean;
}
