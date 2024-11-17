import { TourScheduleTourGuideDto } from '../../sdk/tour-operations';
import { UploadFile } from 'antd';
import { create } from 'zustand';

export interface TourFormStatus {
    tourScheduleId?: string;
    tourCode?: string;
    isInfoFormSuccess?: boolean;
    isTourServiceChecked?: boolean;
    isTourTransportationFormSuccess?: boolean;
    isTourVisaFormSuccess?: boolean;
    isTourHotelFormSuccess?: boolean;
    isTourLandTourFormSuccess?: boolean;
    isTourFareFormSuccess?: boolean;
    isTourGuideFormSuccess?: boolean;
    isSurchargeFormSuccess?: boolean;
    isTourCancelFormSuccess?: boolean;
    isTourAgentComFormSuccess?: boolean;
    isTourDiscountFormSuccess?: boolean;
    isTourReferrerComFormSuccess?: boolean;
    isUploadMediaFormSuccess?: boolean;
    message?: string;
}
interface TourFormStore {
    mediaList: UploadFile[];
    tourGuidesForm: TourScheduleTourGuideDto[];
    tourScheduleFormStatus: TourFormStatus;
    amountReducedVisaFees: number;
    amountDeposit: number;
    totalCapacity: number;
    actions: {
        // eslint-disable-next-line no-unused-vars
        setMediaList: (mediaList: UploadFile[]) => void;
        // eslint-disable-next-line no-unused-vars
        setTourGuidesForm: (tourGuide: TourScheduleTourGuideDto[]) => void;
        // eslint-disable-next-line no-unused-vars
        setTourScheduleFormStatus: (tourScheduleFormStatus: TourFormStatus) => void;
        // eslint-disable-next-line no-unused-vars
        setAmountReducedVisaFees: (amountReducedVisaFees: number) => void;
        // eslint-disable-next-line no-unused-vars
        setAmountDeposit: (amountDeposit: number) => void;
        // eslint-disable-next-line no-unused-vars
        setTotalCapacity: (totalCapacity: number) => void;
    };
}

export const useTourFormStore = create<TourFormStore>()(set => ({
    mediaList: [],
    tourGuidesForm: [],
    tourScheduleFormStatus: {} as TourFormStatus,
    amountReducedVisaFees: 0,
    amountDeposit: 0,
    totalCapacity: 0,
    actions: {
        setMediaList: (setMediaList: UploadFile[]) => {
            set(() => {
                return {
                    mediaList: setMediaList,
                };
            });
        },
        setTourGuidesForm: (tourGuide: TourScheduleTourGuideDto[]) => {
            set(() => {
                return {
                    tourGuidesForm: tourGuide,
                };
            });
        },
        setTourScheduleFormStatus: (tourScheduleFormStatus: TourFormStatus) => {
            set(() => ({ tourScheduleFormStatus }));
        },
        setAmountReducedVisaFees: (amountReducedVisaFees: number) => {
            set(() => {
                return {
                    amountReducedVisaFees: amountReducedVisaFees,
                };
            });
        },
        setAmountDeposit: (amountDeposit: number) => {
            set(() => {
                return {
                    amountDeposit: amountDeposit,
                };
            });
        },
        setTotalCapacity: (totalCapacity: number) => {
            set(() => {
                return {
                    totalCapacity: totalCapacity,
                };
            });
        },
    },
}));
