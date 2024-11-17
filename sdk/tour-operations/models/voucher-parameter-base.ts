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
 * @interface VoucherParameterBase
 */
export interface VoucherParameterBase {
    /**
     * 
     * @type {string}
     * @memberof VoucherParameterBase
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof VoucherParameterBase
     */
    'tableName'?: string;
    /**
     * 
     * @type {string}
     * @memberof VoucherParameterBase
     */
    'fieldName'?: string;
    /**
     * 
     * @type {string}
     * @memberof VoucherParameterBase
     */
    'formatDate'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof VoucherParameterBase
     */
    'isMandatory'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VoucherParameterBase
     */
    'prefix'?: string;
    /**
     * Length Of Number.
     * @type {number}
     * @memberof VoucherParameterBase
     */
    'maxLength'?: number;
    /**
     * 
     * @type {number}
     * @memberof VoucherParameterBase
     */
    'startFrom'?: number;
    /**
     * 
     * @type {number}
     * @memberof VoucherParameterBase
     */
    'currentValue'?: number;
    /**
     * 
     * @type {string}
     * @memberof VoucherParameterBase
     */
    'currentDateValue'?: string;
    /**
     * 
     * @type {number}
     * @memberof VoucherParameterBase
     */
    'nextValue'?: number;
    /**
     * 
     * @type {string}
     * @memberof VoucherParameterBase
     */
    'separation'?: string;
    /**
     * 
     * @type {string}
     * @memberof VoucherParameterBase
     */
    'prefix2'?: string;
    /**
     * 
     * @type {number}
     * @memberof VoucherParameterBase
     */
    'type'?: number | null;
}

