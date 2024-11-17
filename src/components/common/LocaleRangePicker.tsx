import { ComponentProps } from "react";
import { ConfigProvider, DatePicker } from "antd";

import { useLanguage } from "@/store/useLanguage";

import localeEN from "antd/locale/en_US";
import localeVI from "antd/locale/vi_VN";

type Props = ComponentProps<typeof DatePicker.RangePicker>;

const LocaleRangePicker = ({ ...rest }: Props) => {
  const { language } = useLanguage();

  return (
    <ConfigProvider locale={language === "vi" ? localeVI : localeEN}>
      <DatePicker.RangePicker {...rest} />
    </ConfigProvider>
  );
};

export default LocaleRangePicker;
