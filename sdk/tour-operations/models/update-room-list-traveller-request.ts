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
 * @interface UpdateRoomListTravellerRequest
 */
export interface UpdateRoomListTravellerRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateRoomListTravellerRequest
     */
    'id'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateRoomListTravellerRequest
     */
    'extraBed'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UpdateRoomListTravellerRequest
     */
    'roomArrangement'?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateRoomListTravellerRequest
     */
    'roomNote'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateRoomListTravellerRequest
     */
    'isTourGuide'?: boolean;
}

