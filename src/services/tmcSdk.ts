import { TMC_API_BASE_URL } from "@/configs/variables.ts";

import {
  AirlineApi,
  AirportApi,
  CorporationApi,
  EmployeeApi,
  FlightsApi,
  HotelApi,
  ManagerApi,
  NotificationApi,
  NotionApi,
  TravelerApi,
  TripRequestInfoApi,
} from "../../sdk/tmc";
import { getAxiosInstance } from "./auth.ts";

export const getNotificationApi = () => {
  return new NotificationApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};

export const getManagerApi = () => {
  return new ManagerApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};

export const getTripRequestInfoApi = () => {
  return new TripRequestInfoApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};

export const getAirportApi = () => {
  return new AirportApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};

export const getAirlineApi = () => {
  return new AirlineApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};

// export const getTripPlanApi = () => {
//     return new TripPlanApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
// };

export const getTravellerApi = () => {
  return new TravelerApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};

export const getFlightApi = () => {
  return new FlightsApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};

export const getHotelApi = () => {
  return new HotelApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};

export const getCoporationApi = () => {
  return new CorporationApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};

export const getEmployeeApi = () => {
  return new EmployeeApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};

export const getNotionApi = () => {
  return new NotionApi(undefined, TMC_API_BASE_URL, getAxiosInstance());
};
