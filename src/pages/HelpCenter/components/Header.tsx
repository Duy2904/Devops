import { Flex, Image, Typography } from "antd";
import { Link } from "react-router-dom";

import { IconHome } from "@/components/common/SvgIcon";
import { ROUTES } from "@/routers/routes";

const { Text } = Typography;
export default function Header() {
  return (
    <Flex
      className={`bg-[url('/support-header.svg')] bg-contain px-4 w-full`}
      justify="center">
      <Flex
        vertical
        justify="space-between"
        align="center"
        flex={1}>
        <Flex
          justify="flex-start"
          className="py-4 w-full"
          align="center">
          <Flex flex={2}>
            <Flex
              className={"bg-white rounded-md px-2"}
              justify={"center"}>
              <Image
                preview={false}
                src={"https://hongngocha.com/wp-content/uploads/2023/11/LOGO-HNH-SLOGAN_-OL-01.png"}
                width={100}></Image>
            </Flex>
            <Text className="mx-2 text-lg text-primary"> Help & Support Center</Text>
          </Flex>
          <Flex
            flex={1}
            justify="flex-end">
            <Link to={ROUTES.DASHBOARD}>
              <Flex align="center">
                <IconHome color="#1f1f1f" />
                <Text className="font-light text-primary hover:underline cursor-pointer">Back to Home</Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
