import { AxiosError } from "axios";

import { ErrorResult } from "../../sdk/tmc";
import { showFailedErrorMessage } from "./notifyResponse";

export const handleErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError<ErrorResult>;
  const errorRes = axiosError?.response as ErrorResult;
  showFailedErrorMessage(errorRes);
};
