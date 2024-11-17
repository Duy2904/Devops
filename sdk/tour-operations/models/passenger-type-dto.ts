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
 * @interface PassengerTypeDto
 */
export interface PassengerTypeDto {
    /**
     * 
     * @type {string}
     * @memberof PassengerTypeDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof PassengerTypeDto
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof PassengerTypeDto
     */
    'code'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PassengerTypeDto
     */
    'isDefault'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PassengerTypeDto
     */
    'isPriceApplied'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PassengerTypeDto
     */
    'childCode'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PassengerTypeDto
     */
    'isFIT'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PassengerTypeDto
     */
    'isGIT'?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PassengerTypeDto
     */
    'ageFrom'?: number;
    /**
     * 
     * @type {number}
     * @memberof PassengerTypeDto
     */
    'ageTo'?: number;
}
