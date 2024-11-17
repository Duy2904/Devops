import { create } from 'zustand';
import { TourGuideDto } from '../../sdk/tour-operations';

interface TourGuideStore {
    tourGuides: TourGuideDto[];
    selectTourGuides: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setTourGuides: (Guides: TourGuideDto[]) => void;
    };
}

export const useTourGuidesStore = create<TourGuideStore>()(set => ({
    tourGuides: [],
    selectTourGuides: [],
    actions: {
        setTourGuides: (Guides: TourGuideDto[]) => {
            set(() => {
                return {
                    tourGuides: Guides,
                    selectTourGuides: Guides.map(Guide => ({
                        value: Guide.id ?? '',
                        label: Guide.phone ?? '',
                    })),
                };
            });
        },
    },
}));
