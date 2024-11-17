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
import { TripBaseInfoDtoTripType } from './trip-base-info-dto-trip-type';
// May contain unused imports in some cases
// @ts-ignore
import { TripStatus } from './trip-status';

/**
 * 
 * @export
 * @interface TripBaseInfoDto
 */
export interface TripBaseInfoDto {
    /**
     * 
     * @type {string}
     * @memberof TripBaseInfoDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof TripBaseInfoDto
     */
    'tripName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TripBaseInfoDto
     */
    'tripCode'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof TripBaseInfoDto
     */
    'totalPrices'?: number;
    /**
     * 
     * @type {TripStatus}
     * @memberof TripBaseInfoDto
     */
    'status'?: TripStatus;
    /**
     * 
     * @type {TripBaseInfoDtoTripType}
     * @memberof TripBaseInfoDto
     */
    'tripType'?: TripBaseInfoDtoTripType | null;
    /**
     * 
     * @type {Date}
     * @memberof TripBaseInfoDto
     */
    'createdOn'?: Date;
    /**
     * 
     * @type {string}
     * @memberof TripBaseInfoDto
     */
    'travelerId'?: string;
    /**
     * 
     * @type {string}
     * @memberof TripBaseInfoDto
     */
    'groupId'?: string;
}



