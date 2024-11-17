import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Overlay from "@/components/common/Overlay";
import msalInstance, { loginRequest } from "@/configs/authConfig";
import { UserRole } from "@/constant/user";
import { PageNotFound } from "@/pages/PageNotFound";
import useGetUserProfile from "@/query-hooks/queries/useGetUserProfile";
import { BookerPrivateRouter } from "@/routers/privateRoutes";
import { isAuthorized } from "@/services/authorization";
import { getInitilizePath, handleSaveInitializePath } from "@/utils/remember-url";
import { useMsal } from "@azure/msal-react";

import { CenterSupportRoutes } from "./center-support-routes";
import { ROUTES } from "./routes";

const AppRouter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeAccount = msalInstance.getActiveAccount();
  const { data: userProfile } = useGetUserProfile();

  const handleAuthenticationAndNavigation = () => {
    const initialPath = getInitilizePath();
    if (!activeAccount) {
      if (initialPath === ROUTES.DASHBOARD) handleSaveInitializePath(pathname);

      msalInstance.ssoSilent({ ...loginRequest }).catch(() => {
        msalInstance.loginRedirect({ ...loginRequest }).then(() => {
          navigate({ pathname: initialPath }, { replace: true });
        });
      });
    } else {
      const redirectPath = [ROUTES.DASHBOARD, ROUTES.HOMEPAGE].includes(pathname) ? initialPath : pathname;
      navigate(redirectPath);

      // reset initial path to dashboard after navigating
      setTimeout(() => {
        handleSaveInitializePath(ROUTES.DASHBOARD);
      }, 0);
    }
  };

  useEffect(() => {
    handleAuthenticationAndNavigation();
  }, []);

  if (!isAuthorized(userProfile?.role as UserRole[])) return <Overlay />;

  return <Outlet />;
};

const HomePage = () => {
  const { accounts } = useMsal();
  const activeAccount = accounts?.[0];
  const { pathname } = useLocation();
  const storagePath = getInitilizePath();

  if (!activeAccount) return <></>;
  if (pathname === ROUTES.HOMEPAGE && storagePath !== ROUTES.HOMEPAGE) {
    return <Navigate to={storagePath} />;
  } else return <Navigate to={ROUTES.DASHBOARD} />;
};

export const BookerAllRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppRouter></AppRouter>}>
      <Route
        path={ROUTES.HOMEPAGE}
        element={<HomePage />}
      />

      {BookerPrivateRouter}
      {CenterSupportRoutes}
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Route>,
  ),
);
