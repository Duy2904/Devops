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
import { PurchaseOrderDtoCurrency } from './purchase-order-dto-currency';
// May contain unused imports in some cases
// @ts-ignore
import { PurchaseOrderDtoStatus } from './purchase-order-dto-status';
// May contain unused imports in some cases
// @ts-ignore
import { PurchaseOrderDtoTourSchedule } from './purchase-order-dto-tour-schedule';
// May contain unused imports in some cases
// @ts-ignore
import { PurchaseOrderDtoVendor } from './purchase-order-dto-vendor';
// May contain unused imports in some cases
// @ts-ignore
import { PurchaseOrderLineDto } from './purchase-order-line-dto';

/**
 * 
 * @export
 * @interface PurchaseOrderDto
 */
export interface PurchaseOrderDto {
    /**
     * 
     * @type {string}
     * @memberof PurchaseOrderDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof PurchaseOrderDto
     */
    'orderNo'?: string;
    /**
     * 
     * @type {Date}
     * @memberof PurchaseOrderDto
     */
    'orderDate'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof PurchaseOrderDto
     */
    'tourScheduleId'?: string;
    /**
     * 
     * @type {string}
     * @memberof PurchaseOrderDto
     */
    'description'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PurchaseOrderDto
     */
    'vendorId'?: string;
    /**
     * 
     * @type {PurchaseOrderDtoStatus}
     * @memberof PurchaseOrderDto
     */
    'status'?: PurchaseOrderDtoStatus | null;
    /**
     * 
     * @type {number}
     * @memberof PurchaseOrderDto
     */
    'totalAmt'?: number;
    /**
     * 
     * @type {number}
     * @memberof PurchaseOrderDto
     */
    'totalDiscountAmt'?: number;
    /**
     * 
     * @type {number}
     * @memberof PurchaseOrderDto
     */
    'totalServiceChargeAmt'?: number;
    /**
     * 
     * @type {number}
     * @memberof PurchaseOrderDto
     */
    'totalVatAmt'?: number;
    /**
     * 
     * @type {number}
     * @memberof PurchaseOrderDto
     */
    'totalIncludeVatAmt'?: number;
    /**
     * 
     * @type {Date}
     * @memberof PurchaseOrderDto
     */
    'paymentDate'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof PurchaseOrderDto
     */
    'contractNo'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PurchaseOrderDto
     */
    'currencyId'?: string;
    /**
     * 
     * @type {number}
     * @memberof PurchaseOrderDto
     */
    'exchangeRate'?: number;
    /**
     * 
     * @type {PurchaseOrderDtoTourSchedule}
     * @memberof PurchaseOrderDto
     */
    'tourSchedule'?: PurchaseOrderDtoTourSchedule | null;
    /**
     * 
     * @type {PurchaseOrderDtoVendor}
     * @memberof PurchaseOrderDto
     */
    'vendor'?: PurchaseOrderDtoVendor | null;
    /**
     * 
     * @type {PurchaseOrderDtoCurrency}
     * @memberof PurchaseOrderDto
     */
    'currency'?: PurchaseOrderDtoCurrency | null;
    /**
     * 
     * @type {Array<PurchaseOrderLineDto>}
     * @memberof PurchaseOrderDto
     */
    'services'?: Array<PurchaseOrderLineDto> | null;
}

