import { Input, InputProps } from "antd";
import debounce from "lodash/debounce";
import React from "react";

type DebounceSearchInputProps = InputProps & {};
export const DebounceSearchInput: React.FC<DebounceSearchInputProps> = (props) => {
  const debounceOnChange = props?.onChange ? debounce(props.onChange, 300) : () => {};

  return (
    <Input
      className="focus:border-primary bg-greyCustom01 border-none w-full min-h-[36px]"
      {...props}
      onChange={debounceOnChange}
    />
  );
};
