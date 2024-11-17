import "dayjs/locale/vi";
import "dayjs/locale/en";

import dayjs from "dayjs";

export const dayjsSetup = () => {
  dayjs.locale("vi");
};

export const setDayjsLocale = (lang: "vi" | "en") => {
  dayjs.locale(lang);
};

// convert date to local time to suitable with sdk requirement
export const adjustDateToUTC = (date?: Date) => {
  const offsetUtc = dayjs(date).utcOffset();
  return dayjs(date).add(offsetUtc, "minute");
};
