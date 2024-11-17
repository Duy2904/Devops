import { FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { toastErr, toastSuccess } from '@components/ui/Toast/Toast';
import { getLinkQuoteForm } from '@fragments/Quote/features/getLink';
import { useCreateQuoteGit, useGenerateQuoteGitCode, useUpdateQuoteGit } from '@fragments/Quote/hooks/useQuoteGIT';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { CreateQuoteRequest, QuoteDetailDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

import { QuoteFormCommon } from '../Common/QuoteFormCommon';

interface QuoteFormGitProps {
    form: FormInstance;
    dataQuote: QuoteDetailDto;
    isEnableEdit: boolean;
    isDirty: boolean;
    isSubmitting: boolean;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setIsDirty: Dispatch<SetStateAction<boolean>>;
}

export const QuoteFormGit: React.FC<QuoteFormGitProps> = props => {
    const { form, dataQuote, isEnableEdit, isDirty, isSubmitting, setIsDirty, setIsSubmitting, setIsEnableEdit } =
        props;
    const queryClient = useQueryClient();
    const { quoteId } = useParams<string>();
    const navigate = useNavigate();

    // Store
    const { tourType } = useQuoteStore(state => state);

    // State
    const [orderNo, setOrderNo] = useState<string>();

    // Mutate
    const { mutateAsync: generateQuoteCode } = useGenerateQuoteGitCode();
    const { mutateAsync: createQuote } = useCreateQuoteGit();
    const { mutateAsync: updateQuote } = useUpdateQuoteGit();

    // set orderNo to form value
    useEffect(() => {
        if (!form.getFieldValue('orderNo') && orderNo) {
            form.setFieldValue('orderNo', orderNo);
        }
    }, [form, orderNo]);

    // call auto gen orderNo
    const fetchorderNo = useCallback(async () => {
        const response = await generateQuoteCode();
        setOrderNo(response);
    }, [generateQuoteCode]);

    // handle create Quote
    const handleCreateQuote = async (values: AnyObject) => {
        values = values as CreateQuoteRequest;
        try {
            const response = await createQuote({
                ...values,
                orderNo: values.orderNo,
                description: values.description,
                tourScheduleId: values.tourScheduleId,
            });

            if (response.status == 200) {
                toastSuccess('', i18n.t('Thêm mới thành công!'));
                navigate(getLinkQuoteForm(tourType, response.data));
                return;
            }
        } catch (error) {
            // handle error
            toastErr('', i18n.t('Thêm mới thất bại!'));
        }
    };

    // handle update Quote
    const handleUpdateQuote = async (values: AnyObject) => {
        values = values as CreateQuoteRequest;
        try {
            const response = await updateQuote({
                ...values,
                orderNo: values.orderNo,
                description: values.description,
                tourScheduleId: values.tourScheduleId,
            });

            if (response.status == 200) {
                toastSuccess('', i18n.t('Sửa thông tin thành công!'));
                queryClient.invalidateQueries(['getQuoteGit']);
                return;
            }
        } catch (error) {
            // handle error
        }
    };

    // fetch orderNo
    useEffect(() => {
        if (!quoteId) {
            fetchorderNo();
        }
    }, [fetchorderNo, quoteId]);

    return (
        <QuoteFormCommon
            form={form}
            dataQuote={dataQuote}
            isEnableEdit={isEnableEdit}
            isDirty={isDirty}
            orderNo={orderNo}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            setIsEnableEdit={setIsEnableEdit}
            setIsDirty={setIsDirty}
            handleCreateQuote={handleCreateQuote}
            handleUpdateQuote={handleUpdateQuote}
        />
    );
};
