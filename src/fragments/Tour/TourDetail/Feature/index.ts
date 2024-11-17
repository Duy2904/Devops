import {
    CustomerDto,
    DiscountOnType,
    ItineraryCode,
    LocationDto,
    RouteDto,
    TourCategoryDto,
    TourGitDto,
    TourInforMediaSummaryDto,
    TourScheduleDto,
    TourScheduleStatus,
    TourTypeDto,
} from '@sdk/tour-operations';

import { AnyObject } from 'antd/es/_util/type';
import { TourNatureType } from '@src/types/TypeEnum';

// Clone Tour
export const changeDataCloneTour = (response: TourScheduleDto | TourGitDto) => {
    return {
        ...response,
        id: undefined,
        status: undefined,
        departureDate: undefined,
        endDate: undefined,
        saleStartDate: undefined,
        saleEndDate: undefined,
        tourCode: undefined,
        tourScheduleMedias: [],
        tourScheduleSurcharges:
            response.tourScheduleSurcharges?.map((item, index) => ({
                ...item,
                id: `tourSurchargeId--${index}`,
            })) ?? [],
        tourScheduleFares:
            response.tourScheduleFares?.map((item, index) => ({
                ...item,
                id: `tourFareId--${index}`,
            })) ?? [],
        tourScheduleTourGuides:
            response.tourScheduleTourGuides?.map((item, index) => ({
                ...item,
                id: `tourGuide--${index}`,
            })) ?? [],
        transportationTourServices:
            response.transportationTourServices?.map(item => ({
                ...item,
                id: undefined,
                depositDate: undefined,
                issuanceDate: undefined,
                nameEntryDate: undefined,
            })) ?? [],
        visaTourService: {
            ...response.visaTourService,
            id: undefined,
            visaSubmissionDate: undefined,
            visaResultReturnDate: undefined,
            visaSubmissionToConsulateDate: undefined,
        },
        hotelTourService: {
            ...response.hotelTourService,
            id: undefined,
            tourServiceDeposits:
                response.hotelTourService?.tourServiceDeposits?.map(item => ({
                    ...item,
                    id: undefined,
                    depositDate: undefined,
                })) ?? [],
        },
        landTourService: {
            ...response.landTourService,
            id: undefined,
            tourServiceDeposits:
                response.landTourService?.tourServiceDeposits?.map(item => ({
                    ...item,
                    id: undefined,
                    depositDate: undefined,
                })) ?? [],
        },
        cancellationConditions:
            (response as TourScheduleDto).cancellationConditions?.map((item, index) => ({
                ...item,
                id: `cancelId--${-(index + 1)}`,
                date: undefined,
                numberOfDate: undefined,
            })) ?? [],
        commissionConditions:
            (response as TourScheduleDto).commissionConditions?.map((item, index) => ({
                ...item,
                id: item.commissionTypeObjectType == 'Agent' ? `AgentType--${index}` : `ReferrerType--${index}`,
            })) ?? [],

        // Special of FIT Tour
        tourNature: (response as TourScheduleDto).hasTourThienNhien ? TourNatureType.HNH : response?.tourNature,
        vendorId: (response as TourScheduleDto).hasTourThienNhien ? undefined : response?.vendorId,
        partnerTourCode: (response as TourScheduleDto).hasTourThienNhien ? undefined : response?.partnerTourCode,

        // Special of GIT Tour
        passengerTypeSeats: (response as TourGitDto).passengerTypeSeats?.map(item => ({
            ...item,
            id: undefined,
        })),
    };
};

// Handle Value Change Data Form
export const setCateTour = (code: string | undefined) => {
    if (code === 'ob') return true;
    else if (code === 'ib' || code === 'do') return false;
    else return undefined;
};

export const tourCategoryCode = (TourCategories: TourCategoryDto[], allValues: AnyObject) => {
    return TourCategories?.find(item => item.id === allValues.tourCategoryId)?.code?.toLowerCase() ?? '';
};
export const tourType = (tourTypes: TourTypeDto[], tourTypeId: string) => {
    return tourTypes?.find(item => item.id === tourTypeId)?.code ?? '';
};
export const twoLetterCountryCode = (locations: LocationDto[], destinationLocationId: string) => {
    return locations?.find(item => item.id === destinationLocationId)?.countryTwoLetterIsoCode?.toLowerCase() ?? '';
};
export const locationCode = (locations: LocationDto[], destinationLocationId: string) => {
    return locations?.find(item => item.id === destinationLocationId)?.code ?? '';
};
export const tourTripLabel = (locationCodeRes: string, itineraryCode: string) => {
    return itineraryCode == ItineraryCode.SendCustomerToVendor
        ? ItineraryCode.SendCustomerToVendor
        : locationCodeRes + itineraryCode.slice(-2);
};
export const customerCode = (customers: CustomerDto[], customerId: string) => {
    return customers?.find(item => item.id === customerId)?.customerNo ?? '';
};

export const routeCode = (routesList: RouteDto[], routeId: string) => {
    return routesList?.find(item => item.id == routeId)?.code ?? '';
};

// can Change Data
export const canEditData = (status: TourScheduleStatus | null | undefined) => {
    switch (status) {
        case null:
        case undefined:
        case TourScheduleStatus.New:
        case TourScheduleStatus.WaitingForApproval:
        case TourScheduleStatus.Rejected:
            return true;
        default:
            return false;
    }
};

// Return fieldValue
export const fieldValueRenderFIT = (response: TourScheduleDto) => {
    return {
        ...response,
        id: undefined,
        departureDate: undefined,
        endDate: undefined,
        saleStartDate: undefined,
        saleEndDate: undefined,
        tourCode: undefined,
        accountingTourCode: undefined,
        discountOnTypes: response.discountOnTypes?.filter(item => item !== DiscountOnType.EarlyBirdLastMinute),
        tourNature: response?.hasTourThienNhien ? TourNatureType.HNH : response?.tourNature,
    };
};

// Return fieldValue
export const fieldValueRenderGIT = (response: TourGitDto) => {
    return {
        ...response,
        id: undefined,
        departureDate: undefined,
        endDate: undefined,
        saleStartDate: undefined,
        saleEndDate: undefined,
        tourCode: undefined,
        accountingTourCode: undefined,
    };
};

// Change NameFile Clone
export const changeFileName = (item: TourInforMediaSummaryDto, data: TourScheduleDto) => {
    const pathNameFile = item.mediaFileName?.substring(item.mediaFileName?.lastIndexOf('.') + 1);
    const _lastNameFile = !data?.hasTourThienNhien
        ? item.mediaFileName?.lastIndexOf('_')
        : item.mediaFileName?.indexOf('.');
    return `${item.mediaFileName?.substring(0, _lastNameFile)}.${pathNameFile}`;
};
