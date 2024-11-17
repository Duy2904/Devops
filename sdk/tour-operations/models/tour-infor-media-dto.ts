/* tslint:disable */
/* eslint-disable */
/**
 * .NET 7 WebAPI - Clean Architecture
 * Clean Architecture Template for .NET 7 WebApi built with Multitenancy Support.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: hello@codewithmukesh.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { MediaFileDto } from './media-file-dto';

/**
 * 
 * @export
 * @interface TourInforMediaDto
 */
export interface TourInforMediaDto {
    /**
     * 
     * @type {string}
     * @memberof TourInforMediaDto
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof TourInforMediaDto
     */
    'tourInforId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourInforMediaDto
     */
    'mediaFileId'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof TourInforMediaDto
     */
    'displayOrder'?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof TourInforMediaDto
     */
    'displayOnTour'?: boolean | null;
    /**
     * 
     * @type {MediaFileDto}
     * @memberof TourInforMediaDto
     */
    'mediaFile'?: MediaFileDto;
}

