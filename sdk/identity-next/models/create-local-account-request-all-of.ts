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
 * @interface CreateLocalAccountRequestAllOf
 */
export interface CreateLocalAccountRequestAllOf {
    /**
     * 
     * @type {string}
     * @memberof CreateLocalAccountRequestAllOf
     */
    'groupId'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateLocalAccountRequestAllOf
     */
    'groupName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateLocalAccountRequestAllOf
     */
    'userName'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof CreateLocalAccountRequestAllOf
     */
    'includedAd'?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof CreateLocalAccountRequestAllOf
     */
    'mustResetPassword'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CreateLocalAccountRequestAllOf
     */
    'skipEmailNotification'?: boolean;
}
