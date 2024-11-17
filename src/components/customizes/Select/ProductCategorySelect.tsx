import { Select } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import { ReactNode, useCallback, useEffect } from 'react';

import { useGetProductCategory } from '@hooks/queries/useProductCategory';
import { useProductCategoryStore } from '@store/productCategoryStore';

import FilterSearch from '../../../utils/filterSearch';
import { BaseSelect } from './BaseSelect';

interface OptionType {
    value: string;
    label: string;
}

interface ProductCategorySelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    // eslint-disable-next-line no-unused-vars
    onChange?: (id: string) => void;
    size?: SizeType;
    initialValue?: string | null;
    dataSelect?: OptionType[];
    dataSelected?: AnyObject;
    isDisableOption?: boolean;
    disabled?: boolean;
    isForm?: boolean;
}

export const ProductCategorySelect: React.FC<ProductCategorySelectProps> = props => {
    const {
        productCategory,
        selectCurrentProductCategory,
        actions: { setProductCategory },
    } = useProductCategoryStore(state => state);

    const { mutateAsync: getProductCategory } = useGetProductCategory();

    const fetchProductType = useCallback(async () => {
        if (productCategory.length > 0) return;
        const data = await getProductCategory();

        setProductCategory(data.data ?? []);
    }, [getProductCategory, productCategory.length, setProductCategory]);

    useEffect(() => {
        fetchProductType();
    }, [fetchProductType]);

    const options: OptionType[] = props.isDisableOption
        ? (props.dataSelect ?? selectCurrentProductCategory).map(option => ({
              ...option,
              disabled: props.dataSelected?.includes(option.value),
          }))
        : props.dataSelect ?? selectCurrentProductCategory;

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder="Chọn loại DV-SP"
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
        />
    );
};
