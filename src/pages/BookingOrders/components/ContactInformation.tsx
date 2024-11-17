import { Divider, Flex, Typography } from "antd";
import { useMemo } from "react";
import { HotelGuestDto, TripHotelBookingInfoDto } from "sdk/tmc";
import { Luggage } from "lucide-react";
import { useTranslation } from "react-i18next";
import AppCard from "@/components/common/AppCard";
interface IContactInformationProps {
  employee: TripHotelBookingInfoDto["employee"];
  contact?: HotelGuestDto;
}

const { Text } = Typography;
function ContactInformation(props: IContactInformationProps) {
  const { employee, contact } = props;
  const { t } = useTranslation();

  const isTravelerBooking = useMemo(() => {
    return employee?.email == contact?.email;
  }, [props]);

  return (
    <AppCard className="mt-6">
      <Flex vertical>
        <Typography.Text className="font-[500] text-lg">{t("Contact information")}</Typography.Text>

        <Flex>
          <Flex
            className="p-1 rounded"
            style={{
              background: "linear-gradient(90deg, #00A9BD 0%, #1677FF 54%)",
            }}
            align="center">
            <Luggage
              size={18}
              color="white"
            />
            <Text className="flex-1 pl-2 text-sm text-white">
              {isTravelerBooking ? t("Booking for traveler") : t("Booking for another guest")}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {!isTravelerBooking ? (
        <>
          <Flex vertical>
            <Flex
              vertical
              className="mt-4">
              <Flex className="text-[16px]">{t("First & last name")}</Flex>
              <Flex className="text-[16px] text-textSecondary">
                {contact?.lastName} {contact?.firstMiddleName}
              </Flex>
            </Flex>
            <Flex
              vertical
              className="mt-4">
              <Flex className="text-[16px]">{t("Email address")}</Flex>
              <Flex className="text-[16px] text-textSecondary">{contact?.email}</Flex>
            </Flex>
            <Flex
              vertical
              className="mt-4">
              <Flex className="text-[16px]">{t("Phone number")}</Flex>
              <Flex className="text-[16px] text-textSecondary">{contact?.phone}</Flex>
            </Flex>
          </Flex>
          <Divider />
        </>
      ) : null}
      {employee ? (
        <>
          {!isTravelerBooking && (
            <Flex className={contact ? "'mt-3'" : ""}>
              <Typography.Text className="font-[500] text-[#192E6E] text-[16px]">
                {t("Employee contact")}
              </Typography.Text>
            </Flex>
          )}
          <Flex vertical>
            <Flex
              vertical
              className="mt-4">
              <Flex className="text-[16px] text-[#6A6A6A]">{t("First & last name")}</Flex>
              <Flex className="text-[16px] text-textSecondary">{employee?.fullName}</Flex>
            </Flex>
            <Flex
              vertical
              className="mt-4">
              <Flex className="text-[16px] text-[#6A6A6A]">{t("Email address")}</Flex>
              <Flex className="text-[16px] text-textSecondary">{employee?.email}</Flex>
            </Flex>
            <Flex
              vertical
              className="mt-4">
              <Flex className="text-[16px] text-[#6A6A6A]">{t("Phone number")}</Flex>
              <Flex className="text-[16px] text-textSecondary">{employee?.phoneNumber}</Flex>
            </Flex>
          </Flex>
        </>
      ) : null}
    </AppCard>
  );
}

export default ContactInformation;
