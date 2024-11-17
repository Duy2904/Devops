import { FormInstance } from 'antd';
import { InfoFormFit } from './TourFit/FormInfoFit';
import { InfoFormGit } from './TourGit/FormInfoGit';
import { QuoteDetailDto } from '@sdk/tour-operations';
import { TourType } from '@src/types/TypeEnum';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';

interface InfoFormProps {
    form: FormInstance;
    orderNo: string;
    dataQuote: QuoteDetailDto;
}

export const InfoForm: React.FC<InfoFormProps> = props => {
    const { form, orderNo, dataQuote } = props;
    const { tourType } = useQuoteStore(state => state);

    return (
        <>
            {tourType === TourType.GIT ? (
                <InfoFormGit form={form} orderNo={orderNo} dataQuote={dataQuote} />
            ) : (
                <InfoFormFit form={form} orderNo={orderNo} dataQuote={dataQuote} />
            )}
        </>
    );
};
