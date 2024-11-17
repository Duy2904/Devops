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
import { ReceivableType2 } from './receivable-type2';
// May contain unused imports in some cases
// @ts-ignore
import { SearchReceivableVouchersRequestAllOfReceivableType } from './search-receivable-vouchers-request-all-of-receivable-type';
// May contain unused imports in some cases
// @ts-ignore
import { VoucherStatus } from './voucher-status';

/**
 * 
 * @export
 * @interface SearchReceivableVouchersRequestAllOf
 */
export interface SearchReceivableVouchersRequestAllOf {
    /**
     * 
     * @type {Array<VoucherStatus>}
     * @memberof SearchReceivableVouchersRequestAllOf
     */
    'status'?: Array<VoucherStatus>;
    /**
     * 
     * @type {Date}
     * @memberof SearchReceivableVouchersRequestAllOf
     */
    'fromDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof SearchReceivableVouchersRequestAllOf
     */
    'toDate'?: Date | null;
    /**
     * 
     * @type {SearchReceivableVouchersRequestAllOfReceivableType}
     * @memberof SearchReceivableVouchersRequestAllOf
     */
    'receivableType'?: SearchReceivableVouchersRequestAllOfReceivableType | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchReceivableVouchersRequestAllOf
     */
    'saleOrderIds'?: Array<string>;
    /**
     * 
     * @type {Array<ReceivableType2>}
     * @memberof SearchReceivableVouchersRequestAllOf
     */
    'receivableTypes'?: Array<ReceivableType2>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchReceivableVouchersRequestAllOf
     */
    'groupIds'?: Array<string>;
}
