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
import { Brand } from './brand';
// May contain unused imports in some cases
// @ts-ignore
import { Currency } from './currency';
// May contain unused imports in some cases
// @ts-ignore
import { ProductGroup } from './product-group';
// May contain unused imports in some cases
// @ts-ignore
import { ProductType } from './product-type';
// May contain unused imports in some cases
// @ts-ignore
import { UnitOfMeasure } from './unit-of-measure';
// May contain unused imports in some cases
// @ts-ignore
import { Vendor } from './vendor';

/**
 * 
 * @export
 * @interface ProductAllOf
 */
export interface ProductAllOf {
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'code'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'description'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'fullDescription'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ProductAllOf
     */
    'rate'?: number;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'imagePath'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'brandId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'vendorId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'unitId'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'currencyId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'productTypeId'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'productGroupId'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'inventoryAcct'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'revenueAcct'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProductAllOf
     */
    'cogsAcct'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof ProductAllOf
     */
    'includedVATInSalePrice'?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof ProductAllOf
     */
    'includedVATInPurchasePrice'?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof ProductAllOf
     */
    'isActive'?: boolean | null;
    /**
     * 
     * @type {Brand}
     * @memberof ProductAllOf
     */
    'brand'?: Brand;
    /**
     * 
     * @type {ProductType}
     * @memberof ProductAllOf
     */
    'productType'?: ProductType;
    /**
     * 
     * @type {ProductGroup}
     * @memberof ProductAllOf
     */
    'productGroup'?: ProductGroup;
    /**
     * 
     * @type {UnitOfMeasure}
     * @memberof ProductAllOf
     */
    'unit'?: UnitOfMeasure;
    /**
     * 
     * @type {Vendor}
     * @memberof ProductAllOf
     */
    'vendor'?: Vendor;
    /**
     * 
     * @type {Currency}
     * @memberof ProductAllOf
     */
    'currency'?: Currency;
}
