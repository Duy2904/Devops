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
import { ApproverSettingBase } from './approver-setting-base';

/**
 * 
 * @export
 * @interface UpdateApprovalConfigurationRequest
 */
export interface UpdateApprovalConfigurationRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateApprovalConfigurationRequest
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateApprovalConfigurationRequest
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateApprovalConfigurationRequest
     */
    'description'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof UpdateApprovalConfigurationRequest
     */
    'teamMembers'?: Array<string>;
    /**
     * 
     * @type {Array<ApproverSettingBase>}
     * @memberof UpdateApprovalConfigurationRequest
     */
    'approverSettings'?: Array<ApproverSettingBase>;
}

