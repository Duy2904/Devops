import i18n from "@/i18n";
import { message } from "antd";
import { AxiosError, HttpStatusCode } from "axios";
import { ErrorResult } from "sdk/tmc";
import { patterns } from "./constants";

export const handleErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError<ErrorResult>;
  const msg = axiosError.response?.data.messages?.[0] ?? axiosError.response?.data?.exception ?? "Error happened.";
  const isStatusNotFound = axiosError.response?.status === HttpStatusCode.NotFound;
  if (isStatusNotFound) {
    window.location.href = "/404";
    return;
  }

  const translated = translateDynamicMessage(msg);
  message.error(translated);
};

const translateDynamicMessage = (msg: string): string => {
  for (const pattern of patterns) {
    const match = msg.match(pattern.regex);
    if (match) {
      const [_, value, oneValue] = match;
      const translatedTemplate = i18n.t(pattern.template);
      return translatedTemplate.replace("{{value}}", value).replace("{{oneValue}}", oneValue || "");
    }
  }

  return i18n.t(msg); // Fallback for messages without dynamic parts
};
