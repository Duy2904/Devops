import { Flex } from "antd";
import { useTranslation } from "react-i18next";

import { IconCheck } from "@/components/common/SvgIcon";
import { CloseCircleFilled, InfoCircleFilled, WarningFilled } from "@ant-design/icons";

type ToastItemProps = {
  type: "success" | "error" | "warning" | "info";
  content: JSX.Element;
  icon?: JSX.Element; // Added the 'icon' property as optional
  headingTitle?: string;
};

const toastTextVariant = {
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Info",
};

const toastIconVariant = {
  success: <IconCheck className="text-[#389E0D]" />,
  error: <CloseCircleFilled className="text-[#F5222D]" />,
  warning: <WarningFilled className="text-[#FFA940]" />,
  info: <InfoCircleFilled className="text-[#0052CC]" />,
};

const ToastItem = ({ type, content, icon, headingTitle }: ToastItemProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      flex={1}
      align="start"
      gap={10}>
      {icon ? icon : toastIconVariant[type]}
      <Flex className="flex-col w-full">
        <p className="leading-5 text-base font-medium text-[#1F1F1F]">
          {headingTitle ? headingTitle : t(toastTextVariant[type])}
        </p>
        <Flex
          align="center"
          className="w-full mt-2">
          {content}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ToastItem;
