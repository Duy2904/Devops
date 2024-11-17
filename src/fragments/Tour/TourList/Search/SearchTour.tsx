import { TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import { Fragment } from 'react';

import Can from '@components/common/Can';
import SearchBlock from '@components/common/SearchBlock';
import { BaseRangeDateSearch } from '@components/customizes/SearchBox/BaseRangeDateSearch';
import { InputSearch } from '@components/customizes/SearchBox/InputSearch';
import { StatusSearch } from '@components/customizes/SearchBox/StatusSearch';
import { TourProviderMultiSelect } from '@components/customizes/Select/Providers';
import { TagMultiSelect } from '@components/customizes/Select/Tags';
import { TourCategorySelect } from '@components/customizes/Select/TourCategory';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import i18n from '@src/i18n';
import { AppConfig } from '@utils/config';
import { MyPermissions } from '@utils/Permissions/index.ts';

import { RouteFitSelect } from '../ListTourFit/RouteFitSelect';
import { TourLocationFitSelect } from '../ListTourFit/TourLocationFitSelect';
import { TourCustomerGitSelect } from '../ListTourGit/TourCustomerGitSelect';
import { TourLocationGitSelect } from '../ListTourGit/TourLocationGitSelect';
import { tourAgentStatus, tourGitStatus, tourStatus } from './SearchTourFeature';

type SearchTourProps = {
    isFitTour: boolean;
    permission: string[];
};

const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Hôm nay', value: [dayjs(), dayjs()] },
    { label: 'Hôm qua', value: [dayjs().add(-1, 'day'), dayjs()] },
    { label: '07 ngày tới', value: [dayjs(), dayjs().add(6, 'day')] },
    { label: 'Trong tháng', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
    { label: '03 tháng tới', value: [dayjs(), dayjs().add(3, 'months')] },
    { label: '06 tháng tới', value: [dayjs(), dayjs().add(6, 'months')] },
];

export const SearchTour: React.FC<SearchTourProps> = props => {
    const isFitManagerSearch = useHasAnyPermission([MyPermissions.TourFitView]);
    const canSeeProvider = useHasAnyPermission([MyPermissions.TourFitProviderView]);

    return (
        <Can permissions={props.permission}>
            <SearchBlock>
                <div className="w-full grid grid-cols-12 gap-4 relative">
                    <BaseRangeDateSearch
                        title="Thời gian"
                        showTitle
                        rangePresets={rangePresets}
                        className="w-full col-span-12 md:col-span-3"
                        formatDate={AppConfig.DateFormat}
                        defaultValue={[dayjs(), dayjs().add(3, 'months')]}
                    />
                    {props.isFitTour ? (
                        <Fragment>
                            <StatusSearch
                                className="w-full col-span-6 md:col-span-2"
                                title="Trạng thái"
                                placeholderContent="--Chọn trạng thái--"
                                listStatus={isFitManagerSearch ? tourStatus : tourAgentStatus}
                                showTitle
                            />
                            <TagMultiSelect
                                className="w-full col-span-6 md:col-span-2"
                                placeholderContent="--Chọn thẻ--"
                                title="Thẻ"
                                showTitle
                            />
                        </Fragment>
                    ) : (
                        <StatusSearch
                            className="w-full col-span-6 md:col-span-3"
                            title="Trạng thái"
                            placeholderContent="--Chọn trạng thái--"
                            listStatus={tourGitStatus}
                            showTitle
                        />
                    )}
                    {canSeeProvider && props.isFitTour && (
                        <TourProviderMultiSelect
                            className="w-full col-span-6 md:col-span-2"
                            placeholderContent="--Chọn đơn vị--"
                            title="Đơn vị mở tour"
                            showTitle
                        />
                    )}
                    <InputSearch
                        className="w-full col-span-6 md:col-span-3"
                        title="Tìm kiếm"
                        placeholderContent="Nhập mã, tên Tour"
                        showTitle
                    />

                    <TourCategorySelect className="w-full col-span-6 md:col-span-3" title="Thị trường" showTitle />
                    {props.isFitTour ? (
                        <>
                            <TourLocationFitSelect
                                className="w-full col-span-6 md:col-span-3"
                                title={i18n.t('Điểm khởi hành')}
                                showTitle
                                isDepartureLocation
                            />
                            <TourLocationFitSelect
                                className="w-full col-span-6 md:col-span-3"
                                title={i18n.t('Điểm đến')}
                                showTitle
                            />
                            <RouteFitSelect
                                className="w-full col-span-6 md:col-span-3"
                                title={i18n.t('Hành trình')}
                                showTitle
                            />
                        </>
                    ) : (
                        <>
                            <TourLocationGitSelect
                                className="w-full col-span-6 md:col-span-3"
                                title={i18n.t('Điểm khởi hành')}
                                showTitle
                                isDepartureLocation
                            />
                            <TourLocationGitSelect
                                className="w-full col-span-6 md:col-span-3"
                                title={i18n.t('Điểm đến')}
                                showTitle
                            />
                            <TourCustomerGitSelect
                                className="w-full col-span-6 md:col-span-3"
                                title="Đối tượng"
                                showTitle
                            />
                        </>
                    )}
                </div>
            </SearchBlock>
        </Can>
    );
};
