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
 * @interface AssignGroupRolesRequest
 */
export interface AssignGroupRolesRequest {
    /**
     * 
     * @type {string}
     * @memberof AssignGroupRolesRequest
     */
    'groupId'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AssignGroupRolesRequest
     */
    'roleIds'?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof AssignGroupRolesRequest
     */
    'isDefault'?: boolean | null;
}
