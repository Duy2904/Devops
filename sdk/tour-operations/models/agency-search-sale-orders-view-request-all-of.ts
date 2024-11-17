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
import { OrderStatus } from './order-status';

/**
 * 
 * @export
 * @interface AgencySearchSaleOrdersViewRequestAllOf
 */
export interface AgencySearchSaleOrdersViewRequestAllOf {
    /**
     * 
     * @type {string}
     * @memberof AgencySearchSaleOrdersViewRequestAllOf
     */
    'groupId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AgencySearchSaleOrdersViewRequestAllOf
     */
    'customerId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AgencySearchSaleOrdersViewRequestAllOf
     */
    'tourScheduleId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AgencySearchSaleOrdersViewRequestAllOf
     */
    'currencyId'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof AgencySearchSaleOrdersViewRequestAllOf
     */
    'fromDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof AgencySearchSaleOrdersViewRequestAllOf
     */
    'toDate'?: Date | null;
    /**
     * 
     * @type {Array<OrderStatus>}
     * @memberof AgencySearchSaleOrdersViewRequestAllOf
     */
    'status'?: Array<OrderStatus>;
    /**
     * 
     * @type {string}
     * @memberof AgencySearchSaleOrdersViewRequestAllOf
     */
    'orderNo'?: string | null;
}
