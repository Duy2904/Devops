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
import { PassengerTypeDto } from './passenger-type-dto';
// May contain unused imports in some cases
// @ts-ignore
import { QuoteProductDto } from './quote-product-dto';

/**
 * 
 * @export
 * @interface QuoteLineDtoAllOf
 */
export interface QuoteLineDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof QuoteLineDtoAllOf
     */
    'vatName'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof QuoteLineDtoAllOf
     */
    'amount'?: number;
    /**
     * 
     * @type {number}
     * @memberof QuoteLineDtoAllOf
     */
    'taxAmount'?: number;
    /**
     * 
     * @type {number}
     * @memberof QuoteLineDtoAllOf
     */
    'revenue'?: number;
    /**
     * 
     * @type {PassengerTypeDto}
     * @memberof QuoteLineDtoAllOf
     */
    'passengerType'?: PassengerTypeDto;
    /**
     * 
     * @type {QuoteProductDto}
     * @memberof QuoteLineDtoAllOf
     */
    'product'?: QuoteProductDto;
}

