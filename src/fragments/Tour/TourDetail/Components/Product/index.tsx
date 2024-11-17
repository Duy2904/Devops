import { Flex, Form, FormInstance } from 'antd';
import { TourGitDto, TourScheduleDto } from '@sdk/tour-operations';
import { useCallback, useEffect, useState } from 'react';

import { FareFit } from '../../TourFit/FareTour';
import { FareGit } from '../../TourGit/FareTour';
import { Surcharge } from '../../TourFit/Surcharge';
import { TourType } from '@src/types/TypeEnum';
import { useGetCurrencies } from '@components/customizes/Select/Currency/useCurrencies';
import { useGetProducts } from '@hooks/queries/useGetProducts';
import { useGetVats } from '@components/customizes/Select/Vat/useVat';
import { useProductsStore } from '@store/productStore';

interface ProductTourTemplateProps {
    tourSchedule?: TourScheduleDto | TourGitDto;
    tourType?: TourType;
    form: FormInstance;
    tourFareForm: FormInstance;
    surchargeForm: FormInstance;
}

export const ProductTourTemplate: React.FC<ProductTourTemplateProps> = props => {
    const values = Form.useWatch([], props.form);
    const {
        products,
        actions: { setProducts },
    } = useProductsStore(state => state);

    const { mutateAsync: getProducts } = useGetProducts();
    const { data: dataCurrencies } = useGetCurrencies();
    const { data: dataVat } = useGetVats();

    const [vatPercent, setVatPercent] = useState<number>(0);
    const [typeAmount, setTypeAmount] = useState<string>('');

    const fetchProduct = useCallback(async () => {
        if (products.length > 0) return;
        const data = await getProducts({ pageSize: 10 });
        setProducts(data.data ?? []);
    }, [getProducts, products.length, setProducts]);

    useEffect(() => {
        if (values?.vatId && dataVat) {
            const fetchData = dataVat?.data?.filter(item => item.id === values?.vatId)[0];
            setVatPercent(fetchData?.value ?? 0);
        }
    }, [dataVat, values?.vatId]);
    useEffect(() => {
        if (values?.currencyId && dataCurrencies) {
            const fetchData = dataCurrencies?.data?.filter(item => item.id === values?.currencyId)[0];
            setTypeAmount(fetchData?.currencyCode ?? '');
        }
    }, [dataCurrencies, values?.currencyId]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return (
        <Flex className="flex-col py-3">
            {props.tourType == TourType.FIT ? (
                <>
                    <FareFit
                        typeAmount={typeAmount}
                        vatPercent={vatPercent}
                        tourSchedule={props.tourSchedule}
                        form={props.form}
                        tourFareForm={props.tourFareForm}
                    />
                    <Surcharge
                        typeAmount={typeAmount}
                        tourSchedule={props.tourSchedule}
                        form={props.form}
                        surchargeForm={props.surchargeForm}
                    />
                </>
            ) : (
                <FareGit tourSchedule={props.tourSchedule} form={props.form} tourFareForm={props.tourFareForm} />
            )}
        </Flex>
    );
};
