import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

interface IUploadingProps {
  id: string;
}

function Uploading(props: IUploadingProps) {
  const { id } = props;
  const { t } = useTranslation();

  return (
    <Flex
      vertical
      className="mt-4">
      <Flex className="text-[#192E6E] text-[16px] font-medium">{t("Attaching Files or Images")}</Flex>
      <Flex className="text-textSecondary text-[16px]">
        {t("Supported format")}: PDF; Docs; JPG; PNG. {t("Max file size")}: 1MB
      </Flex>

      <Flex
        className="w-full mt-4"
        align={"center"}
        justify={"center"}>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-32 border border-blue-500 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 hover:bg-gray-100">
          <Flex
            align={"center"}
            justify={"center"}
            vertical>
            <Flex
              className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"
              vertical>
              <span className="me-1">{t("Drag and drop file to upload")}</span>
            </Flex>
            <Button
              type="primary"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5">
                  <path
                    d="M4.15 12.8C2.41094 12.8 1 11.3891 1 9.65C1 8.27625 1.87937 7.10813 3.10437 6.67719C3.10219 6.61812 3.1 6.55906 3.1 6.5C3.1 4.56625 4.66625 3 6.6 3C7.89719 3 9.02812 3.70437 9.63406 4.75437C9.96656 4.53125 10.3691 4.4 10.8 4.4C11.9594 4.4 12.9 5.34063 12.9 6.5C12.9 6.76688 12.8497 7.02063 12.76 7.25688C14.0375 7.515 15 8.64594 15 10C15 11.5466 13.7466 12.8 12.2 12.8H4.15ZM5.87812 8.05312C5.6725 8.25875 5.6725 8.59125 5.87812 8.79469C6.08375 8.99812 6.41625 9.00031 6.61969 8.79469L7.47281 7.94156V10.875C7.47281 11.1659 7.70687 11.4 7.99781 11.4C8.28875 11.4 8.52281 11.1659 8.52281 10.875V7.94156L9.37594 8.79469C9.58156 9.00031 9.91406 9.00031 10.1175 8.79469C10.3209 8.58906 10.3231 8.25656 10.1175 8.05312L8.3675 6.30312C8.16187 6.0975 7.82937 6.0975 7.62594 6.30312L5.87594 8.05312H5.87812Z"
                    fill="white"
                  />
                </svg>
              }
              className="min-w-[140px] h-8 mt-2 rounded-lg">
              <span className="relative -top-1">{t("Upload file")}</span>
            </Button>
          </Flex>
          <input
            id={id}
            multiple
            type="file"
            className="!hidden"
          />
        </label>
      </Flex>
    </Flex>
  );
}

export default Uploading;
