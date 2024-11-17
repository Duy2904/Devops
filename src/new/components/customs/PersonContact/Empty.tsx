import { PlusOutlined } from '@ant-design/icons';
import { Col, Flex } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreatePersonContactModal } from './CreatePersonContactModal';

interface EmptyProps {
    phoneValue?: string;
    customerId?: string;
    setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setPhoneCreated: React.Dispatch<React.SetStateAction<string>>;
}

export const Empty: React.FC<EmptyProps> = ({ phoneValue, customerId, setOpenSearch, setPhoneCreated }) => {
    const { t } = useTranslation();

    const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false);

    return (
        <Col className="w-[250px]">
            <p className="text-sm text-slate-400">{t('Không có kết quả')}</p>
            <Flex
                className="mt-2 p-2 rounded text-gray-400 cursor-pointer hover:bg-slate-50 transition-all"
                align="center"
                onClick={() => {
                    setIsModalCreateOpen(true);
                    setOpenSearch(false);
                }}
            >
                <PlusOutlined />
                <p className="ml-1 mr-3">{t('Thêm')}</p>
                <p className="text-black text-sm font-bold">{phoneValue}</p>
            </Flex>
            <CreatePersonContactModal
                phoneValue={phoneValue}
                customerId={customerId}
                isModalOpen={isModalCreateOpen}
                setIsModalOpen={setIsModalCreateOpen}
                setPhoneCreated={setPhoneCreated}
            />
        </Col>
    );
};
