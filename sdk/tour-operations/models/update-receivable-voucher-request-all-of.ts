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
import { UpdateReceivableVoucherLineRequest } from './update-receivable-voucher-line-request';

/**
 * 
 * @export
 * @interface UpdateReceivableVoucherRequestAllOf
 */
export interface UpdateReceivableVoucherRequestAllOf {
    /**
     * 
     * @type {string}
     * @memberof UpdateReceivableVoucherRequestAllOf
     */
    'id'?: string;
    /**
     * 
     * @type {Array<UpdateReceivableVoucherLineRequest>}
     * @memberof UpdateReceivableVoucherRequestAllOf
     */
    'receivableVoucherLines'?: Array<UpdateReceivableVoucherLineRequest>;
}

