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
 * @interface CreateAgentRequestAllOf
 */
export interface CreateAgentRequestAllOf {
    /**
     * 
     * @type {Date}
     * @memberof CreateAgentRequestAllOf
     */
    'effectiveDate'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof CreateAgentRequestAllOf
     */
    'systemId'?: string;
    /**
     * 
     * @type {Date}
     * @memberof CreateAgentRequestAllOf
     */
    'expirationDate'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof CreateAgentRequestAllOf
     */
    'personInChargeId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateAgentRequestAllOf
     */
    'code'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateAgentRequestAllOf
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAgentRequestAllOf
     */
    'branchId'?: string | null;
}
