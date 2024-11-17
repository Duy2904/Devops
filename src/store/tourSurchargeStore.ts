import { create } from 'zustand';
import { TourScheduleSurchargeDto } from '../../sdk/tour-operations';

interface TourSurchargeStore {
    tourSurcharges: TourScheduleSurchargeDto[];
    selectTourSurcharges: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setTourSurcharge: (tourSurcharges: TourScheduleSurchargeDto[]) => void;
    };
}

export const useTourSurchargeStore = create<TourSurchargeStore>()(set => ({
    tourSurcharges: [],
    selectTourSurcharges: [],
    actions: {
        setTourSurcharge: (tourSurcharges: TourScheduleSurchargeDto[]) => {
            set(() => {
                return {
                    tourSurcharges: tourSurcharges,
                    selectTourSurcharges: tourSurcharges.map(tourSchedule => ({
                        label: tourSchedule.productName ?? '',
                        value: tourSchedule.productId ?? '', // Used for Sale order
                    })),
                };
            });
        },
    },
}));
