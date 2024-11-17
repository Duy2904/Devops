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
 * @interface UpdatePurchaseOrderLineRequest
 */
export interface UpdatePurchaseOrderLineRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'purchaseOrderId'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'productId': string;
    /**
     * 
     * @type {string}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'productName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'description'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'unitId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'unitName'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'quantity'?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'price'?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'numberUsed'?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'amount'?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'discountPercent'?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'discountAmount'?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'serviceChargePercent'?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'serviceChargeAmount'?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'amountBeforeVAT'?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'vatId'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'vatName'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'amountVat'?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdatePurchaseOrderLineRequest
     */
    'amountInTotal'?: number;
}
