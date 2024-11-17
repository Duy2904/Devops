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
import { CancellationConditionDto } from './cancellation-condition-dto';
// May contain unused imports in some cases
// @ts-ignore
import { CommissionConditionDto } from './commission-condition-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TourContentDto } from './tour-content-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TourDtoStatus } from './tour-dto-status';
// May contain unused imports in some cases
// @ts-ignore
import { TourScheduleFareDto } from './tour-schedule-fare-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TourScheduleMediaSummaryDto } from './tour-schedule-media-summary-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TourScheduleSurchargeDto } from './tour-schedule-surcharge-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TourScheduleTagDto } from './tour-schedule-tag-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TourScheduleTourGuideDto } from './tour-schedule-tour-guide-dto';
// May contain unused imports in some cases
// @ts-ignore
import { TourSearchFitDtoAllOfApprovalStatus } from './tour-search-fit-dto-all-of-approval-status';

/**
 * 
 * @export
 * @interface TourScheduleDtoAllOf
 */
export interface TourScheduleDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'tourTypeId'?: string;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'tourTypeName'?: string;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'routeCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'routeName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'routeLocationName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'vatName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'vatValue'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof TourScheduleDtoAllOf
     */
    'remainingCapacity'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof TourScheduleDtoAllOf
     */
    'bookedQuantity'?: number;
    /**
     * 
     * @type {number}
     * @memberof TourScheduleDtoAllOf
     */
    'reserveQuantity'?: number;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'tourCode'?: string | null;
    /**
     * 
     * @type {TourDtoStatus}
     * @memberof TourScheduleDtoAllOf
     */
    'status'?: TourDtoStatus | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'sellerPhone'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'sellerName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'customerCustomerNo'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'customerName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'tourCategoryName'?: string;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'currencyId'?: string;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'currencyName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'departureLocationName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'destinationLocationCountryTwoLetterIsoCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'destinationLocationName'?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof TourScheduleDtoAllOf
     */
    'createdOn'?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'vendorVendorNo'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'vendorName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'vendorLogo'?: string | null;
    /**
     * 
     * @type {TourSearchFitDtoAllOfApprovalStatus}
     * @memberof TourScheduleDtoAllOf
     */
    'approvalStatus'?: TourSearchFitDtoAllOfApprovalStatus | null;
    /**
     * 
     * @type {string}
     * @memberof TourScheduleDtoAllOf
     */
    'rejectedReason'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof TourScheduleDtoAllOf
     */
    'hasTourThienNhien'?: boolean;
    /**
     * 
     * @type {Array<TourScheduleMediaSummaryDto>}
     * @memberof TourScheduleDtoAllOf
     */
    'tourScheduleMedias'?: Array<TourScheduleMediaSummaryDto>;
    /**
     * 
     * @type {Array<TourScheduleFareDto>}
     * @memberof TourScheduleDtoAllOf
     */
    'tourScheduleFares'?: Array<TourScheduleFareDto>;
    /**
     * 
     * @type {Array<TourScheduleSurchargeDto>}
     * @memberof TourScheduleDtoAllOf
     */
    'tourScheduleSurcharges'?: Array<TourScheduleSurchargeDto>;
    /**
     * 
     * @type {Array<TourScheduleTourGuideDto>}
     * @memberof TourScheduleDtoAllOf
     */
    'tourScheduleTourGuides'?: Array<TourScheduleTourGuideDto>;
    /**
     * 
     * @type {Array<CancellationConditionDto>}
     * @memberof TourScheduleDtoAllOf
     */
    'cancellationConditions'?: Array<CancellationConditionDto>;
    /**
     * 
     * @type {Array<CommissionConditionDto>}
     * @memberof TourScheduleDtoAllOf
     */
    'commissionConditions'?: Array<CommissionConditionDto>;
    /**
     * 
     * @type {Array<TourContentDto>}
     * @memberof TourScheduleDtoAllOf
     */
    'tourScheduleContents'?: Array<TourContentDto>;
    /**
     * 
     * @type {Array<TourContentDto>}
     * @memberof TourScheduleDtoAllOf
     */
    'tourScheduleConditions'?: Array<TourContentDto>;
    /**
     * 
     * @type {Array<TourScheduleTagDto>}
     * @memberof TourScheduleDtoAllOf
     */
    'tags'?: Array<TourScheduleTagDto>;
}
