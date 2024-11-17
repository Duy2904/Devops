import React, { useContext } from "react";
import { MessageInstance } from "antd/es/message/interface";

// Auth Context
export const MessageContext = React.createContext<{
  messageApi: MessageInstance;
}>(undefined!);

export const useMessage = () => {
  return useContext(MessageContext);
};
