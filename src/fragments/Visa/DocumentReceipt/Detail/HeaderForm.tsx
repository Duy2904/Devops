import { Col } from 'antd';
import { HeadContent } from '@components/ui/HeadContent';
import { ReactNode } from 'react';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

interface HeaderDocumentReceiptFormProps {
    documentReceiptId?: string;
    statusHeader?: ReactNode;
    buttonList?: ReactNode;
}

export const HeaderDocumentReceiptForm: React.FC<HeaderDocumentReceiptFormProps> = props => {
    const slug = [
        {
            name: i18n.t('menu.visa'),
            slug: '',
        },
        {
            name: i18n.t('menu.visaReceipt'),
            slug: rootPaths.documentReceipt,
        },
        {
            name: `${props.documentReceiptId ? i18n.t('action.edit') : i18n.t('action.create')}`,
            slug: `${
                props.documentReceiptId
                    ? rootPaths.documentReceiptForm + props.documentReceiptId
                    : rootPaths.documentReceiptForm
            }`,
        },
    ];
    return (
        <HeadContent
            slugContent={<SlugHeader slugList={slug} />}
            titleContent={
                <Col>
                    <TitleHeader
                        title={
                            props.documentReceiptId
                                ? `${i18n.t('action.edit')} ${i18n.t('menu.visaReceipt')}`
                                : `${i18n.t('action.create')} ${i18n.t('menu.visaReceipt')}`
                        }
                    />
                    {props.statusHeader}
                </Col>
            }
            buttonActionList={props.buttonList}
        />
    );
};
