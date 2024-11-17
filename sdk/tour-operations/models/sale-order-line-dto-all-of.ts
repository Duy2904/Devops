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
import { SaleOrderLineDtoAllOfProduct } from './sale-order-line-dto-all-of-product';

/**
 * 
 * @export
 * @interface SaleOrderLineDtoAllOf
 */
export interface SaleOrderLineDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof SaleOrderLineDtoAllOf
     */
    'id'?: string;
    /**
     * 
     * @type {number}
     * @memberof SaleOrderLineDtoAllOf
     */
    'amount'?: number;
    /**
     * 
     * @type {SaleOrderLineDtoAllOfProduct}
     * @memberof SaleOrderLineDtoAllOf
     */
    'product'?: SaleOrderLineDtoAllOfProduct | null;
}
