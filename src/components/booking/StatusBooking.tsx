import { Tag } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export enum HotelBookingStatus {
  OnRequest = 0,
  Hold = 5,
  BookingFailure = 10,
  Confirmed = 15,
  ConfirmedFailure = 20,
  Expired = 25,
}

type StatusBookingProps = {
  bookingStatus: HotelBookingStatus;
};
export const StatusBooking: React.FC<StatusBookingProps> = ({ bookingStatus }) => {
  const { t } = useTranslation();
  return (
    <>
      {[HotelBookingStatus.OnRequest, HotelBookingStatus.Hold].includes(bookingStatus) && (
        <Tag
          color="blue"
          className="px-3 py-[2px] text-sm rounded-md">
          {t("On Request")}
        </Tag>
      )}
      {[HotelBookingStatus.Confirmed, HotelBookingStatus.Expired].includes(bookingStatus) && (
        <Tag
          color="green"
          className="px-3 py-[2px] text-sm rounded-md">
          {t("Confirmed")}
        </Tag>
      )}
    </>
  );
};
