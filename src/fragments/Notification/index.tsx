import {
    DataSignal,
    formatDateNoti,
    groupedDateDataSignal,
    jsonDataInSignal,
    sortedDataSignal,
} from './features/NotificationFeature.ts';
import { Col, Drawer } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { BadgeNotification } from '@components/customizes/BadgeNotification/index.tsx';
import { DownloadSignalModel } from '@fragments/Download/Feature/index.ts';
import { useDownloadStore } from '@fragments/Download/Store/index.ts';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal.ts';
import { GetUserNotificationsRequest, NotificationMessageDto } from '@sdk/tour-operations/index.ts';
import Format from '@utils/format.ts';
import useSignalRInstance from '@hooks/useSignalRInstance.ts';

import { returnToast } from './features/ReturnToastContent.ts';
import { sendingNotifications } from './features/SendingNotifications.ts';
import { useGetNotifications } from './hooks/useNotification.ts';
import { NotificationDetail } from './NotificationDetail.tsx';
import { NotificationTitle } from './NotificationTitle.tsx';

const SkeletonNoti: React.FC = () => {
    return (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full h-10 w-10 bg-gray-300"></div>
                <div className="flex-1 space-y-3 py-1">
                    <div className="h-2 rounded bg-gray-300"></div>
                    <div className="h-2 rounded bg-gray-300"></div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 rounded col-span-1 bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const IndexDrawerNotification: React.FC = () => {
    const signalRService = useSignalRInstance();

    // state
    const [open, setOpen] = useState(false);
    const [numberDateShow, setNumberDateShow] = useState<number>(1);
    const [isFetchMore, setIsFetchMore] = useState<boolean>(true);
    const [paging, setPaging] = useState<GetUserNotificationsRequest>({ pageNumber: 1, pageSize: 20 });
    const [dataRaw, setDataRaw] = useState<NotificationMessageDto[]>([]);
    const [totalNotification, setTotalNotification] = useState<number>(0);
    const [resNotification, setResNotification] = useState<{ [key: string]: NotificationMessageDto[] }>({});
    const [isSendingNoti, setIsSendingNoti] = useState<boolean>(false);
    const [isNotiListRenderFinished, setIsNotiListRenderFinished] = useState<boolean>(false);

    // store
    const { setSignalConnectedId } = useSignalRInstance(state => state);
    const { setItemDownload } = useDownloadStore(state => state);

    // useQuery
    const { data: fetchPersonal } = useFetchPersonalIdentityInfo();
    const { data, isLoading, refetch } = useGetNotifications(fetchPersonal, paging);
    const hasMoreDate = useMemo(() => {
        return numberDateShow < (Object.entries(resNotification)?.length ?? 0);
    }, [numberDateShow, resNotification]);

    const hasMore = useMemo(() => data?.hasNextPage || hasMoreDate, [data?.hasNextPage, hasMoreDate]);
    const pageEndRef = useRef<HTMLInputElement>(null);

    const onOpen = async () => {
        setOpen(true);
        fetchNotifications();
    };

    const fetchNotifications = useCallback(async () => {
        if (data && isFetchMore) {
            const newData = [...dataRaw, ...(data.data ?? [])];
            const dataQuery = jsonDataInSignal(newData);
            const sortedData = sortedDataSignal(dataQuery);
            const grouped = groupedDateDataSignal(sortedData);
            setDataRaw(newData);
            setIsFetchMore(false);
            setResNotification(grouped);
        }
    }, [data, dataRaw, isFetchMore]);

    const resSignal = useCallback(
        (res: string) => {
            const fetchRes: DataSignal = JSON.parse(res);
            if (!fetchRes.connectionId) {
                refetch();
                setTotalNotification(prevtotalNotification => prevtotalNotification + 1);
                returnToast(fetchRes);
                isSendingNoti && sendingNotifications(fetchRes);
            } else {
                const fetchRes: DownloadSignalModel = JSON.parse(res);
                setItemDownload(fetchRes);
            }
        },
        [isSendingNoti, refetch, setItemDownload],
    );

    const autoCountNumber = useCallback(() => {
        setTotalNotification(data?.data?.filter(item => !item.isRead).length ?? 0);
    }, [data?.data]);

    const handleSignalR = useCallback(async () => {
        if (!signalRService) return;

        const isConnected = await signalRService.signalRInstance?.startConnection();
        isConnected && setSignalConnectedId(isConnected);
        const handleMessage = (message: string) => {
            resSignal(message);
        };
        signalRService.signalRInstance?.on(handleMessage);
    }, [resSignal, setSignalConnectedId, signalRService]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    useEffect(() => {
        autoCountNumber();
    }, [autoCountNumber]);

    useEffect(() => {
        handleSignalR();
    }, [handleSignalR]);

    useEffect(() => {
        if (!isNotiListRenderFinished && open) {
            setTimeout(() => {
                setIsNotiListRenderFinished(true);
            }, 300);
        }
        if (isNotiListRenderFinished && !open) {
            setIsNotiListRenderFinished(false);
        }
    }, [isNotiListRenderFinished, open]);

    useEffect(() => {
        if (data?.data && isFetchMore && !open) {
            fetchNotifications();
        }
    }, [data?.data, fetchNotifications, isFetchMore, open, resNotification]);

    useEffect(() => {
        if (!(hasMoreDate || hasMore) || !open || !isNotiListRenderFinished) {
            if (!open) {
                setNumberDateShow(1);
            }
            return;
        }

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting && !isLoading) {
                if (hasMoreDate && numberDateShow) {
                    setNumberDateShow(prev => prev + 2);
                } else {
                    setPaging(prev => ({
                        ...prev,
                        pageNumber: (prev.pageNumber || 0) + 1,
                    }));
                    setIsFetchMore(true);
                }
            }
        };

        const observer = new IntersectionObserver(handleIntersection);

        if (pageEndRef.current) {
            observer.observe(pageEndRef.current);
        }

        return () => observer.disconnect();
    }, [hasMore, hasMoreDate, isLoading, isNotiListRenderFinished, numberDateShow, open]);

    const onBlur = () => {
        setIsSendingNoti(true);
    };

    const onFocus = () => {
        setIsSendingNoti(false);
    };

    useEffect(() => {
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    }, []);

    return (
        <Col>
            <Col onClick={onOpen}>
                <BadgeNotification count={totalNotification} />
            </Col>
            <Drawer
                title={<NotificationTitle totalNotification={totalNotification} setOpen={setOpen} />}
                open={open}
                styles={{
                    header: {
                        padding: 0,
                    },
                    body: {
                        padding: 0,
                    },
                }}
                onClose={() => setOpen(false)}
                closeIcon={false}
                destroyOnClose
            >
                {Object.entries(resNotification).map(([key, group], index) => {
                    if (index + 1 > numberDateShow) return;
                    return (
                        <Col key={key}>
                            <Col className="bg-gray-100 p-3 sticky top-0 z-20 shadow-md shadow-slate-300">
                                <p className="text-sm font-medium text-gray-500">{formatDateNoti(key)}</p>
                            </Col>
                            {!isEmpty(group) &&
                                group?.map(item => {
                                    const notiDetail = {
                                        ...item.data,
                                        createdOn: Format.formatUTCTime(item.data.createdOn!),
                                    };
                                    return (
                                        <Suspense fallback={<SkeletonNoti />} key={item.id}>
                                            <Col>
                                                <NotificationDetail
                                                    item={item as DataSignal}
                                                    notiDetail={notiDetail}
                                                    setOpen={setOpen}
                                                />
                                            </Col>
                                        </Suspense>
                                    );
                                })}
                        </Col>
                    );
                })}
                {(hasMore || isLoading) && (
                    <div ref={pageEndRef}>
                        <SkeletonNoti />
                    </div>
                )}
            </Drawer>
        </Col>
    );
};
