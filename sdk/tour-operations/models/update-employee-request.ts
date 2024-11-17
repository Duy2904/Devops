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



/**
 * 
 * @export
 * @interface UpdateEmployeeRequest
 */
export interface UpdateEmployeeRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateEmployeeRequest
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateEmployeeRequest
     */
    'employeeNo': string;
    /**
     * 
     * @type {string}
     * @memberof UpdateEmployeeRequest
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof UpdateEmployeeRequest
     */
    'departmentId': string;
    /**
     * 
     * @type {string}
     * @memberof UpdateEmployeeRequest
     */
    'position'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateEmployeeRequest
     */
    'phone'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateEmployeeRequest
     */
    'email'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateEmployeeRequest
     */
    'identityID'?: string | null;
}

