/* tslint:disable */
/* eslint-disable */
/**
 * TripOTA TMC WebAPI
 * The TripOTA TMC WebApi built with Multitenancy Support.
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
import { RulesGroup } from './rules-group';

/**
 * 
 * @export
 * @interface FareRulesDto
 */
export interface FareRulesDto {
    /**
     * 
     * @type {string}
     * @memberof FareRulesDto
     */
    'route'?: string;
    /**
     * 
     * @type {string}
     * @memberof FareRulesDto
     */
    'fareBasis'?: string;
    /**
     * 
     * @type {Array<RulesGroup>}
     * @memberof FareRulesDto
     */
    'listRulesGroup'?: Array<RulesGroup>;
}
