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
 * @interface AgentDtoAllOf
 */
export interface AgentDtoAllOf {
    /**
     * 
     * @type {boolean}
     * @memberof AgentDtoAllOf
     */
    'accountCreation'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof AgentDtoAllOf
     */
    'contractStatus'?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof AgentDtoAllOf
     */
    'effectiveDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof AgentDtoAllOf
     */
    'expirationDate'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof AgentDtoAllOf
     */
    'branchId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AgentDtoAllOf
     */
    'branchName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AgentDtoAllOf
     */
    'agentState'?: string | null;
}
