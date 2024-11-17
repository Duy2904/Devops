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
 * @interface FlightDetailDto
 */
export interface FlightDetailDto {
    /**
     * 
     * @type {string}
     * @memberof FlightDetailDto
     */
    'airline'?: string;
    /**
     * 
     * @type {number}
     * @memberof FlightDetailDto
     */
    'leg'?: number;
    /**
     * 
     * @type {string}
     * @memberof FlightDetailDto
     */
    'startPoint'?: string;
    /**
     * 
     * @type {string}
     * @memberof FlightDetailDto
     */
    'endPoint'?: string;
    /**
     * 
     * @type {string}
     * @memberof FlightDetailDto
     */
    'departDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof FlightDetailDto
     */
    'departTime'?: string;
    /**
     * 
     * @type {string}
     * @memberof FlightDetailDto
     */
    'flightNumber'?: string;
    /**
     * 
     * @type {string}
     * @memberof FlightDetailDto
     */
    'fareClass'?: string;
    /**
     * 
     * @type {number}
     * @memberof FlightDetailDto
     */
    'price'?: number;
    /**
     * 
     * @type {string}
     * @memberof FlightDetailDto
     */
    'compareMode'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof FlightDetailDto
     */
    'autoIssue'?: boolean;
}
