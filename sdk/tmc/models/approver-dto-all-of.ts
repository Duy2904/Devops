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



/**
 * Data transfer object (DTO) representing an approver, extending the EmployeeDto.
 * @export
 * @interface ApproverDtoAllOf
 */
export interface ApproverDtoAllOf {
    /**
     * Gets or sets the approval level of the approver.
     * @type {number}
     * @memberof ApproverDtoAllOf
     */
    'level'?: number;
    /**
     * Gets or sets a value indicating whether this approver is the current approver.
     * @type {boolean}
     * @memberof ApproverDtoAllOf
     */
    'isCurrentApprover'?: boolean;
    /**
     * Gets or sets a value indicating whether this approver is involved in the current process.
     * @type {boolean}
     * @memberof ApproverDtoAllOf
     */
    'isCurrentProcess'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApproverDtoAllOf
     */
    'comments'?: string | null;
}

