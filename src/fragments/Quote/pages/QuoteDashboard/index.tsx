import { Col } from 'antd';
import { useEffect } from 'react';

import { TourType } from '@src/types/TypeEnum';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';

import { HeaderQuoteList } from './Header';
import { SearchQuoteList } from './Search';
import { TableQuoteList } from './TableData';

interface QuoteListProps {
    tourType: TourType;
}
export const QuoteList: React.FC<QuoteListProps> = props => {
    const {
        actions: { setTourType, resetQuoteStore },
    } = useQuoteStore(state => state);

    useEffect(() => {
        setTourType(props.tourType);

        return () => {
            resetQuoteStore();
        };
    }, [props.tourType, resetQuoteStore, setTourType]);

    return (
        <Col>
            <HeaderQuoteList />
            <Col className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                <SearchQuoteList />
                <TableQuoteList />
            </Col>
        </Col>
    );
};
