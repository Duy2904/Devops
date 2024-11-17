import { ComponentProps } from "react";
import { ConfigProvider, DatePicker } from "antd";

import { useLanguage } from "@/store/useLanguage";

import localeEN from "antd/locale/en_US";
import localeVI from "antd/locale/vi_VN";

type DatePickerProps = ComponentProps<typeof DatePicker>;

const LocaleDatePicker = ({ ...rest }: DatePickerProps) => {
  const { language } = useLanguage();

  return (
    <ConfigProvider locale={language === "vi" ? localeVI : localeEN}>
      <DatePicker {...rest} />
    </ConfigProvider>
  );
};

export default LocaleDatePicker;
