import { Flex } from 'antd';
import isEmpty from 'lodash/isEmpty';

import { TourSearchFitViewDto } from '@sdk/tour-operations';
import { TagTour } from '@src/new/components/customs/Tags/TagTour';

import { Booking } from './Booking';
import { Heading } from './Heading';
import { Info } from './Info';
import { Price } from './Price';
import { Transport } from './Transport';

interface TourItemProps {
    item: TourSearchFitViewDto;
    index: number;
}

export const TourItem: React.FC<TourItemProps> = props => {
    const { item, index } = props;
    return (
        <div className="w-full shadow rounded-xl relative">
            <Flex gap={4} className="absolute left-4 -top-3.5 z-[2]">
                {!isEmpty(item?.tags) &&
                    item?.tags?.map((item, index) =>
                        index < 5 ? (
                            <TagTour
                                key={item.tagId}
                                color={item?.tagColor ?? ''}
                                content={item?.tagName}
                                icon={item?.tagIcon ?? ''}
                            />
                        ) : null,
                    )}
            </Flex>
            <Heading item={item} index={index} />
            <Flex justify="space-between" align="stretch">
                <div className="px-4 py-3 overflow-auto w-full">
                    <Flex gap={32} className="min-w-[878px] flex-nowrap" justify="flex-start">
                        <Info item={item} />
                        <Transport item={item} />
                        <Booking item={item} />
                    </Flex>
                </div>
                <Price item={item} />
            </Flex>
        </div>
    );
};
