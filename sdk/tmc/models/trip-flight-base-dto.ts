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
import { FlightPassengerDto } from './flight-passenger-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TripFlightBaseDtoStatus } from './trip-flight-base-dto-status';

/**
 * 
 * @export
 * @interface TripFlightBaseDto
 */
export interface TripFlightBaseDto {
    /**
     * 
     * @type {string}
     * @memberof TripFlightBaseDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof TripFlightBaseDto
     */
    'tripType'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof TripFlightBaseDto
     */
    'departureDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof TripFlightBaseDto
     */
    'arrivalDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof TripFlightBaseDto
     */
    'returnDepartureDate'?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof TripFlightBaseDto
     */
    'returnArrivalDate'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof TripFlightBaseDto
     */
    'destinationFrom'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TripFlightBaseDto
     */
    'destinationTo'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TripFlightBaseDto
     */
    'seatClass'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TripFlightBaseDto
     */
    'seatNo'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TripFlightBaseDto
     */
    'bookingCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TripFlightBaseDto
     */
    'gdsCode'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof TripFlightBaseDto
     */
    'reservationExpirationAt'?: Date | null;
    /**
     * 
     * @type {number}
     * @memberof TripFlightBaseDto
     */
    'totalPriceTickets'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof TripFlightBaseDto
     */
    'currency'?: string | null;
    /**
     * 
     * @type {TripFlightBaseDtoStatus}
     * @memberof TripFlightBaseDto
     */
    'status'?: TripFlightBaseDtoStatus | null;
    /**
     * 
     * @type {Array<FlightPassengerDto>}
     * @memberof TripFlightBaseDto
     */
    'passengers'?: Array<FlightPassengerDto>;
    /**
     * 
     * @type {Date}
     * @memberof TripFlightBaseDto
     */
    'createdOn'?: Date;
}

