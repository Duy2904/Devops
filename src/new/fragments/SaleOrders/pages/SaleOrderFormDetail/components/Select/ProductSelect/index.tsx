import { Select } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import isEmpty from 'lodash/isEmpty';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { ProductDto, SearchProductsRequest } from '@sdk/tour-operations';
import { BaseSelect } from '@src/new/components/customs/Selects/BaseSelect';
import { useProductsStore } from '@store/productStore';
import FilterSearch from '@utils/filterSearch';

import { useGetProducts } from '../../../hooks/mutates';

interface OptionType {
    value: string;
    label: string;
}

interface ProductSelectProps {
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
}

export const ProductSelect: React.FC<ProductSelectProps> = props => {
    //Store
    const {
        actions: { setProducts },
    } = useProductsStore(state => state);

    // State
    const [productsList, setProductsList] = useState<ProductDto[]>([]);
    const [selectProducts, setSelectProducts] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);
    const [count, setCount] = useState<number>(0);
    const [currentRequest, setCurrentRequest] = useState<string>();

    // Mutate
    const { mutateAsync: getProducts, isLoading } = useGetProducts();

    const fetchProducts = useCallback(async () => {
        const requestSearch = isEmpty(props.request) ? { pageSize: 100 } : props.request;
        if (productsList.length > 0 || count !== 0 || isLoading) return;
        const data = await getProducts(requestSearch);
        const list = data.data ?? [];
        const selectProductsTemp = list?.map(product => ({
            value: product.id ?? '',
            label: product.name ?? '',
        }));

        setProducts(list);
        setProductsList(list);
        setSelectProducts(selectProductsTemp ?? []);
        setCount(prevCount => prevCount + 1);
    }, [count, getProducts, isLoading, productsList.length, props.request, setProducts]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (isEmpty(currentRequest)) {
            setCurrentRequest(JSON.stringify(props.request));
        } else if (
            !isEmpty(props.request) &&
            !isEmpty(currentRequest) &&
            JSON.stringify(props.request) !== currentRequest
        ) {
            setProducts([]);
            setProductsList([]);
            setSelectProducts([]);
            setCount(0);
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

    if (isLoading) {
        return <BaseInput className="mb-0" type="text" initialValue={''} disable />;
    }

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
            disable={props.disabled}
        />
    );
};
