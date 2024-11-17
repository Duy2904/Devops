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
 * @interface CustomerAddressDto
 */
export interface CustomerAddressDto {
    /**
     * 
     * @type {string}
     * @memberof CustomerAddressDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomerAddressDto
     */
    'customerId'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof CustomerAddressDto
     */
    'addressType'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerAddressDto
     */
    'addressName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CustomerAddressDto
     */
    'taxCode'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof CustomerAddressDto
     */
    'deleted'?: boolean | null;
}

