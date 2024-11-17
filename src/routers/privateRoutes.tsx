import PageLayout from "@/components/layout/PageLayout";
import msalInstance from "@/configs/authConfig";
import { ROUTES } from "@/routers/routes";
import { MenuProps, Spin } from "antd";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import { IconBookingOrder, IconHome, IconLogOut } from "@/components/common/SvgIcon";
import { Headset } from "lucide-react";
import Dashboard from "@/pages/Dashboard";
import BookingOrdersList from "@/pages/BookingOrders";
import BookingOrderDetail from "@/pages/BookingOrders/BookingOrderDetail";
import { menuItemCustom } from "@/utils/sidebar-menuitem";
import { useTranslation } from "react-i18next";
import useGetUserProfile from "@/query-hooks/queries/useGetUserProfile";

const BookerRoutes = () => {
  const { t } = useTranslation();
  const activeAccount = msalInstance.getActiveAccount();
  const { data: user, isLoading } = useGetUserProfile();

  const { pathname } = useLocation();

  const items: MenuProps["items"] = [
    menuItemCustom(t("Dashboard"), ROUTES.DASHBOARD, <IconHome />),
    menuItemCustom(t("Booking orders"), ROUTES.BOOKING_ORDERS, <IconBookingOrder />),
    menuItemCustom(t("Help & Support"), ROUTES.HELP_SUPPORT, <Headset />, undefined, undefined, true),
    menuItemCustom(t("Log Out"), "", <IconLogOut />, undefined, () => {
      const activeAccount = msalInstance.getActiveAccount();
      msalInstance.logoutRedirect({ account: activeAccount });
    }),
  ];

  if (isLoading) {
    return (
      <Spin
        spinning
        fullscreen
      />
    );
  }

  if (activeAccount) {
    return (
      <PageLayout menuItems={items}>
        <Outlet></Outlet>
        {/* <ToastContainer
          style={{ width: "456px", height: "80px" }}
          bodyStyle={{ padding: "8px 16px" }}
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}
      </PageLayout>
    );
  } else {
    return (
      <Navigate
        to={{
          pathname: pathname ? pathname : ROUTES.HOMEPAGE,
        }}
        replace></Navigate>
    );
  }
};

export const BookerPrivateRouter = (
  <Route element={<BookerRoutes />}>
    <Route
      element={<Dashboard />}
      path={ROUTES.DASHBOARD}></Route>
    <Route
      element={<BookingOrdersList />}
      path={ROUTES.BOOKING_ORDERS}></Route>
    <Route
      element={<BookingOrderDetail />}
      path={ROUTES.BOOKING_ORDER_DETAIL}></Route>
  </Route>
);
