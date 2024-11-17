import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (paramName: string, defaultValue: string = ""): string => {
    const paramValue = searchParams.get(paramName);
    return paramValue !== null ? paramValue : defaultValue;
  };

  const setParam = (paramName: string, paramValue: string | null | undefined): void => {
    if (paramValue === "" || paramValue === null || paramValue === undefined) {
      setSearchParams((params) => {
        params.delete(paramName);
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.set(paramName, paramValue);
        return params;
      });
    }
  };

  const setMultipleParams = (paramsObject: { [key: string]: string | null | undefined }): void => {
    setSearchParams((params) => {
      Object.entries(paramsObject).forEach(([key, value]) => {
        if (value === "" || value === null || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      return params;
    });
  };

  return {
    getParam,
    setParam,
    setMultipleParams,
  };
};

export default useQueryParams;
