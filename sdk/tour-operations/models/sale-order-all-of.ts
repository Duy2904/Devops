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
import { Currency } from './currency';
// May contain unused imports in some cases
// @ts-ignore
import { Customer } from './customer';
// May contain unused imports in some cases
// @ts-ignore
import { Discount } from './discount';
// May contain unused imports in some cases
// @ts-ignore
import { PaymentMethod } from './payment-method';
// May contain unused imports in some cases
// @ts-ignore
import { SaleOrderAllOfApproveStatus } from './sale-order-all-of-approve-status';
// May contain unused imports in some cases
// @ts-ignore
import { SaleOrderAllOfStatus } from './sale-order-all-of-status';
// May contain unused imports in some cases
// @ts-ignore
import { SaleOrderLineTraveller } from './sale-order-line-traveller';
// May contain unused imports in some cases
// @ts-ignore
import { TourSchedule } from './tour-schedule';

/**
 * 
 * @export
 * @interface SaleOrderAllOf
 */
export interface SaleOrderAllOf {
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'orderNo'?: string;
    /**
     * 
     * @type {Date}
     * @memberof SaleOrderAllOf
     */
    'orderDate'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'description'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'customerId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'currencyId'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof SaleOrderAllOf
     */
    'exchangeRate'?: number;
    /**
     * 
     * @type {SaleOrderAllOfStatus}
     * @memberof SaleOrderAllOf
     */
    'status'?: SaleOrderAllOfStatus | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'tourScheduleId'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof SaleOrderAllOf
     */
    'numberOfTravellers'?: number;
    /**
     * 
     * @type {number}
     * @memberof SaleOrderAllOf
     */
    'numberOfRooms'?: number;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'contactName'?: string;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'contactPhone'?: string;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'contactEmail'?: string;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'contactAddress'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof SaleOrderAllOf
     */
    'hasInvoice'?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'companyName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'companyTaxCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'companyAddress'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'companyEmail'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'presenter'?: string;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'presenterPhone'?: string;
    /**
     * 
     * @type {number}
     * @memberof SaleOrderAllOf
     */
    'commissionAmt'?: number;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'paymentMethodId'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof SaleOrderAllOf
     */
    'totalAmt'?: number;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'discountId'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof SaleOrderAllOf
     */
    'totalDiscountAmt'?: number;
    /**
     * 
     * @type {number}
     * @memberof SaleOrderAllOf
     */
    'totalIncludeVatAmt'?: number;
    /**
     * 
     * @type {number}
     * @memberof SaleOrderAllOf
     */
    'depositAmt'?: number;
    /**
     * 
     * @type {number}
     * @memberof SaleOrderAllOf
     */
    'paymentAmt'?: number;
    /**
     * 
     * @type {Customer}
     * @memberof SaleOrderAllOf
     */
    'customer'?: Customer;
    /**
     * 
     * @type {Currency}
     * @memberof SaleOrderAllOf
     */
    'currency'?: Currency;
    /**
     * 
     * @type {TourSchedule}
     * @memberof SaleOrderAllOf
     */
    'tourSchedule'?: TourSchedule;
    /**
     * 
     * @type {PaymentMethod}
     * @memberof SaleOrderAllOf
     */
    'paymentMethod'?: PaymentMethod;
    /**
     * 
     * @type {Discount}
     * @memberof SaleOrderAllOf
     */
    'discount'?: Discount;
    /**
     * 
     * @type {Array<SaleOrderLineTraveller>}
     * @memberof SaleOrderAllOf
     */
    'saleOrderLineTravellers'?: Array<SaleOrderLineTraveller>;
    /**
     * 
     * @type {SaleOrderAllOfApproveStatus}
     * @memberof SaleOrderAllOf
     */
    'approveStatus'?: SaleOrderAllOfApproveStatus | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'reason'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaleOrderAllOf
     */
    'approvedBy'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof SaleOrderAllOf
     */
    'approvedOn'?: Date | null;
}
