import { message, notification } from "antd";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { RouterProvider } from "react-router-dom";

import { MessageContext, NotificationContext } from "@/contexts";
import { BookerAllRoutes } from "@/routers";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { QueryClientProvider } from "@tanstack/react-query";

import i18n from "./i18n";
import { queryClient } from "./query-hooks/configure";
import { useLanguage } from "./store/useLanguage";
import { dayjsSetup, setDayjsLocale } from "./utils/time";
import { useSignalRStore } from "./store/useSignalRStore";
import { QUERY_KEYS } from "./query-hooks/keys";

interface IAppProps extends PropsWithChildren {
  instance: PublicClientApplication;
}

function App(props: IAppProps) {
  const { t } = useTranslation();
  const language = useLanguage((state) => state.language);

  const { instance } = props;
  // setup dayjs plugins
  dayjsSetup();

  const [messageApi, messageContextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] = notification.useNotification({
    placement: "topRight",
  });

  const notificationContextValue = useMemo(() => ({ notificationApi }), [notificationApi]);
  const messageContextValue = useMemo(() => ({ messageApi }), [messageApi]);

  // MARK: Notifications handler
  const signalRInstance = useSignalRStore((state) => state.signalRInstance);

  useEffect(() => {
    if (!signalRInstance) return;

    signalRInstance?.events((message) => {
      const parsedMessage = JSON.parse(message);

      notificationApi.info({
        message: t("New Booking Order"),
        description: t("A new booking order has been received"),
      });

      queryClient.invalidateQueries([QUERY_KEYS.GET_LIST_BOOKING]);
      queryClient.invalidateQueries([QUERY_KEYS.GET_BOOKING_DETAIL, parsedMessage?.data?.tripInfoId]);
    });
  }, [signalRInstance, queryClient]);

  useEffect(() => {
    i18n.changeLanguage(language);
    setDayjsLocale(language as "vi" | "en");
  }, [language, i18n]);

  return (
    <I18nextProvider i18n={i18n}>
      <MsalProvider instance={instance}>
        <QueryClientProvider client={queryClient}>
          <NotificationContext.Provider value={notificationContextValue}>
            <MessageContext.Provider value={messageContextValue}>
              {notificationContextHolder}
              {messageContextHolder}
              <RouterProvider router={BookerAllRoutes} />
            </MessageContext.Provider>
          </NotificationContext.Provider>
        </QueryClientProvider>
      </MsalProvider>
    </I18nextProvider>
  );
}

export default App;
