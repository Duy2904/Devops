/* eslint-disable no-unused-vars */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

import msalInstance, { silentRefreshTokenRequest } from "@/configs/authConfig";
import { useUserPermissionsStore } from "@/store/useUserPermissionsStore";
import globalNavigate from "@/utils/globalNavigate.ts";
import { AccountInfo, AuthenticationResult, InteractionRequiredAuthError } from "@azure/msal-browser";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

function convertPermissionsToArray(permissionsString: string) {
  return permissionsString.split(";");
}

function getPermissions(response: AuthenticationResult) {
  const decodedToken = JSON.parse(atob(response.idToken.split(".")[1]));

  const extensionPermissions: string = decodedToken.extension_permissions;
  const permissionsArray = convertPermissionsToArray(extensionPermissions);
  return permissionsArray;
}

const acquireToken = async (instance: AxiosInstance, account: AccountInfo, config: AxiosRequestConfig) => {
  const { setPermissions } = useUserPermissionsStore.getState();
  try {
    const response = await msalInstance.acquireTokenSilent({
      scopes: silentRefreshTokenRequest.scopes,
      account: account,
    });

    const permissionsArray = getPermissions(response);
    setPermissions(permissionsArray);

    instance.defaults.headers.common["Authorization"] = `Bearer ${response.idToken}`;
    instance.defaults.headers.common["Tenant"] = "root";
    if (config.headers) {
      config.headers.Authorization = `Bearer ${response.idToken}`;
      config.headers["Tenant"] = "root";
    }
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      try {
        const response = await msalInstance.acquireTokenSilent({
          scopes: silentRefreshTokenRequest.scopes,
        });

        const permissionsArray = getPermissions(response);
        setPermissions(permissionsArray);

        instance.defaults.headers.common["Authorization"] = `Bearer ${response.idToken}`;
        instance.defaults.headers.common["Tenant"] = "root";
        if (config.headers) {
          config.headers.Authorization = `Bearer ${response.idToken}`;
          config.headers["Tenant"] = "root";
        }
      } catch (err) {
        msalInstance.logoutRedirect(); // force logout
      }
    } else {
      throw error;
    }
  }
};

const _createAxiosInstance = (): AxiosInstance => {
  // If axios authenticated instance does not exist then create it
  const instance = axios.create({});

  instance.interceptors.request.use(
    async (config) => {
      const account = msalInstance.getAllAccounts()[0];
      if (account) {
        await acquireToken(instance, account, config);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    async (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const account = msalInstance.getAllAccounts()[0];
        if (account) {
          await acquireToken(instance, account, originalRequest);
          return instance(originalRequest);
        }
      }
      if (error.response?.status === 401 && originalRequest._retry && globalNavigate.navigate) {
        const activeAccount = msalInstance.getActiveAccount();
        await msalInstance.logoutRedirect({ account: activeAccount });
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const getAxiosInstance = (): AxiosInstance => {
  return _createAxiosInstance();
};
