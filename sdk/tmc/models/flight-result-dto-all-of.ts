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
import { FlightSegmentResultDto } from './flight-segment-result-dto';

/**
 * 
 * @export
 * @interface FlightResultDtoAllOf
 */
export interface FlightResultDtoAllOf {
    /**
     * 
     * @type {number}
     * @memberof FlightResultDtoAllOf
     */
    'leg'?: number;
    /**
     * 
     * @type {string}
     * @memberof FlightResultDtoAllOf
     */
    'fareBasis'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof FlightResultDtoAllOf
     */
    'seatRemain'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof FlightResultDtoAllOf
     */
    'promo'?: boolean;
    /**
     * 
     * @type {Array<FlightSegmentResultDto>}
     * @memberof FlightResultDtoAllOf
     */
    'listSegment'?: Array<FlightSegmentResultDto>;
    /**
     * 
     * @type {string}
     * @memberof FlightResultDtoAllOf
     */
    'equipment'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FlightResultDtoAllOf
     */
    'iata'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FlightResultDtoAllOf
     */
    'manufacturer'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof FlightResultDtoAllOf
     */
    'model'?: string | null;
}

