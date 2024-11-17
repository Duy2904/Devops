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
import { EmployeeDtoAllOfDepartment } from './employee-dto-all-of-department';
// May contain unused imports in some cases
// @ts-ignore
import { EmployeeDtoAllOfJobTitle } from './employee-dto-all-of-job-title';
// May contain unused imports in some cases
// @ts-ignore
import { EmployeeDtoAllOfTitleLevel } from './employee-dto-all-of-title-level';
// May contain unused imports in some cases
// @ts-ignore
import { EmployeeStatus } from './employee-status';

/**
 * 
 * @export
 * @interface EmployeeDtoAllOf
 */
export interface EmployeeDtoAllOf {
    /**
     * 
     * @type {EmployeeDtoAllOfTitleLevel}
     * @memberof EmployeeDtoAllOf
     */
    'titleLevel'?: EmployeeDtoAllOfTitleLevel | null;
    /**
     * 
     * @type {EmployeeDtoAllOfJobTitle}
     * @memberof EmployeeDtoAllOf
     */
    'jobTitle'?: EmployeeDtoAllOfJobTitle | null;
    /**
     * 
     * @type {EmployeeDtoAllOfDepartment}
     * @memberof EmployeeDtoAllOf
     */
    'department'?: EmployeeDtoAllOfDepartment | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof EmployeeDtoAllOf
     */
    'role'?: Array<string>;
    /**
     * Gets or sets a value indicating whether the employee already has a trip.
     * @type {boolean}
     * @memberof EmployeeDtoAllOf
     */
    'alreadyHasTrip'?: boolean;
    /**
     * 
     * @type {EmployeeStatus}
     * @memberof EmployeeDtoAllOf
     */
    'status'?: EmployeeStatus;
    /**
     * 
     * @type {string}
     * @memberof EmployeeDtoAllOf
     */
    'displayedEmployeeId'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof EmployeeDtoAllOf
     */
    'isExternal'?: boolean;
}


