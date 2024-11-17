import i18n from "@/i18n";
import { findIndex, isNil } from "lodash";

export const DRAFT = i18n.t("Draft");
export const DRAFT_VALUE = 0;
export const BOOKER_DRAFT = i18n.t("Booker Draft");
export const BOOKER_DRAFT_VALUE = 10;

export const AWAITING_APPROVAL = i18n.t("Awaiting Approval");
export const AWAITING_APPROVAL_VALUE = 15;

export const REJECTED = i18n.t("Rejected");
export const REJECTED_VALUE = 20;

export const APPROVED = i18n.t("Approved");
export const APPROVED_VALUE = 25;

export const AWAITING_CONFIRM = i18n.t("Awaiting Confirm");
export const AWAITING_CONFIRM_VALUE = 30;
export const NEED_CONFIRM = i18n.t("Need Confirm");
export const NEED_CONFIRM_VALUE = 35;
export const SCHEDULED = i18n.t("Scheduled");
export const SCHEDULED_VALUE = 40;
export const ADJUST = i18n.t("Adjust");
export const ADJUST_VALUE = 45;
export const RECHECK_PRICE = i18n.t("Recheck Price");
export const RECHECK_PRICE_VALUE = 50;
export const ON_GOING = i18n.t("On going");
export const ON_GOING_VALUE = 55;
export const FINISHED = i18n.t("Finished");
export const FINISHED_VALUE = 60;
export const CANCELED = i18n.t("Canceled");
export const CANCELED_VALUE = 65;

export const TRIP_REQUEST_STATUS = [
  DRAFT,
  BOOKER_DRAFT,
  AWAITING_APPROVAL,
  REJECTED,
  APPROVED,
  AWAITING_CONFIRM,
  NEED_CONFIRM,
  SCHEDULED,
  ADJUST,
  RECHECK_PRICE,
  ON_GOING,
  FINISHED,
  CANCELED,
];
export const TRIP_REQUEST_VALUE_STATUS = [
  DRAFT_VALUE,
  BOOKER_DRAFT_VALUE,
  AWAITING_APPROVAL_VALUE,
  REJECTED_VALUE,
  APPROVED_VALUE,
  AWAITING_CONFIRM_VALUE,
  NEED_CONFIRM_VALUE,
  SCHEDULED_VALUE,
  ADJUST_VALUE,
  RECHECK_PRICE_VALUE,
  ON_GOING_VALUE,
  FINISHED_VALUE,
  CANCELED_VALUE,
];
export const textOnStatusTripHorizontalBar = [
  "All",
  "On-Going",
  "Scheduled",
  "Awaiting-Approval",
  "Draft",
  "Approved",
  "Rejected",
  "Finished",
];

export const TRAVELER_VISIBLE_TRIP_REQUEST_STATUS = [
  AWAITING_APPROVAL_VALUE,
  APPROVED_VALUE,
  REJECTED_VALUE,
  AWAITING_CONFIRM_VALUE,
  NEED_CONFIRM_VALUE,
  SCHEDULED_VALUE,
  ADJUST_VALUE,
  RECHECK_PRICE_VALUE,
  ON_GOING_VALUE,
  FINISHED_VALUE,
  CANCELED_VALUE,
];

export const TRIP_MODAL_SELECT_FLIGHT_STEP = {
  DEPARTURE: "departure",
  DESTINATION: "destination",
  DEPART_DATE: "departDate",
  PASSENGER: "passenger",
  DEPART_AIRLINE: "departAirline",
  DEPART_SEAT_CLASS: "departSeatclass",
  RETURN_AIRLINE: "returnAirline",
  RETURN_SEAT_CLASS: "returnSeatclass",
  AIRLINE: "airline",
  SEAT_CLASS: "seatClass",
};

export const getTripStatusLabel = (tripStatus: number | undefined) => {
  if (isNil(tripStatus)) {
    return "";
  }
  const statusIndex = findIndex(TRIP_REQUEST_VALUE_STATUS, (s) => s === tripStatus);
  return TRIP_REQUEST_STATUS[statusIndex];
};
