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


// May contain unused imports in some cases
// @ts-ignore
import { LiteAgentDtoAllOfBankInfos } from './lite-agent-dto-all-of-bank-infos';

/**
 * 
 * @export
 * @interface LiteAgentDtoAllOf
 */
export interface LiteAgentDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof LiteAgentDtoAllOf
     */
    'branchId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LiteAgentDtoAllOf
     */
    'branchName'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof LiteAgentDtoAllOf
     */
    'contractStatus'?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof LiteAgentDtoAllOf
     */
    'effectiveDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof LiteAgentDtoAllOf
     */
    'expirationDate'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof LiteAgentDtoAllOf
     */
    'personInChargeId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LiteAgentDtoAllOf
     */
    'agentState'?: string | null;
    /**
     * 
     * @type {LiteAgentDtoAllOfBankInfos}
     * @memberof LiteAgentDtoAllOf
     */
    'bankInfos'?: LiteAgentDtoAllOfBankInfos | null;
    /**
     * 
     * @type {string}
     * @memberof LiteAgentDtoAllOf
     */
    'taxCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LiteAgentDtoAllOf
     */
    'website'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LiteAgentDtoAllOf
     */
    'shortName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LiteAgentDtoAllOf
     */
    'description'?: string | null;
}
