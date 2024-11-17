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
import { QuoteStatus } from './quote-status';

/**
 * 
 * @export
 * @interface SearchQuoteDto
 */
export interface SearchQuoteDto {
    /**
     * 
     * @type {string}
     * @memberof SearchQuoteDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchQuoteDto
     */
    'orderNo'?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchQuoteDto
     */
    'description'?: string;
    /**
     * 
     * @type {QuoteStatus}
     * @memberof SearchQuoteDto
     */
    'status'?: QuoteStatus;
    /**
     * 
     * @type {string}
     * @memberof SearchQuoteDto
     */
    'tourScheduleId'?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchQuoteDto
     */
    'tourScheduleTourCode'?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchQuoteDto
     */
    'tourScheduleName'?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchQuoteDto
     */
    'note'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof SearchQuoteDto
     */
    'createdOn'?: Date;
    /**
     * 
     * @type {number}
     * @memberof SearchQuoteDto
     */
    'revenue'?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQuoteDto
     */
    'cost'?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQuoteDto
     */
    'profit'?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQuoteDto
     */
    'rosAmount'?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQuoteDto
     */
    'roeAmount'?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQuoteDto
     */
    'adtQuantity'?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQuoteDto
     */
    'chdQuantity'?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchQuoteDto
     */
    'infQuantity'?: number;
}



