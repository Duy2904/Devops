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
import { BookingDto } from './booking-dto';

/**
 * 
 * @export
 * @interface BookFlightResultDto
 */
export interface BookFlightResultDto {
    /**
     * 
     * @type {boolean}
     * @memberof BookFlightResultDto
     */
    'isSuccess'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof BookFlightResultDto
     */
    'message'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof BookFlightResultDto
     */
    'bookingId'?: number;
    /**
     * 
     * @type {string}
     * @memberof BookFlightResultDto
     */
    'orderCode'?: string;
    /**
     * 
     * @type {string}
     * @memberof BookFlightResultDto
     */
    'paymentURL'?: string;
    /**
     * 
     * @type {Array<BookingDto>}
     * @memberof BookFlightResultDto
     */
    'listBooking'?: Array<BookingDto>;
}
