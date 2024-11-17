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
import { UserWithPermissionsDto } from './user-with-permissions-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfUserWithPermissionsDto
 */
export interface PaginationResponseOfUserWithPermissionsDto {
    /**
     * 
     * @type {Array<UserWithPermissionsDto>}
     * @memberof PaginationResponseOfUserWithPermissionsDto
     */
    'data'?: Array<UserWithPermissionsDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfUserWithPermissionsDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfUserWithPermissionsDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfUserWithPermissionsDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfUserWithPermissionsDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfUserWithPermissionsDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfUserWithPermissionsDto
     */
    'hasNextPage'?: boolean;
}
