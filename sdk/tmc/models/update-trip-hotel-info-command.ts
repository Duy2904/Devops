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
import { UpdateTripHotelInfoDetailCommand } from './update-trip-hotel-info-detail-command';

/**
 * 
 * @export
 * @interface UpdateTripHotelInfoCommand
 */
export interface UpdateTripHotelInfoCommand {
    /**
     * 
     * @type {string}
     * @memberof UpdateTripHotelInfoCommand
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof UpdateTripHotelInfoCommand
     */
    'hotelName': string;
    /**
     * 
     * @type {string}
     * @memberof UpdateTripHotelInfoCommand
     */
    'hotelAddress': string;
    /**
     * 
     * @type {string}
     * @memberof UpdateTripHotelInfoCommand
     */
    'reservationCode'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof UpdateTripHotelInfoCommand
     */
    'checkin'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof UpdateTripHotelInfoCommand
     */
    'checkout'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateTripHotelInfoCommand
     */
    'holdingTimeRoom'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof UpdateTripHotelInfoCommand
     */
    'roomPrices'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof UpdateTripHotelInfoCommand
     */
    'numberOfRooms'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateTripHotelInfoCommand
     */
    'note'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateTripHotelInfoCommand
     */
    'currency'?: string | null;
    /**
     * 
     * @type {Array<UpdateTripHotelInfoDetailCommand>}
     * @memberof UpdateTripHotelInfoCommand
     */
    'hotelInfoDetails'?: Array<UpdateTripHotelInfoDetailCommand> | null;
    /**
     * 
     * @type {Date}
     * @memberof UpdateTripHotelInfoCommand
     */
    'reservationExpirationAt'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateTripHotelInfoCommand
     */
    'tripInfoId'?: string | null;
}

