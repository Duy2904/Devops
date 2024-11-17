import { create } from 'zustand';
import { SaleOrderLineTravellerDto, TourScheduleFareDto } from '../../sdk/tour-operations';
import i18n from '../i18n';

interface TourFaresStore {
    tourFares: TourScheduleFareDto[];
    selectTourFares: {
        value: string;
        label: string;
    }[];
    tourFareGroupings: TourScheduleFareGroupingDto[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setTourFares: (tourFares: TourScheduleFareDto[], saleOrderLineTravellers?: SaleOrderLineTravellerDto[]) => void;
        // eslint-disable-next-line no-unused-vars
        setTourFareQuantity: (tourFareGroupings: TourScheduleFareGroupingDto[], code: string, value: number) => void;
        resetTourFaresStore: () => void;
    };
}

export interface TourScheduleFareGroupingDto {
    id: string;
    code: string;
    name: string;
    value: number;
}

export const useTourFaresStore = create<TourFaresStore>()(set => ({
    tourFares: [],
    selectTourFares: [],
    tourFareGroupings: [],
    actions: {
        setTourFares: (tourFares: TourScheduleFareDto[], saleOrderLineTravellers?: SaleOrderLineTravellerDto[]) => {
            set(() => {
                return {
                    tourFares: tourFares,
                    selectTourFares: tourFares.map(tourFare => ({
                        value: tourFare.passengerTypeId ?? '', // used for Sale Order
                        label: tourFare.passengerTypeName ?? '',
                    })),
                    tourFareGroupings: Object.values(
                        tourFares.reduce(
                            (
                                group: Record<string, TourScheduleFareGroupingDto>,
                                { passengerTypeCode, passengerTypeId },
                            ) => {
                                if (!passengerTypeCode || !passengerTypeId) return group;

                                if (!group[passengerTypeCode]) {
                                    const model: TourScheduleFareGroupingDto = {
                                        id: passengerTypeId,
                                        code: passengerTypeCode,
                                        name: i18n.t(`PasengerType.${passengerTypeCode}`),
                                        value: 0,
                                    };
                                    if (saleOrderLineTravellers) {
                                        model.value = saleOrderLineTravellers
                                            .filter(x => x.passengerType?.code == passengerTypeCode)
                                            .reduce(a => a + 1, 0);
                                    }

                                    group[passengerTypeCode] = model;
                                }
                                return group;
                            },
                            {},
                        ),
                    ),
                };
            });
        },
        setTourFareQuantity: (tourFareGroupings: TourScheduleFareGroupingDto[], code: string, value: number) => {
            set(() => ({
                tourFareGroupings: tourFareGroupings.map(item => {
                    if (item.code == code) item.value = value ?? 0;
                    return item;
                }),
            }));
        },
        resetTourFaresStore: () => {
            set(() => ({
                tourFares: [],
                selectTourFares: [],
                tourFareGroupings: [],
            }));
        },
    },
}));
