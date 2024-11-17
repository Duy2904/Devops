import { Button, Col, Divider, Flex, Form, Image, Modal, Rate, Row, Tag, Typography } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import { get, isEmpty, toArray, toNumber } from "lodash";
import { Loader } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import { TripHotelInfoDto } from "sdk/tmc";

import { HotelBookingStatus } from "@/components/booking/StatusBooking";
import { PermissionWrapper } from "@/components/permissions/PermissionWrapper";
import { Permissions } from "@/constant/permission-list";
import {
  IUpdateReservationRequest,
  useConfirmUpdateBookingOrder,
} from "@/query-hooks/queries/booking/confirmBookingOrder";
import { useGetBookingDetail } from "@/query-hooks/queries/booking/getBookingDetail";
import { formatCurrencyCustom } from "@/utils/currency";
import { adjustDateToUTC } from "@/utils/time";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

import ContactInformation from "./components/ContactInformation";
import OrderCurrentHotelInformation from "./components/OrderCurrentHotelInformation";
import SummaryInformation from "./components/OrderSummaryInformation";
import OrderTrackingAndPolicy from "./components/OrderTrackingAndPolicy";
import SelectRoomRate, { SELECT_ROOM_RATE } from "./components/SelectRoomRate";
import Overlay from "@/components/common/Overlay";

