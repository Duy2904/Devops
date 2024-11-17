import React, { useContext } from "react";
import { NotificationInstance } from "antd/es/notification/interface";

// Auth Context
export const NotificationContext = React.createContext<{
  notificationApi: NotificationInstance;
}>(undefined!);

export const useNotification = () => {
  return useContext(NotificationContext);
};
