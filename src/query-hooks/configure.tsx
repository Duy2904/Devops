import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { handleErrorMessage } from "./utils";
import { AxiosError, HttpStatusCode } from "axios";
import { ErrorResult } from "sdk/tmc";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry(_, error: unknown) {
        const axiosError = error as AxiosError<ErrorResult>;
        if (axiosError.response?.status === HttpStatusCode.NotFound) return false;
        else return true;
      },
    },
  },
  queryCache: new QueryCache({
    onError: handleErrorMessage,
  }),
  mutationCache: new MutationCache({
    onError: handleErrorMessage,
  }),
});
