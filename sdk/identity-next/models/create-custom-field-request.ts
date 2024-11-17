/* tslint:disable */
/* eslint-disable */
/**
 * TripOTA Identity Next
 * TripOTA Identity Next built with Multitenancy Support.
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: touch@tripota.com.vn
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface CreateCustomFieldRequest
 */
export interface CreateCustomFieldRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateCustomFieldRequest
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCustomFieldRequest
     */
    'displayText'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCustomFieldRequest
     */
    'stringValue'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof CreateCustomFieldRequest
     */
    'numericValue'?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof CreateCustomFieldRequest
     */
    'booleanValue'?: boolean | null;
    /**
     * 
     * @type {Date}
     * @memberof CreateCustomFieldRequest
     */
    'dateTimeValue'?: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof CreateCustomFieldRequest
     */
    'enable'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateCustomFieldRequest
     */
    'isVisible'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof CreateCustomFieldRequest
     */
    'groupId'?: string;
}
