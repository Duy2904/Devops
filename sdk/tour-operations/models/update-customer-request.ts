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



/**
 * 
 * @export
 * @interface UpdateCustomerRequest
 */
export interface UpdateCustomerRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'customerNo': string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'customerGroupId': string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'customerGroupName'?: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateCustomerRequest
     */
    'customerType'?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'representative'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'customerInvoiceId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'customerInvoiceName'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof UpdateCustomerRequest
     */
    'creditLimit'?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'currencyId': string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'currencyName'?: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateCustomerRequest
     */
    'creditTime'?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'vendorId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'vendorName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateCustomerRequest
     */
    'accountNo'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateCustomerRequest
     */
    'actived'?: boolean;
}
