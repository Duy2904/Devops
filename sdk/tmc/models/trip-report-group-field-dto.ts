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
import { TripReportFieldDto } from './trip-report-field-dto';

/**
 * 
 * @export
 * @interface TripReportGroupFieldDto
 */
export interface TripReportGroupFieldDto {
    /**
     * 
     * @type {Array<TripReportFieldDto>}
     * @memberof TripReportGroupFieldDto
     */
    'tripInfo'?: Array<TripReportFieldDto>;
    /**
     * 
     * @type {Array<TripReportFieldDto>}
     * @memberof TripReportGroupFieldDto
     */
    'travelerInfo'?: Array<TripReportFieldDto>;
    /**
     * 
     * @type {Array<TripReportFieldDto>}
     * @memberof TripReportGroupFieldDto
     */
    'flightInfo'?: Array<TripReportFieldDto>;
    /**
     * 
     * @type {Array<TripReportFieldDto>}
     * @memberof TripReportGroupFieldDto
     */
    'hotelInfo'?: Array<TripReportFieldDto>;
    /**
     * 
     * @type {Array<TripReportFieldDto>}
     * @memberof TripReportGroupFieldDto
     */
    'policy'?: Array<TripReportFieldDto>;
    /**
     * 
     * @type {Array<TripReportFieldDto>}
     * @memberof TripReportGroupFieldDto
     */
    'expense'?: Array<TripReportFieldDto>;
    /**
     * 
     * @type {Array<TripReportFieldDto>}
     * @memberof TripReportGroupFieldDto
     */
    'co2'?: Array<TripReportFieldDto>;
}

