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


// May contain unused imports in some cases
// @ts-ignore
import { Department } from './department';

/**
 * 
 * @export
 * @interface EmployeeAllOf
 */
export interface EmployeeAllOf {
    /**
     * 
     * @type {string}
     * @memberof EmployeeAllOf
     */
    'employeeNo'?: string;
    /**
     * 
     * @type {string}
     * @memberof EmployeeAllOf
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof EmployeeAllOf
     */
    'departmentId'?: string;
    /**
     * 
     * @type {string}
     * @memberof EmployeeAllOf
     */
    'position'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EmployeeAllOf
     */
    'phone'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EmployeeAllOf
     */
    'email'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EmployeeAllOf
     */
    'identityID'?: string | null;
    /**
     * 
     * @type {Department}
     * @memberof EmployeeAllOf
     */
    'department'?: Department;
}

