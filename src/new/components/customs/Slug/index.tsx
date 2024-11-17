import { Button, Flex } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { faAngleRight, faRotate } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

import { BackBtn } from '../Buttons/BackBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import i18n from '@src/i18n';

interface SlugHeaderProps {
    slugList: { name: string; slug: string }[];
    showUpdated?: boolean;
    showBackBtn?: boolean;
    navigateUrl?: string;
    addHistory?: ReactNode;
}

export const SlugHeader = (_props: SlugHeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [timeUpdated, setTimeUpdated] = useState<string>('');

    useEffect(() => {
        if (location) {
            const dataTime = dayjs().format('HH:mm');
            setTimeUpdated(dataTime);
        }
    }, [location]);

    return (
        <Flex className="w-full mb-4" align="center" justify="space-between">
            <Flex align="center" gap={10}>
                {_props.showBackBtn && _props.navigateUrl && <BackBtn navigateUrl={_props.navigateUrl} />}
                <Flex align="center">
                    {_props.slugList.map((item, index) => {
                        if (index === _props.slugList.length - 1) {
                            return (
                                <Flex key={item.name}>
                                    <Button
                                        className="cursor-pointer text-brand-primary/50 hover:!text-brand-primary/50 border-none shadow-none text-xs w-fit p-0 h-fit"
                                        onClick={() => navigate(`${item.slug}`)}
                                    >
                                        {item.name}
                                    </Button>
                                </Flex>
                            );
                        } else {
                            return (
                                <Flex key={item.name}>
                                    <Button
                                        className="cursor-pointer text-brand-primary hover:!text-brand-primary border-none shadow-none text-xs font-bold w-fit p-0 h-fit"
                                        onClick={() => navigate(`${item.slug}`)}
                                    >
                                        {item.name}
                                    </Button>
                                    <div className="px-2 text-greyColor-fifth">
                                        <FontAwesomeIcon icon={faAngleRight} size="sm" />
                                    </div>
                                </Flex>
                            );
                        }
                    })}
                </Flex>
            </Flex>
            {(_props.showUpdated || _props.addHistory) && (
                <Flex align="center" gap={5}>
                    {_props.showUpdated && (
                        <>
                            <p className="text-xs text-brand-primary/50">{i18n.t('Cập nhật lần cuối')}</p>
                            <p className="text-xs text-blackColor-second font-bold">
                                {timeUpdated} {i18n.t('hôm nay')}
                            </p>
                            <Flex className="w-5 h-5 p-1 bg-greyColor-fifth rounded-md" align="center" justify="center">
                                <FontAwesomeIcon icon={faRotate} size="xs" />
                            </Flex>
                        </>
                    )}
                    {_props.addHistory && _props.addHistory}
                </Flex>
            )}
        </Flex>
    );
};
