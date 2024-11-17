import { Col, Form } from 'antd';
import { RouteChangeTourSOState, RouteCloneSOState } from '../../features';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { HeadContent } from '@components/ui/HeadContent';
import { Header } from './components/Header';
import { ListAction } from './components/ListAction';
import { SODetailForm } from './Form';
import { SlugTitle } from './components/Header/SlugTitle';
import { TravellerDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { toastErr } from '@components/ui/Toast/Toast';
import { useDebouncedCallback } from 'use-debounce';
import { useGetSaleOrder } from '@hooks/queries/useSaleOrders';
import { useGetSaleOrderTransfer } from '../../hooks/useSaleOrder';
import { usePersonContactStore } from '@fragments/PersonContactForm/store/personContactStore';
import { useQueryClient } from 'react-query';
import { useSaleOrderDetailStore } from '../../store/saleOrderDetailStore';
import { useSaleOrderFormStore } from '../../store/saleOrderFormStore';
import { useSaleOrderLineTravellersStore } from '@fragments/SaleOrders/store/saleOrderLineTravellerStore';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useTourFaresStore } from '@store/tourFareStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';

export const SaleOrderFormComp: React.FC = () => {
    const queryClient = useQueryClient();

    // Form Instance
    const [infoForm] = Form.useForm();
    const [touristForm] = Form.useForm();
    const [tourInfoForm] = Form.useForm();
    const [totalCustomerForm] = Form.useForm();
    const [surchargeForm] = Form.useForm();
    const [totalAmountForm] = Form.useForm();
    const [personContactForm] = Form.useForm();

    const { soId } = useParams<string>();
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;

    // Store
    const {
        actions: { setSaleOrder, resetSaleOrderStore },
    } = useSaleOrderStore(state => state);
    const {
        actions: { resetSaleOrderDetailStore },
    } = useSaleOrderDetailStore(state => state);
    const {
        actions: { resetSOFormStore },
    } = useSaleOrderFormStore(state => state);
    const {
        actions: { resetSaleOrderLineTravellers },
    } = useSaleOrderLineTravellersStore(state => state);
    const {
        actions: { removeTourSchedule },
    } = useTourScheduleStore(state => state);
    const {
        actions: { resetTourFaresStore },
    } = useTourFaresStore(state => state);
    const {
        personContactDetail,
        isCreatingPersonContact,
        actions: { setIsCreatingPersonContact },
    } = usePersonContactStore(state => state);

    // Query
    const { data } = useGetSaleOrder(soId ?? clonedId ?? '');
    const { data: dataChangeTour } = useGetSaleOrderTransfer(changeTourSOId ?? '');
    // State
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false);
    const [isEnableEdit, setIsEnableEdit] = useState<boolean>(false);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            resetSaleOrderStore();
            resetSaleOrderDetailStore();
            resetSOFormStore();
            resetSaleOrderLineTravellers();
            removeTourSchedule();
            resetTourFaresStore();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isEmpty(data)) {
            if (clonedId || changeTourSOId) {
                const newData = {
                    ...data,
                    saleOrderLines: [],
                };
                setSaleOrder(newData);
            } else {
                setSaleOrder(data);
            }
        }
    }, [changeTourSOId, clonedId, data, setSaleOrder]);

    // init data when go to SO detail by change tour
    useEffect(() => {
        if (!isEmpty(dataChangeTour)) {
            setSaleOrder(dataChangeTour);
        }
    }, [dataChangeTour, setSaleOrder]);

    const setInvalidQuerySOList = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['getSaleOrder'] });
        queryClient.invalidateQueries({ queryKey: ['fetchSaleOrderLineTravellers'] });
        queryClient.invalidateQueries({ queryKey: ['getSaleOrderTotal'] });
        queryClient.invalidateQueries({ queryKey: ['getTourScheduleId'] });
    }, [queryClient]);

    const handleSubmitForm = useCallback(async () => {
        let isSuccess = true;

        await tourInfoForm.validateFields().catch(() => {
            isSuccess = false;
        });
        await totalCustomerForm.validateFields().catch(() => {
            isSuccess = false;
        });
        await touristForm.validateFields().catch(() => {
            isSuccess = false;
        });
        await infoForm.validateFields().catch(() => {
            isSuccess = false;
        });
        await surchargeForm.validateFields().catch(() => {
            isSuccess = false;
        });
        await totalAmountForm.validateFields().catch(() => {
            isSuccess = false;
        });
        if (isEmpty(touristForm.getFieldsValue())) {
            toastErr('', 'Vui lòng nhập danh sách khách đi tour!');
            isSuccess = false;
        }

        if (isSuccess) {
            touristForm.submit();
            surchargeForm.submit();
            infoForm.submit();
            setIsSubmitting(true);
        } else {
            toastErr('', i18n.t('validation.default.validForm'));
        }
    }, [infoForm, surchargeForm, totalAmountForm, totalCustomerForm, tourInfoForm, touristForm]);

    const handleDataPersonContact = (traveller: TravellerDto) => {
        infoForm.setFieldValue('travellerId', traveller.id);
        infoForm.setFieldValue('contactName', `${traveller.lastName} ${traveller.firstName}`);
        infoForm.setFieldValue('contactPhone', traveller.phone);
        infoForm.setFieldValue('contactEmail', traveller.email);
        infoForm.setFieldValue('contactAddress', traveller.address);
    };

    const submitPersonContactForm = async () => {
        let isSuccess = true;

        await personContactForm.validateFields().catch(() => {
            isSuccess = false;
            toastErr('', i18n.t('validation.default.validForm'));
        });

        if (isSuccess) {
            personContactForm.submit();
        }
    };

    const onSubmit = useDebouncedCallback(
        () => {
            if (isEmpty(personContactDetail) || !personContactDetail.id) {
                submitPersonContactForm();
                setIsCreatingPersonContact(true);
            } else {
                handleSubmitForm();
            }
        },
        2000,
        { leading: true, trailing: false },
    );

    // submit form after create person contact success in personContactForm
    useEffect(() => {
        if (isCreatingPersonContact && !isEmpty(personContactDetail.id)) {
            handleSubmitForm();
            setIsCreatingPersonContact(false);
        }
    }, [handleSubmitForm, isCreatingPersonContact, personContactDetail, setIsCreatingPersonContact]);

    useEffect(() => {
        if (clonedId && !isEnableEdit) {
            setIsEnableEdit(true);
        }
    }, [clonedId, isEnableEdit]);

    return (
        <Col>
            <HeadContent
                slugContent={<SlugTitle soId={soId ?? ''} />}
                titleContent={<Header soId={soId ?? ''} setIsOpenHistory={setIsOpenHistory} />}
                buttonActionList={
                    <ListAction
                        soId={soId ?? ''}
                        onSubmit={onSubmit}
                        isEnableEdit={isEnableEdit}
                        isSubmitting={isSubmitting}
                        setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                        isOpenConfirmationModal={isOpenConfirmationModal}
                        setInvalidQuerySOList={setInvalidQuerySOList}
                        dataChangeTour={dataChangeTour}
                    />
                }
            />
            <SODetailForm
                tourInfoForm={tourInfoForm}
                totalCustomerForm={totalCustomerForm}
                touristForm={touristForm}
                infoForm={infoForm}
                surchargeForm={surchargeForm}
                totalAmountForm={totalAmountForm}
                personContactForm={personContactForm}
                isEnableEdit={isEnableEdit}
                isOpenHistory={isOpenHistory}
                setIsEnableEdit={setIsEnableEdit}
                setIsSubmitting={setIsSubmitting}
                setIsOpenHistory={setIsOpenHistory}
                setInvalidQuerySOList={setInvalidQuerySOList}
                handleDataPersonContact={handleDataPersonContact}
            />
        </Col>
    );
};
