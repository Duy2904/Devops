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
import { ApprovalConfigurationHistoryDto } from './approval-configuration-history-dto';
// May contain unused imports in some cases
// @ts-ignore
import { ApproverSettingDto } from './approver-setting-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TeamMemberDto } from './team-member-dto';

/**
 * 
 * @export
 * @interface ApprovalConfigurationDto
 */
export interface ApprovalConfigurationDto {
    /**
     * 
     * @type {string}
     * @memberof ApprovalConfigurationDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ApprovalConfigurationDto
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof ApprovalConfigurationDto
     */
    'description'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ApprovalConfigurationDto
     */
    'isActive'?: boolean;
    /**
     * 
     * @type {Array<TeamMemberDto>}
     * @memberof ApprovalConfigurationDto
     */
    'teamMembers'?: Array<TeamMemberDto>;
    /**
     * 
     * @type {Array<ApproverSettingDto>}
     * @memberof ApprovalConfigurationDto
     */
    'approverSettings'?: Array<ApproverSettingDto>;
    /**
     * 
     * @type {Array<ApprovalConfigurationHistoryDto>}
     * @memberof ApprovalConfigurationDto
     */
    'approvalConfigurationHistories'?: Array<ApprovalConfigurationHistoryDto>;
}
