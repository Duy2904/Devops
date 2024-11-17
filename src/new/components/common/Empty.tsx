import { Empty } from 'antd';
import EmptyIcon from '@assets/images/empty.svg';
import i18n from '@src/i18n';

export const EmptyComponent = () => {
    return (
        <Empty
            className="mt-5"
            image={EmptyIcon}
            imageStyle={{ height: 60 }}
            description={<span className="text-sm text-greyColor-fourth">{i18n.t('Không có dữ liệu')}</span>}
        />
    );
};
