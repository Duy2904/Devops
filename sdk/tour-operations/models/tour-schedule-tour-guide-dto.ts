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
import { TourGuideDto } from './tour-guide-dto';

/**
 * 
 * @export
 * @interface TourScheduleTourGuideDto
 */
export interface TourScheduleTourGuideDto {
    /**
     * 
     * @type {string}
     * @memberof TourScheduleTourGuideDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleTourGuideDto
     */
    'tourScheduleId'?: string;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleTourGuideDto
     */
    'tourGuideId'?: string;
    /**
     * 
     * @type {number}
     * @memberof TourScheduleTourGuideDto
     */
    'order'?: number;
    /**
     * 
     * @type {TourGuideDto}
     * @memberof TourScheduleTourGuideDto
     */
    'tourGuide'?: TourGuideDto;
}
