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
import { ViewUserWithGroupDto } from './view-user-with-group-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfViewUserWithGroupDto
 */
export interface PaginationResponseOfViewUserWithGroupDto {
    /**
     * 
     * @type {Array<ViewUserWithGroupDto>}
     * @memberof PaginationResponseOfViewUserWithGroupDto
     */
    'data'?: Array<ViewUserWithGroupDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfViewUserWithGroupDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfViewUserWithGroupDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfViewUserWithGroupDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfViewUserWithGroupDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfViewUserWithGroupDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfViewUserWithGroupDto
     */
    'hasNextPage'?: boolean;
}
