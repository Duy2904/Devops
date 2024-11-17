import { Select } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import isEmpty from 'lodash/isEmpty';
import { ReactNode, useEffect, useState } from 'react';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { useGetProducts } from '@fragments/Quote/hooks/useProduct';
import { SearchProductsRequest } from '@sdk/tour-operations';
import { useProductsStore } from '@store/productStore';
import FilterSearch from '@utils/filterSearch';

interface OptionType {
    value: string;
    label: string;
}

interface QuoteProductSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string) => void;
    size?: SizeType;
    initialValue?: string | null;
    dataSelect?: OptionType[];
    dataSelected?: AnyObject;
    isDisableOption?: boolean;
    disabled?: boolean;
    isForm?: boolean;
    request?: SearchProductsRequest;
    dependencies?: string[];
    productCategoryId?: string;
}

export const QuoteProductSelect: React.FC<QuoteProductSelectProps> = props => {
    //Store
    const {
        actions: { setProducts },
    } = useProductsStore(state => state);

    // State
    const [selectProducts, setSelectProducts] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);
    const [currentRequest, setCurrentRequest] = useState<string>();

    // Mutate
    const { data, isLoading } = useGetProducts(props.productCategoryId ?? '');

    useEffect(() => {
        if (!isEmpty(data)) {
            const list = data?.data ?? [];
            const selectProductsTemp = list?.map(product => ({
                value: product.id ?? '',
                label: product.name ?? '',
            }));

            setProducts(list);
            setSelectProducts(selectProductsTemp ?? []);
        }
    }, [data, setProducts]);

    useEffect(() => {
        if (isEmpty(currentRequest)) {
            setCurrentRequest(JSON.stringify(props.request));
        } else if (
            !isEmpty(props.request) &&
            !isEmpty(currentRequest) &&
            JSON.stringify(props.request) !== currentRequest
        ) {
            setProducts([]);
            setSelectProducts([]);
            setCurrentRequest(JSON.stringify(props.request));
        }
    }, [currentRequest, props.request, setProducts]);

    const options: OptionType[] = props.isDisableOption
        ? (props.dataSelect ?? selectProducts).map(option => ({
              ...option,
              disabled: props.dataSelected?.includes(option.value),
          }))
        : props.dataSelect ?? selectProducts;

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder="Chọn DV-SP"
                onChange={props.onChange}
                options={options}
                filterOption={FilterSearch.filterOption}
                allowClear
                size={props.size}
                disabled={props.disabled}
            />
        );
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            rules={props.rules}
            required={props.required}
            label={props.label}
            initialValue={props.initialValue}
            items={select()}
            dependencies={props.dependencies}
            disable={props.disabled || isLoading}
        />
    );
};
