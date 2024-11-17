import { Col } from 'antd';
import { DownloadSignalModel } from '../../Feature';
import { EmptyComponent } from '@components/common/Empty';
import { ItemDownload } from '../ItemDownload';
import i18n from '@src/i18n';

export interface ContentPopoverProps {
    dataDownloaded: DownloadSignalModel[];
}

export const ContentPopover: React.FC<ContentPopoverProps> = props => {
    const { dataDownloaded } = props;
    return (
        <Col className="w-[320px]">
            <p className="text-sm font-semibold border border-solid border-transparent border-b-slate-100 pb-2">
                {i18n.t('Xuất Excel')}
            </p>
            {dataDownloaded.length == 0 && <EmptyComponent />}
            <Col className="pt-5">
                {dataDownloaded.map(item => {
                    return <ItemDownload key={item.id} item={item} />;
                })}
            </Col>
        </Col>
    );
};
