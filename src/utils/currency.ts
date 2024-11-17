import numeral from "numeral";

export const FORMAT_CURRENCY = "0,0";
export const FORMAT_CURRENCY_DOLLAR = "0,0.00";

export const formatCurrency = (value: number | string | null | undefined) => {
  return numeral(value).format(FORMAT_CURRENCY);
};

export const formatCurrencyCustom = (
  value: number | string | null | undefined,
  currency: string = "VND",
  isShowCurrency: boolean = true,
) => {
  const showCurrency = isShowCurrency ? currency : "";
  switch (currency) {
    case "VND":
      return numeral(value).format(FORMAT_CURRENCY) + " " + showCurrency;
    case "$":
      return showCurrency + numeral(value).format(FORMAT_CURRENCY_DOLLAR);
    default:
      return numeral(value).format(FORMAT_CURRENCY) + " " + showCurrency;
  }
};
