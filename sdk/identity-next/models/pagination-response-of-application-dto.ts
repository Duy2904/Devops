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
import { ApplicationDto } from './application-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfApplicationDto
 */
export interface PaginationResponseOfApplicationDto {
    /**
     * 
     * @type {Array<ApplicationDto>}
     * @memberof PaginationResponseOfApplicationDto
     */
    'data'?: Array<ApplicationDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfApplicationDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfApplicationDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfApplicationDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfApplicationDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfApplicationDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfApplicationDto
     */
    'hasNextPage'?: boolean;
}

