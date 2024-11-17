import { Col, Flex } from 'antd';

import { Color } from '@src/new/components/ui/Color/CustomColor';
import { SortItem } from './SortItem';
import clsx from 'clsx';

interface HeaderListProps {
    totalItem: number | undefined;
}
export const HeaderList: React.FC<HeaderListProps> = props => {
    const { totalItem } = props;
    return (
        <Flex justify="space-between" align="center" className="mb-4">
            <Col>
                {totalItem && totalItem >= 0 ? (
                    <p className={clsx(Color.text_2A2A2A_80)}>
                        <span className="font-bold mr-1 text-greyColor-second text-sm">{totalItem}</span>tours
                    </p>
                ) : (
                    <></>
                )}
            </Col>
            <SortItem />
        </Flex>
    );
};
