import { FormInstance } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { QuoteDetailDto } from '@sdk/tour-operations';
import { TourType } from '@src/types/TypeEnum';

import { QuoteFormFit } from './TourFit/QuoteFormFit';
import { QuoteFormGit } from './TourGit/QuoteFormGit';

interface QuoteFormProps {
    form: FormInstance;
    dataQuote: QuoteDetailDto;
    isEnableEdit: boolean;
    isDirty: boolean;
    isSubmitting: boolean;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setIsDirty: Dispatch<SetStateAction<boolean>>;
}

export const QuoteForm: React.FC<QuoteFormProps> = props => {
    const { form, dataQuote, isEnableEdit, isDirty, isSubmitting, setIsSubmitting, setIsEnableEdit, setIsDirty } =
        props;
    const { tourType } = useQuoteStore(state => state);

    return (
        <>
            {tourType === TourType.GIT ? (
                <QuoteFormGit
                    form={form}
                    dataQuote={dataQuote}
                    isEnableEdit={isEnableEdit}
                    isDirty={isDirty}
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                    setIsEnableEdit={setIsEnableEdit}
                    setIsDirty={setIsDirty}
                />
            ) : (
                <QuoteFormFit
                    form={form}
                    dataQuote={dataQuote}
                    isEnableEdit={isEnableEdit}
                    isDirty={isDirty}
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                    setIsEnableEdit={setIsEnableEdit}
                    setIsDirty={setIsDirty}
                />
            )}
        </>
    );
};
