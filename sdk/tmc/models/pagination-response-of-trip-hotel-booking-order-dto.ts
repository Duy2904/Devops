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
import { FilterOption } from './filter-option';
// May contain unused imports in some cases
// @ts-ignore
import { TripHotelBookingOrderDto } from './trip-hotel-booking-order-dto';

/**
 * 
 * @export
 * @interface PaginationResponseOfTripHotelBookingOrderDto
 */
export interface PaginationResponseOfTripHotelBookingOrderDto {
    /**
     * 
     * @type {Array<TripHotelBookingOrderDto>}
     * @memberof PaginationResponseOfTripHotelBookingOrderDto
     */
    'data'?: Array<TripHotelBookingOrderDto>;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTripHotelBookingOrderDto
     */
    'currentPage'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTripHotelBookingOrderDto
     */
    'totalPages'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTripHotelBookingOrderDto
     */
    'totalCount'?: number;
    /**
     * 
     * @type {number}
     * @memberof PaginationResponseOfTripHotelBookingOrderDto
     */
    'pageSize'?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfTripHotelBookingOrderDto
     */
    'hasPreviousPage'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PaginationResponseOfTripHotelBookingOrderDto
     */
    'hasNextPage'?: boolean;
    /**
     * 
     * @type {Array<FilterOption>}
     * @memberof PaginationResponseOfTripHotelBookingOrderDto
     */
    'filterOptions'?: Array<FilterOption> | null;
}

