import { Button, ButtonProps, Dropdown, Flex, Typography } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import classNames from "classnames";
import { Check } from "lucide-react";
import React, { useMemo } from "react";

import { LANGUAGES } from "@/constants/languages";
import { useLanguage } from "@/store/useLanguage";

const { Text } = Typography;

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage((state) => state);

  const options: ItemType[] = LANGUAGES.map((lang) => ({
    key: lang.code,
    label: (
      <Language
        className="w-full"
        code={lang.code}
        isActive={language === lang.code}
      />
    ),
    onClick: () => setLanguage(lang.code),
  }));

  return (
    <Dropdown
      menu={{ items: options }}
      trigger={["hover", "click"]}
      placement="bottomRight">
      <Language
        code={language}
        className="border border-black/10 border-solid"
      />
    </Dropdown>
  );
};

interface LanguageProps {
  code: string;
  onClick?: () => void;
  isActive?: boolean;
  className?: ButtonProps["className"];
}

const Language: React.FC<LanguageProps> = ({ code, onClick = () => {}, isActive, className }) => {
  const current = useMemo(() => LANGUAGES.find((lang) => lang.code === code), [code]);

  return (
    <Button
      className={classNames(
        "flex justify-center hover:!bg-transparent items-center px-2",
        className,
        isActive && "font-bold",
      )}
      onClick={onClick}
      type="text">
      <Flex
        align="center"
        justify="space-between"
        className="w-full">
        <Flex
          align="center"
          gap={4}>
          <Text className="text-2xl">{current?.icon}</Text>
          <Text className="flex-1 ml-1 text-black/80 text-center text-xs">{current?.name}</Text>
        </Flex>
        {isActive && <Check className="text-green-600 w-5 h-5 ml-2" />}
      </Flex>
    </Button>
  );
};
