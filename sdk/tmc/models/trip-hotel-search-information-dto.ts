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
import { GuestRoomInformationDto } from './guest-room-information-dto';

/**
 * 
 * @export
 * @interface TripHotelSearchInformationDto
 */
export interface TripHotelSearchInformationDto {
    /**
     * 
     * @type {string}
     * @memberof TripHotelSearchInformationDto
     */
    'destination'?: string;
    /**
     * 
     * @type {Date}
     * @memberof TripHotelSearchInformationDto
     */
    'checkIn'?: Date;
    /**
     * 
     * @type {Date}
     * @memberof TripHotelSearchInformationDto
     */
    'checkOut'?: Date;
    /**
     * 
     * @type {GuestRoomInformationDto}
     * @memberof TripHotelSearchInformationDto
     */
    'roomInfo'?: GuestRoomInformationDto;
}

