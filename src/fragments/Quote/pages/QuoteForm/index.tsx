import { Col, Form } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { HeadContent } from '@components/ui/HeadContent';
import { toastErr } from '@components/ui/Toast/Toast';
import { History } from '@fragments/History';
import { RouteCloneQuoteState } from '@fragments/Quote/features';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import i18n from '@src/i18n';
import { TourType } from '@src/types/TypeEnum';
import { useTourScheduleStore } from '@store/tourScheduleStore';

import { QuoteForm } from './components/Form';
import { Header } from './components/Header';
import { SlugTitle } from './components/Header/SlugTitle';
import { ListAction } from './components/ListAction';
import useFetchQuoteDetail from './hooks/useFetchQuoteDetail';

interface QuoteDetailProps {
    tourType: TourType;
}
export const QuoteDetail: React.FC<QuoteDetailProps> = props => {
    // Form Instance
    const [form] = Form.useForm();
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneQuoteState;

    const { quoteId } = useParams<string>();

    // State
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [isEnableEdit, setIsEnableEdit] = useState<boolean>(!quoteId);
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

    // Store
    const {
        actions: { setTourType, resetQuoteStore },
    } = useQuoteStore(state => state);
    // Store
    const {
        tourSchedule,
        actions: { removeTourSchedule },
    } = useTourScheduleStore(state => state);

    useEffect(() => {
        setTourType(props.tourType);

        return () => {
            resetQuoteStore();
        };
    }, [props.tourType, resetQuoteStore, setTourType]);

    const dataQuote = useFetchQuoteDetail(quoteId ?? clonedId ?? '');

    if (clonedId) {
        delete dataQuote.orderNo;

        // remove tourScheduleId when this tour has confirmed quote
        if (dataQuote?.tourScheduleHasConfirmedQuote) {
            delete dataQuote.tourScheduleId;
            delete dataQuote.tourScheduleHasConfirmedQuote;
            form.validateFields(['tourScheduleId']);

            if (!isEmpty(tourSchedule)) {
                removeTourSchedule();
            }
        }
    }

    useEffect(() => {
        if (!isEmpty(dataQuote)) {
            form.setFieldsValue({ ...dataQuote });
        }
    }, [clonedId, dataQuote, form]);

    const handleSubmitForm = async () => {
        let isSuccess = true;

        await form.validateFields().catch(() => {
            isSuccess = false;
        });

        if (!form.getFieldValue('orderNo')) {
            toastErr('', 'Mã chiết tính đang được tạo.');
            isSuccess = false;
        }

        if (isSuccess) {
            form.submit();
            setIsSubmitting(true);
        }
    };

    const onSubmit = useDebouncedCallback(
        () => {
            handleSubmitForm();
            setIsDirty(false);
        },
        2000,
        { leading: true, trailing: false },
    );

    return (
        <Col>
            <HeadContent
                slugContent={<SlugTitle quoteId={quoteId!} />}
                titleContent={<Header quoteId={quoteId!} dataQuote={dataQuote} setIsOpenHistory={setIsOpenHistory} />}
                buttonActionList={
                    <ListAction
                        quoteId={quoteId!}
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                        isEnableEdit={isEnableEdit}
                        isDirty={isDirty}
                        dataQuote={dataQuote}
                        isOpenConfirmationModal={isOpenConfirmationModal}
                        setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                    />
                }
            />
            <div className="h-[calc(100vh_-_186px)] bg-white gap-6 overflow-auto">
                <QuoteForm
                    form={form}
                    isEnableEdit={isEnableEdit}
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                    setIsEnableEdit={setIsEnableEdit}
                    dataQuote={dataQuote}
                    isDirty={isDirty}
                    setIsDirty={setIsDirty}
                />
            </div>

            {/* Lịch sử thao tác */}
            <History
                id={quoteId!}
                tableName={props.tourType == TourType.GIT ? 'QuoteGit' : 'Quote'}
                title={i18n.t('Lịch sử thao tác')}
                isOpenHistory={isOpenHistory}
                setIsOpenHistory={setIsOpenHistory}
            />
        </Col>
    );
};
