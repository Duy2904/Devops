import {
  Button,
  Col,
  Flex,
  Form,
  FormInstance,
  Image,
  Input,
  Modal,
  Radio,
  Rate,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import { capitalize, debounce, get, isEmpty, omit, toNumber } from "lodash";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccommodationDto, TripHotelBookingInfoDto } from "sdk/tmc";
import { v4 as uuid } from "uuid";

import AppCard from "@/components/common/AppCard";
import LocaleDatePicker from "@/components/common/LocaleDatePicker";
import { IconAdd, IconMarkLocation, IconSearchNewHotel } from "@/components/common/SvgIcon";
import Uploading from "@/components/common/Uploading";
import useSearchHotel from "@/query-hooks/queries/hotel/getHotelList";
import { formatCurrencyCustom } from "@/utils/currency";

export enum SELECT_ROOM_RATE {
  CONFIRM = "CONFIRM",
  MODIFY = "MODIFY",
  NEW = "NEW",
}

interface ISelectRoomRateProps {
  data: TripHotelBookingInfoDto | null | undefined;
  form: FormInstance;
  onCheckDirty?: () => void;
}

function removeVietnameseTones(str: string) {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
  return str.toLocaleLowerCase();
}

function SelectRoomRate(props: ISelectRoomRateProps) {
  const { data = {}, form, onCheckDirty = () => {} } = props;
  const { t } = useTranslation();
  const modifyFormData = Form.useWatch([], form);
  const [currentSelectRoomRate, setCurrentSelectRoomRate] = useState(SELECT_ROOM_RATE.CONFIRM);

  const selectedRoomInTrip = useMemo(() => {
    if (data?.hotelInfos?.length) {
      return get(data, ["hotelInfos", "0", "rooms", "0"]);
    }
    return {};
  }, [data]);

  const roomTypes = get(data, ["roomTypes"], []) as AccommodationDto["roomTypes"];
  const roomTypesOption = roomTypes?.map((room) => {
    return {
      label: room.name,
      value: room.id,
    };
  });
  const hotel = get(data, ["hotelInfos", "0"]);

  const bookingNights = useMemo(() => {
    if (hotel) {
      return dayjs(hotel.checkout).diff(dayjs(hotel.checkin), "day");
    }
    return 0;
  }, [hotel]);

  const selectedRoom = useMemo(() => {
    return roomTypes?.find((room) => room.id === modifyFormData?.roomTypeId);
  }, [modifyFormData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSelectedHotel, setCurrentSelectedHotel] = useState<AccommodationDto | undefined>();
  const [selectedHotelInModal, setSelectedHotelInModal] = useState<string | null>(null);

  const [listHotel, setListHotel] = useState<AccommodationDto[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFetchListHotel, setIsFetchingListHotel] = useState(false);

  const { mutateAsync: fetchHotelListAsync, isLoading: isLLoadingHotelList } = useSearchHotel();

  const listHotelWrapperRef = useRef<HTMLDivElement>(null);
  const listHotelRef = useRef<HTMLDivElement>(null);

  const newHotelRoomTypesOption = currentSelectedHotel?.roomTypes?.map((room) => {
    return {
      label: room.name,
      value: room.id,
    };
  });

  useEffect(() => {
    if (!isEmpty(selectedRoomInTrip)) {
      form.setFieldValue(["modifyHotel", "roomTypeId"], selectedRoomInTrip.roomTypeId);
      form.setFieldValue(["modifyHotel", "roomPrice"], selectedRoomInTrip.roomPrices);
      form.setFieldValue(["modifyHotel", "roomTax"], selectedRoomInTrip.tax);
      form.setFieldValue(["modifyHotel", "serviceFee"], selectedRoomInTrip.serviceFee);
    }
  }, [selectedRoomInTrip]);

  useEffect(() => {
    if (selectedHotelInModal && isEmpty(tempHotel)) {
      form.setFieldValue(["newHotel", "hotelId"], selectedHotelInModal);
    }
  }, [selectedHotelInModal]);

  const searchOnScroll = debounce((currentPage) => {
    const position = (listHotelWrapperRef.current?.scrollTop ?? 0) + (listHotelWrapperRef.current?.clientHeight ?? 0);
    const height = listHotelRef.current?.clientHeight ?? 0;
    if (height <= position && currentPage < totalPage) {
      fetchHotelListAsync({
        selectedGeographicalEntityId: get(data, ["suggestedDestinationId"], "") as string,
        adults: get(data, ["hotelInfos", "0", "guests"], []).length,
        rooms: get(data, ["hotelInfos", "0", "rooms"], []).length,
        checkIn: new Date(),
        checkOut: new Date(),
        pageNumber: currentPage + 1,
        pageSize: 10,
      }).then((res) => {
        setCurrentPage(res.accommodations?.currentPage ?? 0);
        setTotalPage(res.accommodations?.totalPages ?? 0);
        setListHotel((prev) => [...prev, ...get(res, ["accommodations", "data"], [])]);
        setIsFetchingListHotel(false);
      });
    } else {
      setIsFetchingListHotel(false);
    }
  }, 700);

  useEffect(() => {
    const scrollHandler = () => {
      setIsFetchingListHotel(true);
      searchOnScroll(currentPage);
    };
    listHotelWrapperRef.current?.addEventListener("scroll", scrollHandler);
    return () => {
      listHotelWrapperRef.current?.removeEventListener("scroll", scrollHandler);
    };
  });

  const [isEnterNewHotelModalOpen, setIsEnterNewHotelModalOpen] = useState(false);
  const [searchHotelText, setSearchHotelText] = useState("");
  const listHotelFiltered = useMemo(() => {
    return (listHotel ?? []).filter(
      (hotel) =>
        removeVietnameseTones(hotel.name ?? "")?.includes(removeVietnameseTones(searchHotelText)) ||
        removeVietnameseTones(hotel.address ?? "")?.includes(removeVietnameseTones(searchHotelText)),
    );
  }, [listHotel, searchHotelText]);

  useEffect(() => {
    setSelectedHotelInModal(null);
    if (!searchHotelText) {
      setTempHotel(undefined);
    }
  }, [searchHotelText]);

  const [tempHotel, setTempHotel] = useState<AccommodationDto>();

  const getRoomType = (hotel: AccommodationDto | null = {}) => get(hotel, ["roomTypes"], []);
  const onRoomTypeChangeHandler = (e: string) => {
    const bookingOption = form.getFieldValue("selectRoomRateType");

    if (bookingOption === SELECT_ROOM_RATE.MODIFY) {
      const roomTypes = getRoomType(data);
      const currentRoomPrice = get(
        roomTypes.find((room) => room.id === e),
        ["rooms", "0", "roomRate", "amountAfterTaxesCharges"],
      );
      const currentRoomTax = get(
        roomTypes.find((room) => room.id === e),
        ["rooms", "0", "roomRate", "tax"],
      );
      form.setFieldValue(["modifyHotel", "roomPrice"], currentRoomPrice);
      form.setFieldValue(["modifyHotel", "roomTax"], currentRoomTax);
    } else {
      const roomTypes = getRoomType(currentSelectedHotel);
      const currentRoomPrice = get(
        roomTypes.find((room) => room.id === e),
        ["rooms", "0", "roomRate", "amountAfterTaxesCharges"],
      );
      const currentRoomTax = get(
        roomTypes.find((room) => room.id === e),
        ["rooms", "0", "roomRate", "tax"],
      );
      form.setFieldValue(["newHotel", "roomPrice"], currentRoomPrice);
      form.setFieldValue(["newHotel", "roomTax"], currentRoomTax);
    }
  };

  const totalPricePreview = useMemo(() => {
    return formatCurrencyCustom(
      ((Number(modifyFormData?.modifyHotel?.roomPrice) || 0) +
        (Number(modifyFormData?.modifyHotel?.roomTax) || 0) +
        (Number(modifyFormData?.modifyHotel?.serviceFee) || 0)) *
        bookingNights,
    );
  }, [modifyFormData, bookingNights]);

  return (
    <AppCard className="mt-6">
      <Typography.Text className="font-[500] text-lg">{t("Select room rate")}</Typography.Text>

      <Form
        form={form}
        onChange={onCheckDirty}
        layout={"vertical"}
        className="mt-3">
        <Form.Item
          name={"selectRoomRateType"}
          initialValue={SELECT_ROOM_RATE.CONFIRM}>
          <Radio.Group
            name="radiogroup"
            defaultValue={1}
            className="flex gap-[24px]"
            onChange={() => {
              setCurrentSelectRoomRate(form.getFieldValue("selectRoomRateType"));
            }}>
            <Flex>
              <Radio
                value={SELECT_ROOM_RATE.CONFIRM}
                className="rounded select-roomrate--custom max-w-[250px]">
                <Flex className="min-h-[62px]">{t("Confirm room availability & price")}</Flex>
              </Radio>
            </Flex>
            <Flex>
              <Radio
                value={SELECT_ROOM_RATE.MODIFY}
                className="rounded select-roomrate--custom max-w-[250px]">
                <Flex className="min-h-[62px]">{t("Modify booking in the same hotel")}</Flex>
              </Radio>
            </Flex>
            <Flex>
              <Radio
                value={SELECT_ROOM_RATE.NEW}
                className="rounded select-roomrate--custom max-w-[250px]">
                <Flex className="min-h-[62px]">{t("No room available in this hotel")}</Flex>
              </Radio>
            </Flex>
          </Radio.Group>
        </Form.Item>
        {toNumber(data?.bookingStatus) < 15 ? (
          <Flex
            className="mb-3 w-full"
            vertical>
            {currentSelectRoomRate === SELECT_ROOM_RATE.CONFIRM ? (
              <Typography.Text className="font-[500] text-[#192E6E] text-[16px]">
                {t("Enter reservation details for the hotel")}
              </Typography.Text>
            ) : null}
            {currentSelectRoomRate === SELECT_ROOM_RATE.MODIFY ? (
              <>
                <Typography.Text className="font-[500] text-[#192E6E] text-[16px]">
                  {t("Update Hotel Booking Information")}
                </Typography.Text>
                <Flex className="text-textSecondary">
                  {t(
                    "What's changed in your hotel booking? You can modify either room type or price for this booking.",
                  )}
                </Flex>
              </>
            ) : null}
            {currentSelectRoomRate === SELECT_ROOM_RATE.NEW ? (
              <>
                <Typography.Text className="font-[500] text-[#192E6E] text-[16px]">
                  {t("Recommend an alternative hotel")}
                </Typography.Text>
                <Flex className="text-textSecondary">
                  {t(
                    "Suggest a different hotel to your customer? Easily search and select a new option, add the hotel information with relevant attachments, and it’s done!",
                  )}
                </Flex>
              </>
            ) : null}
          </Flex>
        ) : null}

        {currentSelectRoomRate !== SELECT_ROOM_RATE.NEW ? (
          <>
            <Row gutter={24}>
              {currentSelectRoomRate === SELECT_ROOM_RATE.MODIFY ? (
                <>
                  <Col span={12}>
                    <Form.Item
                      label={t("Room type")}
                      className={"basis-1/2"}
                      name={["modifyHotel", "roomTypeId"]}>
                      <Select
                        placeholder="King Room with Balcony"
                        className="h-12"
                        options={roomTypesOption}
                        onChange={onRoomTypeChangeHandler}></Select>
                    </Form.Item>
                    <Form.Item
                      label={t("Room name")}
                      className={"hidden"}
                      name={["modifyHotel", "roomName"]}
                      initialValue={selectedRoom?.name}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={t("Room price")}
                      className={"basis-1/2"}
                      name={["modifyHotel", "roomPrice"]}>
                      <Input
                        placeholder="26.00"
                        className="w-full h-12"
                        suffix={"VND"}></Input>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={t("Service fee")}
                      className={"basis-1/2"}
                      name={["modifyHotel", "serviceFee"]}>
                      <Input
                        placeholder={t("Enter amount")}
                        className="w-full h-12"
                        suffix={"VND"}></Input>
                    </Form.Item>
                  </Col>
                </>
              ) : null}
              <Col span={12}>
                <Form.Item
                  label={t("Reservation number")}
                  className={"basis-1/2"}
                  name={"reservationNumber"}>
                  <Input
                    placeholder={t("Enter Reservation number")}
                    className="h-12"></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t("Reservation date")}
                  className={"basis-1/2"}
                  name={"reservationDate"}>
                  <LocaleDatePicker
                    minDate={dayjs().startOf("day")}
                    placeholder="DD/MM/YYYY"
                    format={"DD/MM/YYYY"}
                    className="w-full h-12"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t("Tour code")}
                  className={"w-full"}
                  name={"tourCode"}>
                  <Input
                    placeholder={t("Enter a tour code")}
                    className="h-12"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Flex className={"basis-1/3"}>
                  <Form.Item
                    label={t("Notice")}
                    className={"w-full"}
                    name={"note"}>
                    <Input.TextArea
                      placeholder={t("Enter a notice to your customer")}
                      className="!h-[96px]"
                    />
                  </Form.Item>
                </Flex>
              </Col>
            </Row>
            {currentSelectRoomRate === SELECT_ROOM_RATE.MODIFY ? (
              <Flex
                vertical
                className="border-[#DEDEDE] shadow p-4 border rounded-xl">
                <Typography.Text>{t("Preview information")}</Typography.Text>
                <Flex className="font-[700] text-textSecondary">{selectedRoom?.name}</Flex>
                <Flex className="w-full">
                  <Flex className="basis-1/4">{t("Price")}:</Flex>
                  <Flex>
                    {formatCurrencyCustom(Number(modifyFormData.modifyHotel?.roomPrice))} x {bookingNights}{" "}
                    {t("nights")}
                  </Flex>
                </Flex>
                <Flex className="w-full">
                  <Flex className="basis-1/4">{t("Service fee")}:</Flex>
                  <Flex>
                    {formatCurrencyCustom(Number(modifyFormData.modifyHotel?.serviceFee))} x {bookingNights}{" "}
                    {t("nights")}
                  </Flex>
                </Flex>
                <Flex className="w-full">
                  <Flex className="basis-1/4">{t("Total price")}: </Flex>
                  <Flex>{totalPricePreview}</Flex>
                </Flex>
              </Flex>
            ) : null}
          </>
        ) : (
          <>
            {!!currentSelectedHotel ? (
              <>
                <AppCard className="bg-[#FAFAFA] mb-4">
                  <Flex vertical>
                    <Flex
                      justify={"space-between"}
                      className="w-full">
                      <Typography.Text className="text-[#6A6A6A] font-medium">{t("Selected hotel")}</Typography.Text>
                      <Button
                        type="link"
                        onClick={() => {
                          setIsModalOpen(true);
                        }}>
                        {t("Edit details")}
                      </Button>
                    </Flex>
                    <Flex>
                      <Flex>
                        <Image
                          src={get(currentSelectedHotel, ["medias", "0", "mediaFileUrl"])}
                          className="rounded aspect-square object-cover"
                          width={112}></Image>
                      </Flex>
                      <Flex
                        className="w-full ps-4"
                        vertical>
                        <Typography.Title
                          className="!mb-2 text-textSecondary"
                          level={5}>
                          {currentSelectedHotel.name}
                        </Typography.Title>
                        <Flex>
                          <Typography.Text className="text-textSecondary basis-[120px] shrink-0">
                            {t("Hotel stars")}:{" "}
                          </Typography.Text>
                          <Rate
                            value={currentSelectedHotel.starRating}
                            disabled
                            className="flex w-24"></Rate>
                        </Flex>
                        <Flex>
                          <Typography.Text className="text-textSecondary basis-[120px] shrink-0">
                            {t("Hotel location")}:{" "}
                          </Typography.Text>
                          <Typography.Text className="text-textSecondary">
                            {currentSelectedHotel.address}
                          </Typography.Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </AppCard>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label={t("Room type")}
                      className={classNames("basis-1/2", {
                        hidden: !isEmpty(tempHotel?.name),
                      })}
                      name={["newHotel", "roomTypeId"]}>
                      <Select
                        placeholder={t("Select room type")}
                        className="h-12"
                        options={newHotelRoomTypesOption}
                        onChange={onRoomTypeChangeHandler}></Select>
                    </Form.Item>
                    <Form.Item
                      label={t("Room type")}
                      className={classNames("basis-1/2", {
                        hidden: isEmpty(tempHotel?.name),
                      })}
                      name={["newHotel", "roomName"]}
                      initialValue={selectedRoom?.name}>
                      <Input
                        placeholder={t("Enter room type")}
                        className="w-full h-12"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={t("Hotel name")}
                      className={"basis-1/2 hidden"}
                      name={["newHotel", "hotelName"]}
                      initialValue={tempHotel?.name}>
                      <Input
                        placeholder="26.00"
                        className="hidden w-full h-12"></Input>
                    </Form.Item>
                    <Form.Item
                      label={t("Hotel Id")}
                      className={"basis-1/2 hidden"}
                      name={["newHotel", "hotelId"]}>
                      <Input
                        placeholder="26.00"
                        className="hidden w-full h-12"></Input>
                    </Form.Item>
                    <Form.Item
                      label={t("Hotel Stars")}
                      className={"basis-1/2 hidden"}
                      name={["newHotel", "starRating"]}>
                      <Input
                        placeholder="26.00"
                        className="hidden w-full h-12"></Input>
                    </Form.Item>
                    <Form.Item
                      label={t("Hotel address")}
                      className={"basis-1/2 hidden"}
                      name={["newHotel", "hotelAddress"]}>
                      <Input
                        placeholder="26.00"
                        className="hidden w-full h-12"></Input>
                    </Form.Item>
                    <Form.Item
                      label={t("Room price")}
                      className={"basis-1/2"}
                      name={["newHotel", "roomPrice"]}>
                      <Input
                        placeholder="26.00"
                        className="w-full h-12"
                        suffix={"VND"}></Input>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={t("Service fee")}
                      className={"basis-1/2"}
                      name={["newHotel", "serviceFee"]}>
                      <Input
                        placeholder={t("Enter amount")}
                        className="w-full h-12"
                        suffix={"VND"}></Input>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={t("Reservation number")}
                      className={"basis-1/2"}
                      name={"reservationNumber"}>
                      <Input
                        placeholder={t("Enter Reservation number")}
                        className="h-12"></Input>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={t("Reservation date")}
                      className={"basis-1/2"}
                      name={"reservationDate"}>
                      <LocaleDatePicker
                        minDate={dayjs().startOf("day")}
                        placeholder="DD/MM/YYYY"
                        format={"DD/MM/YYYY"}
                        className="w-full h-12"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={t("Tour code")}
                      className={"w-full"}
                      name={"tourCode"}>
                      <Input
                        placeholder={t("Enter a tour code")}
                        className="h-12"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Flex className={"basis-1/3"}>
                      <Form.Item
                        label={t("Notice")}
                        className={"w-full"}
                        name={"note"}>
                        <Input.TextArea
                          placeholder={t("Enter a notice to your customer")}
                          className="!h-[96px]"
                        />
                      </Form.Item>
                    </Flex>
                  </Col>
                </Row>
                <Flex
                  vertical
                  className="border-[#DEDEDE] shadow-lg p-4 border rounded-xl">
                  <Typography.Text>{t("Preview information")}</Typography.Text>
                  <Flex className="font-[700] text-textSecondary">{selectedRoom?.name}</Flex>
                  <Flex className="w-full">
                    <Flex className="basis-1/4">{t("Price")}:</Flex>
                    <Flex>
                      {formatCurrencyCustom(Number(modifyFormData.newHotel?.roomPrice))} x {bookingNights} {t("nights")}
                    </Flex>
                  </Flex>
                  <Flex className="w-full">
                    <Flex className="basis-1/4">Service fee:</Flex>
                    <Flex>
                      {formatCurrencyCustom(Number(modifyFormData.newHotel?.serviceFee))} x {bookingNights}{" "}
                      {t("nights")}
                    </Flex>
                  </Flex>
                  <Flex className="w-full">
                    <Flex className="basis-1/4">{t("Total price")}: </Flex>
                    <Flex>
                      {formatCurrencyCustom(
                        ((Number(modifyFormData.newHotel?.roomPrice) || 0) +
                          (Number(modifyFormData.newHotel?.roomTax) || 0) +
                          (Number(modifyFormData.newHotel?.serviceFee) || 0)) *
                          bookingNights,
                      )}
                    </Flex>
                  </Flex>
                </Flex>
                <Uploading id="dropzone-file" />
              </>
            ) : (
              <Button
                className="border-primary hover:bg-primary mt-4 border"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsFetchingListHotel(true);
                  searchOnScroll(currentPage);
                }}>
                <Flex
                  align={"center"}
                  className="text-primary">
                  <IconSearchNewHotel className="me-2"></IconSearchNewHotel>
                  {t("Search and suggest a new hotel")}
                </Flex>
              </Button>
            )}
            <Modal
              open={isModalOpen}
              onCancel={() => {
                setIsModalOpen(false);
                setSelectedHotelInModal(null);
                setSearchHotelText("");
              }}
              footer={[
                <Flex gap={16}>
                  <Button
                    key="confirm"
                    type="primary"
                    className="w-full h-12"
                    disabled={!!!selectedHotelInModal}
                    onClick={() => {
                      if (isEmpty(tempHotel)) {
                        setIsModalOpen(false);

                        form.setFieldValue(["newHotel", "hotelName"], null);
                        form.setFieldValue(["newHotel", "roomName"], null);
                        const hotel = listHotel?.find((h) => h?.id === selectedHotelInModal);
                        if (hotel) {
                          const roomTypes = getRoomType(hotel);
                          const firstRoom = get(roomTypes, ["0", "rooms", "0"]);
                          const firstRoomTypeId = get(roomTypes, ["0", "id"]);
                          const firstRoomName = get(roomTypes, ["0", "name"]);
                          const currentRoomPrice = get(firstRoom, ["roomRate", "amountAfterTaxesCharges"]);
                          const currentRoomTax = get(firstRoom, ["roomRate", "tax"]);

                          form.setFieldValue(["newHotel", "roomPrice"], currentRoomPrice);
                          form.setFieldValue(["newHotel", "roomTax"], currentRoomTax);
                          form.setFieldValue(["newHotel", "roomTypeId"], firstRoomTypeId);
                          form.setFieldValue(["newHotel", "roomName"], firstRoomName);
                          setCurrentSelectedHotel(hotel);
                        }
                      } else {
                        setIsModalOpen(false);
                        setIsEnterNewHotelModalOpen(true);
                      }
                    }}>
                    {t("Select this hotel")}
                  </Button>
                </Flex>,
              ]}>
              <Flex vertical>
                <Flex>
                  <Typography.Title
                    level={4}
                    className="!text-[18px] !text-primary">
                    {t("Recommend an alternative hotel")}
                  </Typography.Title>
                </Flex>
                <Flex className="text-[14px] text-textSecondary">
                  {t(
                    "Search to suggest a new hotel, then you can fill in information for the selected hotel after this step.",
                  )}
                </Flex>

                <Flex
                  className="mt-4"
                  align={"center"}
                  gap={4}>
                  <IconMarkLocation className="w-5 h-5" />{" "}
                  {t("Search result will be found in {{value}}", {
                    value: "Ha Noi, Viet Nam",
                  })}
                </Flex>
                <Flex className="mt-2">
                  <Input
                    className="w-full"
                    placeholder={t("Enter hotel name")}
                    prefix={<Search className="text-primary w-4 h-4" />}
                    value={searchHotelText}
                    onChange={(e) => setSearchHotelText(e.target.value)}></Input>
                </Flex>
                <Flex
                  vertical
                  className="mt-4">
                  {listHotelFiltered.length > 0 || !searchHotelText ? (
                    <Flex className="text-[14px] text-textPrimary">
                      {get(data, ["hotelInfos", "0", "location"], "")} : {listHotel.length} {t("properties")}
                    </Flex>
                  ) : null}

                  {/* Show full modal Spinner just in case first loading to get hotelList  */}
                  {isLLoadingHotelList && <Spin className="absolute z-50 top-1/2 left-1/2" />}

                  <Flex
                    vertical
                    className="w-full h-[360px] max-h-[360px]">
                    <div
                      className="w-full h-full overflow-x-unset overflow-y-auto"
                      ref={listHotelWrapperRef}>
                      <Radio.Group
                        onChange={(e) => {
                          setSelectedHotelInModal(e.target.value);
                        }}
                        className="w-full"
                        value={selectedHotelInModal}>
                        {listHotelFiltered.length > 0 ? (
                          <>
                            <div
                              ref={listHotelRef}
                              className="w-full">
                              <Space
                                direction="vertical"
                                className="w-full">
                                {listHotelFiltered?.map((hotel, hotelIdx) => (
                                  <Radio
                                    value={hotel.id}
                                    key={`${hotel.id}_${hotelIdx}`}
                                    className="bg-[#FAFAFA] hotel-checkbox__item-wrapper w-full"
                                    onClick={() => {
                                      setTempHotel(undefined);
                                      form.setFieldValue(["newHotel", "hotelName"], null);
                                      form.setFieldValue(["newHotel", "roomName"], null);
                                    }}>
                                    <Flex
                                      className="w-full"
                                      align={"center"}>
                                      <Flex>
                                        <Image
                                          src={get(hotel, ["medias", "0", "mediaFileUrl"])}
                                          className="rounded aspect-square object-cover"
                                          width={56}></Image>
                                      </Flex>
                                      <Flex
                                        vertical
                                        className="ps-3">
                                        <Typography.Title
                                          level={5}
                                          className="!mb-0 !text-[14px]">
                                          {hotel.name}
                                        </Typography.Title>
                                        <Rate
                                          value={hotel.starRating}
                                          disabled
                                          allowHalf
                                          className="text-[14px]"></Rate>
                                        <Typography.Text className="text-[12px]">{hotel.address}</Typography.Text>
                                      </Flex>
                                    </Flex>
                                  </Radio>
                                ))}
                              </Space>
                            </div>
                            <Flex
                              justify={"center"}
                              className="py-2 w-full">
                              <Spin spinning={isFetchListHotel}></Spin>
                            </Flex>
                          </>
                        ) : (
                          <>
                            {searchHotelText.length > 0 ? (
                              <>
                                {tempHotel?.name ? (
                                  <div className="w-full">
                                    <Space
                                      direction="vertical"
                                      className="w-full">
                                      <Radio
                                        value={tempHotel.id}
                                        key={tempHotel.id}
                                        className="flex items-center bg-[#FAFAFA] hotel-checkbox__item-wrapper p-3 w-full">
                                        <Flex
                                          className="w-full"
                                          align={"center"}>
                                          <Flex vertical>
                                            <Typography.Title
                                              level={5}
                                              className="!mb-0">
                                              {capitalize(tempHotel.name)}
                                            </Typography.Title>
                                          </Flex>
                                        </Flex>
                                      </Radio>
                                    </Space>
                                  </div>
                                ) : (
                                  <Flex
                                    className="bg-[#FAFAFA] p-3 rounded cursor-pointer"
                                    align={"center"}
                                    onClick={() => {
                                      setTempHotel({
                                        id: uuid(),
                                        name: searchHotelText,
                                      });
                                    }}>
                                    <IconAdd />
                                    <Flex className="text-[14px]">
                                      <p className="text-[#1677FF] me-1">{t("Add")}</p>
                                      <p className="font-[600] me-1">{searchHotelText}</p> {t("as new hotel")}
                                    </Flex>
                                  </Flex>
                                )}
                              </>
                            ) : null}
                          </>
                        )}
                      </Radio.Group>
                    </div>
                  </Flex>
                </Flex>
              </Flex>
            </Modal>

            <Modal
              open={isEnterNewHotelModalOpen}
              footer={[
                <Flex gap={16}>
                  <Button
                    key="confirm"
                    type="primary"
                    className="w-[50%] h-12"
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsEnterNewHotelModalOpen(false);
                    }}>
                    {t("Back")}
                  </Button>
                  <Button
                    key="confirm"
                    type="primary"
                    className="w-[50%] h-12"
                    disabled={!!!tempHotel?.address}
                    onClick={() => {
                      setCurrentSelectedHotel(omit(tempHotel, ["id"]));
                      form.setFieldValue(["newHotel", "hotelName"], tempHotel?.name);
                      form.setFieldValue(["newHotel", "starRating"], tempHotel?.starRating);
                      form.setFieldValue(["newHotel", "hotelAddress"], tempHotel?.address);
                      form.setFieldValue(["newHotel", "hotelId"], null);
                      form.setFieldValue(["newHotel", "roomTypeId"], null);
                      setIsEnterNewHotelModalOpen(false);
                    }}>
                    {t("Complete Information")}
                  </Button>
                </Flex>,
              ]}>
              <Flex>
                <Typography.Title
                  level={4}
                  className="!text-[18px]">
                  {t("Recommend an alternative hotel")}
                </Typography.Title>
              </Flex>
              <Flex className="text-[14px] text-textSecondary">
                {t("Make sure every details are correct to give your customer a transparent information.")}
              </Flex>
              <Flex className="bg-[#FAFAFA] mt-5 p-3">
                <Typography.Title
                  level={5}
                  className="!mb-0">
                  {capitalize(tempHotel?.name)}
                </Typography.Title>
              </Flex>
              <Flex
                vertical
                className="mt-5">
                <Typography.Text className="mb-1 font-[500] text-[16px]">
                  {t("What is the full hotel address?")}
                </Typography.Text>
                <Input
                  placeholder={t("Enter hotel address")}
                  className="h-12"
                  value={tempHotel?.address}
                  onChange={(e) => {
                    setTempHotel((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }));
                  }}></Input>
              </Flex>
              <Flex
                vertical
                className="mt-5 mb-10">
                <Typography.Text className="mb-1 font-[500] text-[16px]">{t("Hotel stars")}</Typography.Text>
                <Rate
                  onChange={(e) => {
                    setTempHotel((prev) => ({
                      ...prev,
                      starRating: e,
                    }));
                  }}
                  allowHalf
                  allowClear
                />
              </Flex>
            </Modal>
          </>
        )}
      </Form>
    </AppCard>
  );
}

export default SelectRoomRate;
