import { ReceivableVoucherDto } from '@sdk/tour-operations';
import { HeadContent } from '@src/new/components/customs/HeadContent';
import { Col, Flex } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Slug } from './Slug';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { PageName } from '@src/types/TypeEnum';
import { TitleHeader } from '@src/new/components/customs/TitleHeader';
import { ButtonAction } from './ButtonAction';
interface HeaderProps {
    data?: ReceivableVoucherDto;
    isEnableEdit: boolean;
    handleSubmit: () => void;
}

export const Header: React.FC<HeaderProps> = props => {
    const { data, isEnableEdit, handleSubmit } = props;
    const { t } = useTranslation();
    return (
        <Col>
            <HeadContent
                slugContent={<Slug isEnableEdit={isEnableEdit} />}
                titleContent={<TitleHeader title={data ? t(`CHỈNH SỬA PHIẾU HOÀN`) : t(`THÊM MỚI PHIẾU HOÀN`)} />}
                buttonActionList={<ButtonAction isEnableEdit={isEnableEdit} handleSubmit={handleSubmit} />}
            />
            {data?.status && (
                <Flex className="mb-5" align="center" gap={20}>
                    <Flex align="center" gap={6}>
                        <p className="text-sm">{t('Trạng thái')}</p>
                        <TagStatus
                            text={t(`voucher.status.${data?.status}`)}
                            page={PageName.Voucher}
                            status={`${data?.status}`}
                        />
                    </Flex>
                </Flex>
            )}
        </Col>
    );
};
