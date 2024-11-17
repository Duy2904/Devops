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
import { SearchDepartmentViewDto } from './search-department-view-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfSearchDepartmentViewDto
 */
export interface PaginationResponseOfSearchDepartmentViewDto {
    /**
     * 
     * @type {Array<SearchDepartmentViewDto>}
     * @memberof PaginationResponseOfSearchDepartmentViewDto
     */
    'data'?: Array<SearchDepartmentViewDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSearchDepartmentViewDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSearchDepartmentViewDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSearchDepartmentViewDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfSearchDepartmentViewDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSearchDepartmentViewDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfSearchDepartmentViewDto
     */
    'hasNextPage'?: boolean;
}

