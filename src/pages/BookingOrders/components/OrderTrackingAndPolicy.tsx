import { IconChecked, IconUnchecked } from "@/components/common/SvgIcon";
import { formatCurrencyCustom } from "@/utils/currency";
import { getTripStatusLabel } from "@/utils/tripStatus";
import { Divider, Flex, Rate, Typography } from "antd";
import dayjs from "dayjs";
import { get } from "lodash";
import { useMemo } from "react";
import { HotelBookingStatus, TripHotelBookingInfoDto } from "../../../../sdk/tmc";
import { useTranslation } from "react-i18next";
import AppCard from "@/components/common/AppCard";

interface IOrderTrackingAndPolicyProps {
  policy: TripHotelBookingInfoDto["hotelPolicy"];
  data?: TripHotelBookingInfoDto;
}

function OrderTrackingAndPolicy(props: IOrderTrackingAndPolicyProps) {
  const { policy, data } = props;

  const confirmedAt = useMemo(() => {
    const confirmedHistory = data?.hotelInfos?.[0]?.bookingHistories?.find(
      (his) => his.bookingStatus === HotelBookingStatus.NUMBER_15,
    );
    return confirmedHistory ? confirmedHistory?.createdOn : null;
  }, [data]);
  const { t } = useTranslation();

  return (
    <AppCard>
      <Typography.Text className="font-[500] text-lg">Track Order</Typography.Text>
      <Flex>
        <Flex vertical>
          <Flex className="mb-4 track-order__detail">
            <Flex
              className="w-[26px] min-w-[26px] h-[26px]"
              justify="center"
              align="center">
              <IconChecked />
            </Flex>
            <Flex vertical>
              <Typography.Text className="!text-[16px] text-textPrimary">
                {t("Trip request {{tripCode}} approved by {{approvedBy}}", {
                  tripCode: data?.tripCode,
                  approvedBy: data?.approvedBy,
                })}
              </Typography.Text>
              <time className="text-textDescription">
                {get(data, ["approveAt"]) ? dayjs(get(data, ["approveAt"])).format("hh:mA - ddd, MMM DD, YYYY") : ""}
              </time>
            </Flex>
          </Flex>
          <Flex className="mb-4 track-order__detail">
            <Flex
              className="w-[26px] min-w-[26px] h-[26px]"
              justify="center"
              align="center">
              <IconChecked />
            </Flex>
            <Flex vertical>
              <Typography.Text className="!text-[16px] text-textPrimary">
                {t("Booking order sent")} - {getTripStatusLabel(data?.status)}
              </Typography.Text>
              <time className="text-textDescription">
                {dayjs(data?.requestedAt).format("hh:mA - ddd, MMM DD, YYYY")}
              </time>
            </Flex>
          </Flex>
          <Flex className="mb-4 track-order__detail">
            <Flex
              className="w-[26px] min-w-[26px] h-[26px]"
              justify="center"
              align="center">
              {data?.bookingStatus === HotelBookingStatus.NUMBER_15 ? <IconChecked /> : <IconUnchecked />}
            </Flex>
            <Flex vertical>
              <Typography.Text className="!text-[16px] text-textPrimary">
                {t("Booking confirmed")} - {t("Complete")}
              </Typography.Text>
              <time className="text-textDescription">
                {confirmedAt ? dayjs(confirmedAt).format("hh:mm A -  ddd, MMM DD,YYYY") : "-"}
              </time>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Divider className="mt-5 mb-3"></Divider>
      <Typography.Text className="font-[500] text-lg">{t("Travel policy")}</Typography.Text>
      <Flex
        vertical
        className="mt-4">
        <Flex className="text-[16px]">{t("Maximum stars")}</Flex>
        <Flex>
          {policy?.maximumStar ? (
            <Rate
              allowHalf
              disabled
              defaultValue={policy && policy?.maximumStar ? policy.maximumStar : undefined}
              className="ms-0"
            />
          ) : (
            <Typography.Text className="mx-3 text-black/60 text-xs">{t("No settings")}</Typography.Text>
          )}
        </Flex>
      </Flex>
      <Flex
        vertical
        className="mt-4">
        <Flex className="text-[16px]">{t("Maximum budget")}</Flex>
        <Flex className="text-[16px] text-textSecondary">
          {formatCurrencyCustom(policy?.maximumBudget)} {t("(per night/ room)")}
        </Flex>
      </Flex>
      {/* <Flex
        vertical
        className="mt-4">
        <Flex className="text-[16px]">Total budget</Flex>
        <Flex className="text-[16px] text-textSecondary">$240.00 x nights</Flex>
      </Flex> */}
    </AppCard>
  );
}

export default OrderTrackingAndPolicy;
