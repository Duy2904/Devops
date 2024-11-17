import { toast } from "react-toastify";

import { ErrorResult } from "sdk/tmc";
import ToastItem from "@/components/common/ToastItem";
import i18n from "@/i18n";

export function showSuccessMessage(message: string) {
  toast.success(
    <ToastItem
      type="success"
      content={<p className="font-normal text-sm leading-[18px]">{message}</p>}
    />,
    {
      hideProgressBar: true,
      icon: false,
      closeButton: false,
    },
  );
}

export function showFailedErrorMessage(error: ErrorResult) {
  const msgError = error?.messages?.[0] ?? error?.exception ?? "Something went wrong. Please try again.";

  const translatedMsg = i18n.t(msgError);
  toast.error(
    <ToastItem
      type="error"
      content={<p className="font-normal text-sm leading-[18px]">{translatedMsg}</p>}
    />,
    {
      hideProgressBar: true,
      icon: false,
      closeButton: false,
    },
  );
}
