import { Card, Flex, Typography } from "antd";
import dayjs from "dayjs";

import { HotelBookingStatus, StatusBooking } from "@/components/booking/StatusBooking";
import { formatCurrencyCustom } from "@/utils/currency";
import { getTripStatusLabel } from "@/utils/tripStatus";

import { IBookingDetailProps } from "../type";
import { useTranslation } from "react-i18next";

interface iSummaryInformationProps extends IBookingDetailProps {}

function SummaryInformation(props: iSummaryInformationProps) {
  const { data } = props;
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
      <Card className="rounded-[8px] h-full">
        <Flex
          vertical
          align={"flex-start"}>
          <Typography.Text className="text-[16px] text-textPrimary">{t("Booking order status")}</Typography.Text>
          <div className="mt-1">
            <StatusBooking bookingStatus={data?.bookingStatus as number}></StatusBooking>
          </div>
        </Flex>
      </Card>
      <Card className="rounded-[8px] h-full">
        <Flex
          vertical
          align={"flex-start"}>
          <Typography.Text className="text-[16px] text-textPrimary">{t("Requested at")}</Typography.Text>
          <Typography.Text className="mt-1 font-medium text-[16px] text-textSecondary">
            {dayjs(data?.requestedAt).format("hh:mmA - DD/MM/YYYY")}
          </Typography.Text>
        </Flex>
      </Card>
      <Card className="rounded-[8px] h-full">
        <Flex
          vertical
          align={"flex-start"}>
          <Typography.Text className="text-[16px] text-textPrimary">
            {[HotelBookingStatus.Confirmed, HotelBookingStatus.Expired].includes(data?.bookingStatus as number)
              ? t("Total price")
              : t("Estimated price")}
          </Typography.Text>
          <Typography.Text className="mt-1 font-medium text-[16px] text-textSecondary">
            {formatCurrencyCustom((data?.bookingStatus ?? 0) <= 15 ? data?.estimatedPrice : data?.totalPrice)}
          </Typography.Text>
        </Flex>
      </Card>
      <Card className="rounded-[8px] h-full">
        <Flex
          vertical
          align={"flex-start"}>
          <Typography.Text className="text-[16px] text-textPrimary">{t("Trip ID & Status")}</Typography.Text>

          <Flex
            align="center"
            gap={8}
            className="flex-wrap mt-1">
            <Typography.Text className="flex-shrink-0 font-medium text-base text-textSecondary">
              {data?.tripCode}
            </Typography.Text>
            <div className="text-base px-1 py-[1px] text-[#6A6A6A] bg-[#EEEEEE] rounded">
              {t(getTripStatusLabel(data?.status))}
            </div>
          </Flex>
        </Flex>
      </Card>
      <Card className="rounded-[8px] h-full">
        <Flex
          vertical
          align={"flex-start"}>
          <Typography.Text className="text-[16px] text-textPrimary">{t("Corporation")}</Typography.Text>
          <Typography.Text className="mt-1 font-medium text-[16px] text-textSecondary">
            {data?.corpName}
          </Typography.Text>
        </Flex>
      </Card>
    </div>
  );
}

export default SummaryInformation;
