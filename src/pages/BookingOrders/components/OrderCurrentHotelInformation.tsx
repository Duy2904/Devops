import { Button, Col, Divider, Flex, Image, Rate, Row, Spin, Typography } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import { TripHotelBookingInfoDto } from "sdk/tmc";

import AppCard from "@/components/common/AppCard";
import { IconDownload } from "@/components/common/SvgIcon";
import { formatCurrencyCustom } from "@/utils/currency";
import { get } from "lodash";

interface IOrderCurrentHotelInformationProps {
  data: TripHotelBookingInfoDto | null | undefined;
}

function OrderCurrentHotelInformation(props: IOrderCurrentHotelInformationProps) {
  const { data } = props;
  // # hooks
  const { t } = useTranslation();

  // # computed values
  const numOfRooms = get(data, "hotelInfos[0].numberOfRooms", 1) || 1;
  const numOfAdults = get(data, "hotelInfos[0].adults", 1) || 1;
  const numOfChildren = get(data, "hotelInfos[0].children.length", 0);

  if (!data)
    return (
      <Spin
        spinning
        fullscreen
      />
    );

  return (
    <>
      {data &&
        data.hotelInfos
          ?.filter((hotel) => (hotel?.status ?? 0) <= 15)
          ?.map((hotel) => {
            return (
              <Fragment key={hotel.id}>
                <AppCard>
                  <Flex
                    gap={16}
                    className="2xl:flex-row flex-col gap-6 justify-between">
                    <div className="2xl:w-2/3">
                      <Typography.Title level={4}>{hotel.hotelName}</Typography.Title>

                      <Flex className="flex-wrap lg:flex-nowrap w-full">
                        <Flex
                          className="flex-1 text-[16px] text-[#6A6A6A] basis-[100%] lg:basis-[140px]"
                          flex={"0 0 140px"}>
                          {t("Hotel stars")}:{" "}
                        </Flex>
                        <Flex
                          className="text-[16px] text-textSecondary"
                          flex="auto">
                          <Rate
                            disabled
                            allowHalf
                            defaultValue={data?.starRating}
                            className="ms-0"
                          />
                        </Flex>
                      </Flex>
                      {/* <Flex className="flex-wrap lg:flex-nowrap w-full">
                        <Flex
                          className="flex-1 text-[16px] text-textSecondary basis-[100%] lg:basis-[140px]"
                          flex={"0 0 140px"}>
                          Hotel ID number:
                        </Flex>
                        <Flex
                          className="text-[16px] text-textSecondary"
                          flex={"auto"}>
                          {hotel.id}
                        </Flex>
                      </Flex> */}
                      <Flex className="flex-wrap lg:flex-nowrap w-full mt-2">
                        <Flex
                          className="flex-1 text-[16px] text-[#6A6A6A] basis-[100%] lg:basis-[140px]"
                          flex={"0 0 140px"}>
                          {t("Hotel location")}:
                        </Flex>
                        <Flex
                          className="text-[16px] text-textSecondary"
                          flex={"auto"}>
                          {hotel.hotelAddress}
                        </Flex>
                      </Flex>
                    </div>
                    <div className="2xl:w-1/3">
                      <Flex className="w-full">
                        <Image
                          src={hotel.rooms && hotel.rooms[0] ? hotel.rooms[0]?.mediaFileUrl : ""}
                          className="rounded-xl w-full aspect-[274/136] object-cover"
                        />
                      </Flex>
                    </div>
                  </Flex>
                </AppCard>

                {hotel.rooms
                  ? hotel.rooms.map((room) => {
                      let nightQuantityString = "";
                      const night = dayjs(hotel.checkout).diff(dayjs(hotel.checkin), "day");
                      if (night > 1) {
                        nightQuantityString = `${night} nights`;
                      } else {
                        nightQuantityString = `${night} night`;
                      }
                      return (
                        <AppCard
                          key={room.code}
                          className="mt-6">
                          <Row gutter={24}>
                            <Col className="w-1/2">
                              <Flex
                                className="bg-bg01 p-4 rounded-xl"
                                vertical>
                                <Typography.Text className="font-[600] text-[#192E6E] text-[16px]">
                                  {numOfRooms} x {room.name}
                                </Typography.Text>
                                <Typography.Text className="text-[16px] text-textSecondary">
                                  {t("Price details")}
                                </Typography.Text>
                                <Flex
                                  vertical
                                  className={"w-full"}>
                                  <Flex>
                                    <Flex
                                      className="text-[16px] text-textSecondary"
                                      flex={5}>
                                      {t("Estimated price")}
                                    </Flex>
                                    <Flex
                                      className="text-[16px] text-textSecondary"
                                      flex={8}>
                                      {formatCurrencyCustom(room.roomPrices)} x {nightQuantityString}
                                    </Flex>
                                  </Flex>
                                  <Flex>
                                    <Flex
                                      className="text-[16px] text-textSecondary"
                                      flex={5}>
                                      {t("Service fee")}
                                    </Flex>
                                    <Flex
                                      className="text-[16px] text-textSecondary"
                                      flex={8}>
                                      {formatCurrencyCustom(room.serviceFee)} x {nightQuantityString}
                                    </Flex>
                                  </Flex>
                                  <Flex>
                                    <Flex
                                      className="text-[16px] text-textSecondary"
                                      flex={5}>
                                      {t("Total price")}
                                    </Flex>
                                    <Flex
                                      className="text-[16px] text-textSecondary"
                                      flex={8}>
                                      {formatCurrencyCustom(
                                        ((room?.roomPrices ?? 0) + (room?.serviceFee ?? 0)) * night,
                                      )}
                                    </Flex>
                                  </Flex>
                                </Flex>
                                <Divider className="my-2"></Divider>
                                <Flex
                                  vertical
                                  className={"w-full"}>
                                  <Typography.Text>
                                    {t(
                                      "Room size: {{roomSize}} | Maximum {{maxAdt}} adults | Maximum {{maxChd}} children",
                                      {
                                        roomSize: room.area || 0,
                                        maxAdt: room.maxAdt,
                                        maxChd: room.maxChd,
                                      },
                                    )}
                                  </Typography.Text>
                                  {(data.bookingStatus ?? 0) === 15 ? (
                                    <a
                                      className="mt-4"
                                      href="/images/myw3schoolsimage.jpg"
                                      download>
                                      <Button className="flex items-center border-[#1677FF] text-[#1677FF]">
                                        <IconDownload className="me-2"></IconDownload> {t("Download Reservation files")}
                                      </Button>
                                    </a>
                                  ) : null}
                                </Flex>
                              </Flex>
                            </Col>
                            <Col className="w-1/2">
                              <Flex vertical>
                                <Typography.Title
                                  className="!mb-0 !text-lg text-textPrimary"
                                  level={5}>
                                  {t("Booking request")}
                                </Typography.Title>
                                {(data?.bookingStatus ?? 0) === 15 ? (
                                  <>
                                    <Flex
                                      vertical
                                      className="mt-2">
                                      <Typography.Text className="text-[16px] text-textSecondary">
                                        {t("Reservation number")}
                                      </Typography.Text>
                                      <Typography.Text className="text-[16px] text-textSecondary">
                                        {hotel.reservationCode || "--"}
                                      </Typography.Text>
                                    </Flex>
                                    <Flex
                                      vertical
                                      className="mt-2">
                                      <Typography.Text className="text-[16px] text-textSecondary">
                                        {t("Reservation date")}
                                      </Typography.Text>
                                      <Typography.Text className="text-[16px] text-textSecondary">
                                        {hotel?.reservationDate
                                          ? dayjs(hotel.reservationDate).format("DD/MM/YYYY")
                                          : "--"}
                                      </Typography.Text>
                                    </Flex>
                                  </>
                                ) : null}

                                <Flex
                                  vertical
                                  className="mt-2">
                                  <Typography.Text className="text-[16px] text-textSecondary">
                                    {t("Check-in & out")}
                                  </Typography.Text>
                                  <Typography.Text className="text-[16px] text-textSecondary">
                                    {dayjs(hotel.checkin).format("ddd, MMM DD")}
                                    {" - "}
                                    {dayjs(hotel.checkout).format("ddd, MMM DD, YYYY")}
                                  </Typography.Text>
                                </Flex>
                                <Flex
                                  vertical
                                  className="mt-2">
                                  <Typography.Text className="text-[16px] text-textSecondary">
                                    {t("Room & Guest")}
                                  </Typography.Text>
                                  <Typography.Text className="text-[16px] text-textSecondary">
                                    {t("{{adt}} Adult, {{child}} Children, {{room}} room", {
                                      adt: numOfAdults,
                                      child: numOfChildren,
                                      room: numOfRooms,
                                    })}
                                  </Typography.Text>
                                </Flex>
                                <Flex
                                  vertical
                                  className="mt-2">
                                  <Typography.Text className="text-[16px] text-textSecondary">
                                    {t("Notice message")}
                                  </Typography.Text>
                                  <Typography.Text className="text-[16px] text-textSecondary">
                                    {hotel.note}
                                  </Typography.Text>
                                </Flex>
                              </Flex>
                            </Col>
                          </Row>
                        </AppCard>
                      );
                    })
                  : null}
              </Fragment>
            );
          })}
    </>
  );
}

export default OrderCurrentHotelInformation;
