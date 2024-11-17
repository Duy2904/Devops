/* tslint:disable */
/* eslint-disable */
/**
 * WebAPI - Tour Operation
 * Clean Architecture Tour Operation for .NET 7 WebApi built with Multitenancy Support.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { TourInforMediaSummaryDto } from './tour-infor-media-summary-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TourInforScheduleSummaryDto } from './tour-infor-schedule-summary-dto';

/**
 * 
 * @export
 * @interface TourInforDtoAllOf
 */
export interface TourInforDtoAllOf {
    /**
     * 
     * @type {Array<TourInforMediaSummaryDto>}
     * @memberof TourInforDtoAllOf
     */
    'tourInforMedias'?: Array<TourInforMediaSummaryDto>;
    /**
     * 
     * @type {Array<TourInforScheduleSummaryDto>}
     * @memberof TourInforDtoAllOf
     */
    'tourSchedules'?: Array<TourInforScheduleSummaryDto>;
}