function BookingOrderDetail() {
  const { bookingOrderId } = useParams();
  const { t } = useTranslation();

  const { data: bookingDetailData, isLoading, isFetching } = useGetBookingDetail(bookingOrderId);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isDirty, setIsDirty] = useState(false);

  const { mutateAsync: confirmBookingOrderAsync, isLoading: isConfirmBookingOrderLoading } =
    useConfirmUpdateBookingOrder();

  const handleCheckDirty = () => {
    const currentFields = Object.keys(form.getFieldsValue());
    const isDirty = currentFields.some((field) => form.isFieldTouched(field));
    setIsDirty(isDirty);
  };

  // Block navigating elsewhere when data has been entered into the input
  const blocker = useBlocker(() => {
    return isDirty;
  });

  const onExitHandler = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if ((bookingDetailData?.bookingStatus as number) < HotelBookingStatus.Confirmed && isDirty)
      window.addEventListener("beforeunload", onExitHandler);
    return () => {
      window.removeEventListener("beforeunload", onExitHandler);
    };
  }, [isDirty, bookingDetailData]);

  const onConfirmHandler = async () => {
    if (toNumber(bookingDetailData?.bookingStatus) < 15) {
      const formData = form.getFieldsValue();
      const fileInput = document.getElementById("dropzone-file") as HTMLInputElement;

      // handle add offset utc
      const reservationDate = get(formData, ["reservationDate"]);
      const adjustedReservationDate = adjustDateToUTC(reservationDate);

      let data: IUpdateReservationRequest = {
        id: get(bookingDetailData, ["id"], "") as string,
        tripId: get(bookingDetailData, ["hotelInfos", "0", "tripInfoId"], "") as string,
        tripHotelId: get(bookingDetailData, ["hotelInfos", "0", "id"]) as string,
        reservationCode: get(formData, ["reservationNumber"]) as string,
        reservationDate: get(formData, ["reservationDate"]) ? adjustedReservationDate.toDate() : undefined,
        note: get(formData, ["note"]) as string,
        tourCode: get(formData, ["tourCode"]),
        files: toArray(fileInput?.files ?? []),
      };

      if (formData.selectRoomRateType === SELECT_ROOM_RATE.MODIFY) {
        const roomTypeId = get(formData, ["modifyHotel", "roomTypeId"]);
        const newRoomPrice = get(formData, ["modifyHotel", "roomPrice"]);
        const newTax = get(formData, ["modifyHotel", "roomTax"]);
        const newServiceFee = get(formData, ["modifyHotel", "serviceFee"]);

        if (!!newRoomPrice) {
          data["newRoomPrice"] = newRoomPrice;
        }
        if (!!get(formData, ["modifyHotel", "roomTax"])) {
          data["newTax"] = newTax;
        }
        if (!!get(formData, ["modifyHotel", "serviceFee"])) {
          data["newServiceFee"] = newServiceFee;
        }
        data["roomTypeId"] = roomTypeId;
      } else if (formData.selectRoomRateType === SELECT_ROOM_RATE.NEW) {
        // Add new hotel
        const newRoomPrice = get(formData, ["newHotel", "roomPrice"]);
        const newTax = get(formData, ["newHotel", "roomTax"]);
        const newServiceFee = get(formData, ["newHotel", "serviceFee"]);

        if (!!newRoomPrice) {
          data["newRoomPrice"] = newRoomPrice;
        }
        if (!!newTax) {
          data["newTax"] = newTax;
        }
        if (!!newServiceFee) {
          data["newServiceFee"] = newServiceFee;
        }

        if (!isEmpty(get(formData, ["newHotel", "hotelName"]))) {
          data["roomTypeName"] = get(formData, ["newHotel", "roomName"]);
          data["hotelName"] = get(formData, ["newHotel", "hotelName"]);
          data["starRating"] = get(formData, ["newHotel", "starRating"]);
          data["hotelAddress"] = get(formData, ["newHotel", "hotelAddress"]);
        } else {
          const roomTypeId = get(formData, ["newHotel", "roomTypeId"]);
          data["roomTypeId"] = roomTypeId;
          data["hotelId"] = get(formData, ["newHotel", "hotelId"]);
        }
      }
      await confirmBookingOrderAsync(data);
      setIsConfirmModalOpen(false);
    }
  };

  const isBookingConfirmButtonDisable = useMemo(() => {
    if (!bookingDetailData) return true;
    if (toNumber(bookingDetailData?.bookingStatus) < 15) {
      return false;
    }
    return true;
  }, [bookingDetailData, bookingDetailData?.bookingStatus, isLoading]);

  const collapseItem = bookingDetailData?.hotelInfos
    ?.filter((hotel) => {
      return (hotel.status ?? 15) > 15;
    })
    .map((hotel) => {
      return (
        <>
          <Row gutter={52}>
            <Col
              span={24}
              className="mb-1">
              <Tag className="bg-[#DEDEDE] text-[#192E6E] text-[14px]">{t("Recommended an alternative hotel")}</Tag>
            </Col>
            <Col
              className="text-description"
              span={24}>
              <Flex
                className="w-full"
                gap={20}>
                <Flex
                  flex={16}
                  vertical>
                  <Flex className="w-full">
                    <Typography.Text className="font-[500] text-[16px]">{hotel.hotelName}</Typography.Text>
                  </Flex>
                  <Flex className="w-full">
                    <Flex
                      className="text-[16px] text-textSecondary"
                      flex={2}>
                      Hotel stars:{" "}
                    </Flex>
                    <Flex
                      className="text-[16px] text-textSecondary"
                      flex={5}>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={bookingDetailData?.starRating}
                        className="ms-0"
                      />
                    </Flex>
                  </Flex>
                  <Flex className="w-full">
                    <Flex
                      className="text-[16px] text-textSecondary"
                      flex={2}>
                      {t("Hotel location")}:
                    </Flex>
                    <Flex
                      className="text-[16px] text-textSecondary"
                      flex={5}>
                      {hotel.hotelAddress}
                    </Flex>
                  </Flex>
                </Flex>
                <Flex flex={8}>
                  <Flex className="w-full">
                    <Image
                      src={get(hotel, ["rooms", "0", "mediaFileUrl"])}
                      className="rounded aspect-[274/136] object-cover"></Image>
                  </Flex>
                </Flex>
              </Flex>
            </Col>
          </Row>
          <Divider className="my-3" />
          <Row gutter={52}>
            {get(hotel, ["rooms"], []).map((room) => {
              let nightQuantityString = "";
              const night = dayjs(hotel.checkout).diff(dayjs(hotel.checkin), "day");
              if (night > 1) {
                nightQuantityString = `${night} nights`;
              } else {
                nightQuantityString = `${night} night`;
              }
              return (
                <Col
                  className="text-description"
                  span={24}
                  key={room.roomTypeId}>
                  <Flex
                    gap={20}
                    className="w-full">
                    <Flex
                      vertical
                      flex={16}>
                      <Typography.Text className="font-[500] text-[16px]">
                        {get(hotel, ["rooms"], []).length} x {room?.name}
                      </Typography.Text>

                      <Flex
                        vertical
                        className={"w-full"}>
                        <Flex>
                          <Flex
                            className="text-[16px] text-textSecondary"
                            flex={2}>
                            {t("Estimated price")}
                          </Flex>
                          <Flex
                            className="text-[16px] text-textSecondary"
                            flex={5}>
                            {formatCurrencyCustom(room.roomPrices)} x {nightQuantityString}
                          </Flex>
                        </Flex>
                        <Flex>
                          <Flex
                            className="text-[16px] text-textSecondary"
                            flex={2}>
                            Service fee
                          </Flex>
                          <Flex
                            className="text-[16px] text-textSecondary"
                            flex={5}>
                            {formatCurrencyCustom(room.serviceFee)} x {nightQuantityString}
                          </Flex>
                        </Flex>
                        <Flex>
                          <Flex
                            className="text-[16px] text-textSecondary"
                            flex={2}>
                            {t("Total price")}
                          </Flex>
                          <Flex
                            className="text-[16px] text-textSecondary"
                            flex={5}>
                            {formatCurrencyCustom((Number(room?.roomPrices) + Number(room?.serviceFee) || 0) * night)}
                          </Flex>
                        </Flex>
                      </Flex>
                      <Divider className="my-3" />
                      <Flex vertical>
                        <Flex className="w-full text-[16px] text-textSecondary">{t("Notice message")}</Flex>
                        <Flex className="w-full text-[16px] text-textSecondary">{hotel.note}</Flex>
                      </Flex>
                    </Flex>
                    <Flex flex={8}>
                      <div className="hidden"></div>
                    </Flex>
                  </Flex>
                </Col>
              );
            })}
          </Row>
        </>
      );
    });

  const [isShowHistory, setIsShowHistory] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  if (isFetching || bookingDetailData == undefined) return <Overlay />;

  return (
    <Flex
      vertical
      className="w-full">
      <Flex className="flex-col mb-3 xl:flex-row">
        <Typography.Title
          level={1}
          className="!text-lg xl:!text-[30px]">
          {t("Booking order from {{value}}", {
            value: bookingDetailData?.employee?.displayName,
          })}
        </Typography.Title>
        <Flex className="ms-auto">
          <Button
            type={"text"}
            className="h-10"
            onClick={() => {
              navigate(-1);
            }}>
            {t("Cancel")}
          </Button>
          <PermissionWrapper permission={Permissions.TripRequestInfoUpdate}>
            <Button
              className="h-10 ms-3 rounded-xl"
              disabled={isBookingConfirmButtonDisable}
              onClick={() => {
                setIsConfirmModalOpen(true);
              }}
              type="primary">
              {t("Confirm reservation")}
            </Button>
          </PermissionWrapper>
          <Modal
            styles={{
              content: {
                width: 415,
                padding: 32,
                display: "flex",
              },
            }}
            footer={[]}
            open={isConfirmModalOpen}
            onCancel={() => {
              setIsConfirmModalOpen(false);
            }}>
            <Flex
              vertical
              align={"center"}
              className="text-center">
              <Typography.Text className={"text-[18px] font-semibold"}>
                {t("Confirm Hotel Reservation")}
              </Typography.Text>
              <div className="text-textSecondary">
                {t(
                  "Please make sure all details are correct. Once confirmed, we will send your reservation information to the customer for check-in.",
                )}
              </div>
              <Flex
                gap={16}
                className="w-full mt-4">
                <Flex flex={6}>
                  <Button
                    type="default"
                    className="w-full"
                    onClick={() => {
                      setIsConfirmModalOpen(false);
                    }}>
                    {t("Cancel")}
                  </Button>
                </Flex>
                <PermissionWrapper permission={Permissions.TripRequestInfoUpdate}>
                  <Flex flex={6}>
                    <Button
                      type="primary"
                      className="w-full flex gap-2 items-center"
                      disabled={isConfirmBookingOrderLoading}
                      onClick={onConfirmHandler}>
                      {isConfirmBookingOrderLoading && <Loader className="animate-spin mr-2" />}
                      {t("Confirm reservation")}
                    </Button>
                  </Flex>
                </PermissionWrapper>
              </Flex>
            </Flex>
          </Modal>
        </Flex>
      </Flex>
      <Flex
        vertical
        className="px-0">
        <SummaryInformation data={bookingDetailData} />

        <Row
          gutter={24}
          className="mt-6">
          <Col
            span={24}
            xl={16}>
            <OrderCurrentHotelInformation data={bookingDetailData} />

            {toNumber(bookingDetailData?.bookingStatus) < 15 ? (
              <SelectRoomRate
                data={bookingDetailData}
                form={form}
                onCheckDirty={handleCheckDirty}
              />
            ) : (
              <>
                {(get(bookingDetailData, ["hotelInfos"], []) as TripHotelInfoDto[]).length > 1 ? (
                  <Flex
                    vertical
                    className="bg-greyCustom01 mt-5 p-5 rounded-[16px] w-full">
                    <Flex
                      className="w-full cursor-pointer"
                      justify={"space-between"}
                      align={"center"}
                      onClick={() => {
                        setIsShowHistory((prev) => !prev);
                      }}>
                      {t("Booking History")}
                      <Flex className="text-textPrimary">
                        {isShowHistory ? t("View less") : t("View more")}
                        {isShowHistory ? <UpOutlined className="ms-2" /> : <DownOutlined className="ms-2" />}
                      </Flex>
                    </Flex>
                    <Flex
                      vertical
                      className={classNames({
                        hidden: !isShowHistory,
                        "": isShowHistory,
                      })}>
                      <Divider className="my-3"></Divider>
                      {collapseItem}
                    </Flex>
                  </Flex>
                ) : null}
              </>
            )}
          </Col>
          <Col
            span={24}
            xl={8}>
            <OrderTrackingAndPolicy
              policy={bookingDetailData?.hotelPolicy}
              data={bookingDetailData}
            />
            <ContactInformation
              employee={bookingDetailData?.employee}
              contact={bookingDetailData?.hotelInfos?.[0]?.guests?.[0]}
            />
          </Col>
        </Row>
      </Flex>
      <Modal
        style={{ maxWidth: 350 }}
        centered
        footer={[]}
        open={blocker.state === "blocked"}
        closable
        closeIcon={<CloseOutlined onClick={() => blocker?.reset?.()} />}>
        <Flex
          vertical
          justify="center"
          align={"center"}
          className="w-full text-center">
          <Typography.Text className={"text-[18px] font-semibold"}>{t("Discard all changes?")}</Typography.Text>
          <div className="text-textSecondary">
            {t("You have unsaved changes. All unsaved progress will be lost if you discard all changes.")}
          </div>
          <Flex
            gap={16}
            className="w-full mt-4">
            <Flex flex={6}>
              <Button
                type={"primary"}
                danger
                className="w-full"
                onClick={() => {
                  blocker?.proceed?.();
                }}>
                {t("Discard changes")}
              </Button>
            </Flex>
            <Flex flex={6}>
              <Button
                type="default"
                className="w-full"
                onClick={() => {
                  blocker?.reset?.();
                }}>
                {t("Continue progress")}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  );
}

export default BookingOrderDetail;
