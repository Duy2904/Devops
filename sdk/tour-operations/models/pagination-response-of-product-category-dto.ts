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
import { ProductCategoryDto } from './product-category-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfProductCategoryDto
 */
export interface PaginationResponseOfProductCategoryDto {
    /**
     * 
     * @type {Array<ProductCategoryDto>}
     * @memberof PaginationResponseOfProductCategoryDto
     */
    'data'?: Array<ProductCategoryDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfProductCategoryDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfProductCategoryDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfProductCategoryDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfProductCategoryDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfProductCategoryDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfProductCategoryDto
     */
    'hasNextPage'?: boolean;
}

