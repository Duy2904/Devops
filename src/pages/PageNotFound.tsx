import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routers/routes";

export const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex max-w-[1127px] px-[15px] mx-auto items-center h-screen">
      <div className="flex flex-col-reverse lg:flex-row gap-[90px] w-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{t("So sorry!")}</h1>
          <p className="mt-4 text-2xl md:text-3xl leading-8">{t("The page you are looking for cannot be found")}</p>
          <Link to={ROUTES.DASHBOARD}>
            <Button
              type="primary"
              className="h-12 text-lg mt-5 px-10">
              {t("Go back")}
            </Button>
          </Link>
        </div>
        <div className="shrink-0">
          <img
            src="/images/not-found.png"
            alt="not found"
            className="w-full mx-auto max-w-[80%] md:max-w-[551px]"
          />
        </div>
      </div>
    </div>
  );
};
