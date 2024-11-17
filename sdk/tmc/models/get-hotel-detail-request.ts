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
 * 
 * @export
 * @interface GetHotelDetailRequest
 */
export interface GetHotelDetailRequest {
    /**
     * 
     * @type {string}
     * @memberof GetHotelDetailRequest
     */
    'id'?: string;
    /**
     * 
     * @type {Date}
     * @memberof GetHotelDetailRequest
     */
    'checkIn'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof GetHotelDetailRequest
     */
    'checkOut'?: Date | null;
    /**
     * 
     * @type {number}
     * @memberof GetHotelDetailRequest
     */
    'rooms'?: number;
    /**
     * 
     * @type {number}
     * @memberof GetHotelDetailRequest
     */
    'adults'?: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof GetHotelDetailRequest
     */
    'childrenAges'?: Array<number> | null;
}

