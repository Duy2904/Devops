import { Dispatch, SetStateAction, useMemo } from 'react';

import { QuoteDetailDto } from '@sdk/tour-operations';
import { StatusHeader } from './StatusHeader';
import { TitleHeader } from '@components/ui/TitleHeader';

interface HeaderProps {
    quoteId: string;
    dataQuote: QuoteDetailDto;
    setIsOpenHistory: Dispatch<SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = props => {
    const { quoteId, dataQuote, setIsOpenHistory } = props;

    const titleHeader = useMemo(() => (quoteId ? `Chỉnh sửa Chiết tính giá` : 'Thêm mới Chiết tính giá'), [quoteId]);

    return (
        <div>
            <TitleHeader title={titleHeader} />
            {dataQuote?.status && quoteId && (
                <StatusHeader quoteStatus={dataQuote?.status ?? ''} setIsOpenHistory={setIsOpenHistory} />
            )}
        </div>
    );
};
