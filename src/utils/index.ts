export * from "./notifyResponse";
export * from "./globalNavigate";

export const toRoute = (baseRoute: string, params: { [key: string]: any }) => {
  let route = baseRoute;
  if (params) {
    Object.keys(params).forEach((k) => {
      const value = params[k];
      route = route.replace(":" + k, value);
    });
  }
  return route;
};
