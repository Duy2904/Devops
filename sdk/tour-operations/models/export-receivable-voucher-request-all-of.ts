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
 * @interface ExportReceivableVoucherRequestAllOf
 */
export interface ExportReceivableVoucherRequestAllOf {
    /**
     * 
     * @type {Array<VoucherStatus>}
     * @memberof ExportReceivableVoucherRequestAllOf
     */
    'status'?: Array<VoucherStatus>;
    /**
     * 
     * @type {Date}
     * @memberof ExportReceivableVoucherRequestAllOf
     */
    'fromDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof ExportReceivableVoucherRequestAllOf
     */
    'toDate'?: Date | null;
    /**
     * 
     * @type {SearchReceivableVouchersRequestAllOfReceivableType}
     * @memberof ExportReceivableVoucherRequestAllOf
     */
    'receivableType'?: SearchReceivableVouchersRequestAllOfReceivableType | null;
    /**
     * 
     * @type {Array<ReceivableType2>}
     * @memberof ExportReceivableVoucherRequestAllOf
     */
    'receivableTypes'?: Array<ReceivableType2>;
    /**
     * 
     * @type {string}
     * @memberof ExportReceivableVoucherRequestAllOf
     */
    'connectionId'?: string;
    /**
     * 
     * @type {string}
     * @memberof ExportReceivableVoucherRequestAllOf
     */
    'locale'?: string;
    /**
     * 
     * @type {string}
     * @memberof ExportReceivableVoucherRequestAllOf
     */
    'fileName'?: string;
    /**
     * 
     * @type {string}
     * @memberof ExportReceivableVoucherRequestAllOf
     */
    'createdBy'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ExportReceivableVoucherRequestAllOf
     */
    'groupIds'?: Array<string>;
}

