import { AutoComplete, Col, FormInstance, Input, InputRef } from 'antd';
import React, { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from './Empty';
import { useDebouncedCallback } from 'use-debounce';
import { useGetTravellers } from './usePersonContact';
import { TravellerDto } from '@sdk/tour-operations';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { AnyObject } from 'antd/es/_util/type';

interface AutoCompletePhoneProps {
    canSearch?: boolean;
    personContactData: TravellerDto;
    form?: FormInstance;
    customerId?: string;
    setPersonContactData: Dispatch<React.SetStateAction<TravellerDto>>;
}

export const AutoCompletePhone: React.FC<AutoCompletePhoneProps> = ({
    canSearch,
    personContactData,
    form,
    customerId,
    setPersonContactData,
}) => {
    const { t } = useTranslation();
    const inputRef = useRef<InputRef | null>(null);

    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [optionsView, setOptionsView] = useState<{ value: string }[]>([]);
    const [traveller, setTraveller] = useState<TravellerDto[]>([]);
    const [isEmptyData, setIsEmptyData] = useState<boolean>(false);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>();
    const [phoneCreated, setPhoneCreated] = useState<string>('');

    const [randomKey, setRandomKey] = useState<number>();

    const { mutateAsync: getTravellers } = useGetTravellers();

    const handleSearch = useDebouncedCallback((value: string) => {
        if (inputValue === '' || value === '') {
            setOpenSearch(false);
        }
        if (inputValue !== value) return;
        setOpenSearch(true);
        onSearch(value);
        setValueSearch(value ? `+84 ${value}` : '');
    }, 500);

    const onSearch = async (value: string) => {
        setOptions([]);
        if (!value) {
            setIsEmptyData(false);
            setPersonContactData({});
            form?.setFieldValue('travellerId', undefined);
            return;
        }
        const data = await getTravellers({
            advancedSearch: {
                fields: ['phone'],
                keyword: value,
            },
            pageSize: 20,
            customerId: !isNil(customerId) ? customerId : undefined,
        });
        if (data.data && !isEmpty(data.data)) {
            const dataFetch = data.data?.map(Guide => ({
                value: Guide?.id ?? '',
                label: `${Guide?.phone}`,
            }));
            setTraveller(data.data);
            setOptions(dataFetch);
            setIsEmptyData(false);
        } else {
            setIsEmptyData(true);
            setOptions([]);
        }
        setOpenSearch(true);
    };

    const onSelect = (value: string) => {
        const foundTraveller = traveller.find(item => item?.phone === value) ?? {};
        setPersonContactData(foundTraveller);
        form?.setFieldValue('travellerId', foundTraveller.id);
        setOpenSearch(false);
        setOptions([]);
    };

    const handleAutoFillAfterCreated = useCallback((phone: string) => {
        onSearch(phone);
        onSelect(phone);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const valueOptionRender = (valueOption: string) => {
        const foundTraveller = traveller.find(item => item?.phone === valueOption) ?? {};
        return `${foundTraveller?.phone?.startsWith('+84') ? foundTraveller.phone?.slice(4) : foundTraveller.phone!
            } - ${foundTraveller?.lastName} ${foundTraveller?.firstName}`;
    };

    const handleInputChange = (e: AnyObject) => {
        const { value } = e.target;
        const onlyNumbers = value.replace(/\D/g, '');
        if (onlyNumbers.length <= 10) {
            setInputValue(onlyNumbers);
        }
    };

    useEffect(() => {
        if (!isEmpty(phoneCreated)) {
            handleAutoFillAfterCreated(phoneCreated);
        }
    }, [handleAutoFillAfterCreated, phoneCreated]);

    useEffect(() => {
        if (personContactData) {
            setOptions([
                {
                    value: personContactData.phone!,
                    label: personContactData?.phone?.startsWith('+84')
                        ? personContactData.phone?.slice(4)
                        : personContactData.phone!,
                },
            ]);
            personContactData?.phone && setInputValue(personContactData?.phone?.startsWith('+84')
                ? personContactData.phone?.slice(4)
                : personContactData.phone)
        }
    }, [personContactData]);

    useEffect(() => {
        if (options) {
            const tempOpts = options
                .filter(data => !isNil(data.label))
                .map(item => {
                    return { value: item.label };
                })
            setRandomKey(Math.random());
            setOptionsView(tempOpts);
        }
    }, [options])

    useEffect(() => {
        if (inputRef.current && openSearch) {
            inputRef.current.focus();  // Focus the input when key changes
        }
    }, [openSearch, randomKey]);

    useEffect(() => {
        if (!randomKey) {
            setRandomKey(Math.random())
        }
    }, [randomKey])

    return (
        <Col className="w-full col-span-3">
            <p className="flex items-start mb-1">
                <span className="text-red-500 text-[10px] pr-1">*</span>
                {t('Số điện thoại')}
            </p>
            {canSearch ? (
                <AutoComplete
                    key={randomKey}
                    className="w-full"
                    onSelect={onSelect}
                    onSearch={handleSearch}
                    open={openSearch}
                    onBlur={() => setOpenSearch(false)}
                    options={optionsView}
                    optionRender={item => <div>{valueOptionRender(item.value as string)}</div>}
                    notFoundContent={
                        isEmptyData && (
                            <Empty
                                phoneValue={valueSearch}
                                customerId={customerId}
                                setOpenSearch={setOpenSearch}
                                setPhoneCreated={setPhoneCreated}
                            />
                        )
                    }
                    defaultValue={
                        personContactData?.phone?.startsWith('+84')
                            ? personContactData.phone?.slice(4)
                            : personContactData.phone
                    }
                    virtual={false}
                    value={inputValue}
                >
                    <Input
                        ref={inputRef}
                        addonBefore="+84"
                        placeholder={t('Tìm kiếm...')}
                        onChange={handleInputChange}
                        count={{
                            max: 10,
                            show: true,
                            strategy: (txt) => txt.length,  // Count the number of digits
                            exceedFormatter: (txt, { max }) => txt.slice(0, max),
                        }}
                    />
                </AutoComplete>
            ) : (
                <Input
                    addonBefore="+84"
                    value={
                        personContactData?.phone?.startsWith('+84')
                            ? personContactData.phone?.slice(4)
                            : personContactData.phone!
                    }
                    readOnly
                />
            )}
        </Col>
    );
};
