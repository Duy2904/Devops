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
 * @interface SearchUserWithRoleGroupRequestAllOf
 */
export interface SearchUserWithRoleGroupRequestAllOf {
    /**
     * 
     * @type {boolean}
     * @memberof SearchUserWithRoleGroupRequestAllOf
     */
    'isMineData'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SearchUserWithRoleGroupRequestAllOf
     */
    'groupId'?: string | null;
    /**
     * 
     * @type {Array<number>}
     * @memberof SearchUserWithRoleGroupRequestAllOf
     */
    'apps'?: Array<number> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchUserWithRoleGroupRequestAllOf
     */
    'orderBy'?: Array<string> | null;
}
