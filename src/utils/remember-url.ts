import { ROUTES } from "@/routers/routes";

const INITIAL_PATH_KEY = "initial_path";

export const handleSaveInitializePath = (path: string) => {
  // force avoid homepage path
  localStorage?.setItem(INITIAL_PATH_KEY, path === ROUTES.HOMEPAGE ? ROUTES.DASHBOARD : path);
};
export const getInitilizePath = () => {
  return localStorage?.getItem(INITIAL_PATH_KEY) ?? ROUTES.DASHBOARD;
};
