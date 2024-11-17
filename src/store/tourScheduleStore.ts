import { create } from 'zustand';
import { TourGitDto, TourScheduleDto } from '../../sdk/tour-operations';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
interface TourScheduleStore {
    tourSchedule: TourScheduleDto | TourGitDto;
    actions: {
        // eslint-disable-next-line no-unused-vars
        setTourSchedule: (tourSchedule: TourScheduleDto | TourGitDto) => void;
        removeTourSchedule: () => void;
    };
}

type TourScheduleDtoWithDayJs =
    | TourScheduleDto
    | (TourGitDto & {
          endDate: dayjs.Dayjs | null;
          saleEndDate: dayjs.Dayjs | null;
          departureDate: dayjs.Dayjs | null;
          saleStartDate: dayjs.Dayjs | null;
      });

export const useTourScheduleStore = create<TourScheduleStore>()(set => ({
    tourSchedule: {},
    tourSchedules: [],
    selectTourSchedule: [],
    actions: {
        setTourSchedule: (tourSchedule: TourScheduleDto | TourGitDto) => {
            set(() => ({
                tourSchedule: {
                    ...tourSchedule,
                    endDate: tourSchedule.endDate ? dayjs(tourSchedule.endDate) : null,
                    saleEndDate: tourSchedule.saleEndDate ? dayjs(tourSchedule.saleEndDate) : null,
                    departureDate: tourSchedule.departureDate ? dayjs(tourSchedule.departureDate) : null,
                    saleStartDate: tourSchedule.saleStartDate ? dayjs(tourSchedule.saleStartDate) : null,
                } as TourScheduleDtoWithDayJs,
            }));
        },
        removeTourSchedule: () => {
            set(() => ({ tourSchedule: {} as TourScheduleDto | TourGitDto }));
        },
    },
}));

interface TourSchedulesStore {
    tourSchedules: TourScheduleDto[] | TourGitDto[];
    selectTourSchedules: {
        value: string;
        label: string;
        disabled: boolean;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setTourSchedules: (tourSchedules: TourScheduleDto[] | TourGitDto[]) => void;
        removeToursSchedule: () => void;
    };
}

export const useTourSchedulesStore = create<TourSchedulesStore>()(set => ({
    tourSchedules: [],
    selectTourSchedules: [],
    actions: {
        setTourSchedules: (tourSchedules: TourScheduleDto[] | TourGitDto[]) => {
            set(() => {
                return {
                    tourSchedules: tourSchedules,
                    selectTourSchedules: tourSchedules.map(tourSchedule => ({
                        value: `${tourSchedule.id}`,
                        label: `${tourSchedule.tourCode}-${tourSchedule.name}`,
                        disabled: false,
                    })),
                };
            });
        },
        removeToursSchedule: () => {
            set(() => {
                return {
                    tourSchedules: [],
                    selectTourSchedules: [],
                };
            });
        },
    },
}));
