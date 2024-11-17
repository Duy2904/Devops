import { Button, Flex } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { faAngleRight, faRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18n from '@src/i18n';
import { isEmptyString } from '@utils/formHelper';

interface SlugHeaderProps {
    slugList: { name: string; slug: string }[];
    showUpdated?: boolean;
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
            <Flex align="center">
                {_props.slugList.map((item, index) => {
                    if (index === _props.slugList.length - 1) {
                        return (
                            <Flex key={item.name}>
                                <Button
                                    className={clsx(
                                        'text-brand-primary/50 hover:!text-brand-primary/50 border-none shadow-none text-xs w-fit p-0 h-fit',
                                        !isEmptyString(item.slug)
                                            ? 'cursor-pointer'
                                            : 'cursor-default pointer-events-none',
                                    )}
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
                                    className={clsx(
                                        'text-brand-primary hover:!text-brand-primary border-none shadow-none text-xs font-bold w-fit p-0 h-fit',
                                        !isEmptyString(item.slug)
                                            ? 'cursor-pointer'
                                            : 'cursor-default pointer-events-none',
                                    )}
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
            {_props.showUpdated && (
                <Flex align="center" gap={5}>
                    <p className="text-xs text-brand-primary/50">{i18n.t('Cập nhật lần cuối')}</p>
                    <p className="text-xs text-blackColor-second font-bold">
                        {timeUpdated} {i18n.t('hôm nay')}
                    </p>
                    <Flex className="w-5 h-5 p-1 bg-greyColor-fifth rounded-md" align="center" justify="center">
                        <FontAwesomeIcon icon={faRotate} size="xs" />
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
};
