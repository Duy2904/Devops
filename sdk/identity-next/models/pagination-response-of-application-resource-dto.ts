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
import { ApplicationResourceDto } from './application-resource-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfApplicationResourceDto
 */
export interface PaginationResponseOfApplicationResourceDto {
    /**
     * 
     * @type {Array<ApplicationResourceDto>}
     * @memberof PaginationResponseOfApplicationResourceDto
     */
    'data'?: Array<ApplicationResourceDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfApplicationResourceDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfApplicationResourceDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfApplicationResourceDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfApplicationResourceDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfApplicationResourceDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfApplicationResourceDto
     */
    'hasNextPage'?: boolean;
}
