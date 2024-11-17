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
import { BankInforDto } from './bank-infor-dto';
// May contain unused imports in some cases
// @ts-ignore
import { CurrencyDto } from './currency-dto';

/**
 * 
 * @export
 * @interface CustomerBankAccountDto
 */
export interface CustomerBankAccountDto {
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'customerId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'bankInforId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'bankInforName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'branchName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'swift'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'accountName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'accountNo'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'currencyId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'currencyName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'bankCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerBankAccountDto
     */
    'bankCityID'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof CustomerBankAccountDto
     */
    'actived'?: boolean | null;
    /**
     * 
     * @type {CurrencyDto}
     * @memberof CustomerBankAccountDto
     */
    'currency'?: CurrencyDto;
    /**
     * 
     * @type {BankInforDto}
     * @memberof CustomerBankAccountDto
     */
    'bankInfor'?: BankInforDto;
}
