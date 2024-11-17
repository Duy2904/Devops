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
import { FlightPolicyDto } from './flight-policy-dto';
// May contain unused imports in some cases
// @ts-ignore
import { HotelPolicyDto } from './hotel-policy-dto';

/**
 * 
 * @export
 * @interface CreateTravelPolicyCommandAllOf
 */
export interface CreateTravelPolicyCommandAllOf {
    /**
     * 
     * @type {FlightPolicyDto}
     * @memberof CreateTravelPolicyCommandAllOf
     */
    'flightPolicy'?: FlightPolicyDto;
    /**
     * 
     * @type {HotelPolicyDto}
     * @memberof CreateTravelPolicyCommandAllOf
     */
    'hotelPolicy'?: HotelPolicyDto;
}

