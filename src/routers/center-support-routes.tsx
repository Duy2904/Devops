import "react-toastify/dist/ReactToastify.css";

import { Breadcrumb, Flex, Typography } from "antd";
import { ChevronRight, Search } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, Outlet, Route, useLocation, useNavigate, useParams } from "react-router-dom";

import Article from "@/pages/HelpCenter/Article";
import Header from "@/pages/HelpCenter/components/Header";
import { SearchInput } from "@/pages/HelpCenter/components/SearchInput";
import { HelpCenter } from "@/pages/HelpCenter/HelpCenter";
import useCenterSupport from "@/pages/HelpCenter/hooks/useCenterSupport";
import Section from "@/pages/HelpCenter/Section";
import { ROUTES } from "@/routers/routes";
import globalNavigate from "@/utils/globalNavigate";
import { toRoute } from "@/utils";

const { Text } = Typography;
export function HelpCenterLayout() {
  const navigate = useNavigate();
  globalNavigate.navigate = navigate;
  return (
    <div>
      <Outlet />
    </div>
  );
}

const DetailLayout = () => {
  const { sectionId = null, articleId = null } = useParams();
  const { title: sectionTitle, isLoading: isLoadingSection } = useCenterSupport(sectionId ?? "");
  const { title: articleTitle, isLoading: isLoadingArticle } = useCenterSupport(articleId ?? "");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const itemsBreadcrumb = useMemo(() => {
    const arr = [
      {
        title: <Link to={ROUTES.HELP_SUPPORT}>Help & Center Support</Link>,
      },
    ];
    if (sectionId && !["", ":sectionId"].includes(sectionId ?? "")) {
      arr.push({
        title: isLoadingSection ? (
          <Text className="text-black/50">...</Text>
        ) : (
          <Link to={toRoute(ROUTES.SUPPORT_SECTION, { sectionId })}>{sectionTitle}</Link>
        ),
      });
    }
    if (articleId) {
      arr.push({
        title: isLoadingArticle ? (
          <Text className="text-black/50">...</Text>
        ) : (
          <Link
            state={{}}
            to={toRoute(ROUTES.SUPPORT_ARTICLE, { sectionId, articleId })}>
            {articleTitle}
          </Link>
        ),
      });
    }
    return arr;
  }, [sectionTitle, articleTitle]);

  return (
    <Flex
      vertical
      align="center">
      <Header />

      <Flex
        vertical
        className="p-10 w-full">
        <Flex
          justify="space-between"
          className="w-full"
          wrap="wrap"
          align="flex-start">
          <Flex flex={2}>
            <Breadcrumb
              separator={
                <ChevronRight
                  size={18}
                  className="my-[1px]"
                />
              }
              items={itemsBreadcrumb}
            />
          </Flex>
          <Flex
            flex={1}
            className="min-w-[380px]">
            <SearchInput
              className="bg-white my-2 px-4 py-[5px] rounded-md min-h-[40px] text-black/70"
              prefix={<Search color="#999999" />}
              placeholder="Find anything: Change your trip, baggage..."
            />
          </Flex>
        </Flex>

        <div className="py-4 w-full">
          <Outlet />
        </div>
      </Flex>
    </Flex>
  );
};
export const CenterSupportRoutes = (
  <Route element={<HelpCenterLayout />}>
    <Route
      path={ROUTES.HELP_SUPPORT}
      element={<HelpCenter />}
    />
    <Route element={<DetailLayout />}>
      <Route
        path={ROUTES.SUPPORT_SECTION}
        element={<Section />}
      />
      <Route
        path={ROUTES.SUPPORT_ARTICLE}
        element={<Article />}
      />
    </Route>
  </Route>
);
