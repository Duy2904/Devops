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
import { DiscountConditionType } from './discount-condition-type';
// May contain unused imports in some cases
// @ts-ignore
import { DiscountType } from './discount-type';

/**
 * 
 * @export
 * @interface DiscountLineRequest
 */
export interface DiscountLineRequest {
    /**
     * 
     * @type {string}
     * @memberof DiscountLineRequest
     */
    'id'?: string | null;
    /**
     * 
     * @type {DiscountConditionType}
     * @memberof DiscountLineRequest
     */
    'discountConditionType'?: DiscountConditionType;
    /**
     * 
     * @type {DiscountType}
     * @memberof DiscountLineRequest
     */
    'discountType'?: DiscountType;
    /**
     * 
     * @type {number}
     * @memberof DiscountLineRequest
     */
    'quantity'?: number;
    /**
     * 
     * @type {number}
     * @memberof DiscountLineRequest
     */
    'value'?: number;
    /**
     * 
     * @type {Date}
     * @memberof DiscountLineRequest
     */
    'startDate'?: Date;
    /**
     * 
     * @type {Date}
     * @memberof DiscountLineRequest
     */
    'endDate'?: Date;
}



