import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { AuthenticationResult, EventType } from "@azure/msal-browser";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/query-hooks/configure";
import msalInstance from "@/configs/authConfig";
import App from "@/App.tsx";

import "./index.scss";
import SignalRService from "@/services/signalRService";
import { useSignalRStore } from "./store/useSignalRStore";

const signalRStore = useSignalRStore.getState();

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  const account = msalInstance.getAllAccounts()[0];
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(account);
}

msalInstance.addEventCallback((event) => {
  if (
    (event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
      event.eventType === EventType.SSO_SILENT_SUCCESS) &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    event?.payload?.account
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    msalInstance.setActiveAccount(event.payload.account);

    if ((event.payload as AuthenticationResult)?.idToken) {
      const token = (event.payload as AuthenticationResult)?.accessToken;
      signalRStore.initializeSignalR(SignalRService.getInstance(token));
    }
  }
});

msalInstance.initialize().then(() => {
  msalInstance
    .handleRedirectPromise()
    .then((result) => {
      if (result) {
        msalInstance.setActiveAccount(result.account);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <App instance={msalInstance} />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
