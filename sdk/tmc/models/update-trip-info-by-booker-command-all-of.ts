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
import { TripInfoDtoAllOfAdditionInfo } from './trip-info-dto-all-of-addition-info';
// May contain unused imports in some cases
// @ts-ignore
import { TripPlanStatus } from './trip-plan-status';

/**
 * 
 * @export
 * @interface UpdateTripInfoByBookerCommandAllOf
 */
export interface UpdateTripInfoByBookerCommandAllOf {
    /**
     * 
     * @type {number}
     * @memberof UpdateTripInfoByBookerCommandAllOf
     */
    'totalPrice'?: number;
    /**
     * 
     * @type {TripInfoDtoAllOfAdditionInfo}
     * @memberof UpdateTripInfoByBookerCommandAllOf
     */
    'additionInfo'?: TripInfoDtoAllOfAdditionInfo | null;
    /**
     * 
     * @type {TripPlanStatus}
     * @memberof UpdateTripInfoByBookerCommandAllOf
     */
    'status'?: TripPlanStatus;
}



