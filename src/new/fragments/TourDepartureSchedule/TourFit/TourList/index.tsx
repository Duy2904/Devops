import { Col, Flex, Pagination, PaginationProps } from 'antd';

import { EmptyComponent } from '@src/new/components/common/Empty';
import { Header } from './components/Header';
import { HeaderList } from './components/HeaderList';
import LayoutContentBlock from '@src/new/components/common/LayoutContentBlock';
import { Search } from './components/Search';
import { SkeletonLoading } from './components/Skeleton';
import { TourItem } from './components/TourItem';
import { currentPage } from '@src/new/shared/types/BaseTypes';
import isEmpty from 'lodash/isEmpty';
import { useGetListTourFit } from './hooks/queries';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';

export const TourFitDepartureSchedule = () => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const { data, isLoading } = useGetListTourFit(tableParams);
    const listTourFit = data?.data;
    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
        setSearchParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                current: pageSize !== tableParams.pagination?.pageSize ? currentPage : pageNumber,
                pageSize: pageSize,
            },
        });
    };

    return (
        <Col className="h-full">
            <Header />
            <Search />
            <HeaderList totalItem={data?.totalCount} />
            <LayoutContentBlock className="max-h-[calc(100vh_-_345px)] px-1">
                {isLoading ? (
                    <SkeletonLoading />
                ) : (
                    <>
                        {!isEmpty(listTourFit) ? (
                            <>
                                <Col className="flex gap-5 flex-col py-5">
                                    {listTourFit?.map((item, index) => (
                                        <TourItem key={index} item={item} index={index} />
                                    ))}
                                </Col>
                            </>
                        ) : (
                            <EmptyComponent />
                        )}
                    </>
                )}
            </LayoutContentBlock>
            {!isEmpty(listTourFit) && (
                <Flex justify="flex-end" className="py-4">
                    <Pagination
                        current={tableParams?.pagination?.current}
                        total={tableParams?.pagination?.total}
                        pageSize={tableParams?.pagination?.pageSize}
                        onChange={onChange}
                        showSizeChanger
                    />
                </Flex>
            )}
        </Col>
    );
};
