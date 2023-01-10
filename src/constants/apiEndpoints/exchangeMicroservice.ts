import { Query } from "@/pages/converter/types";

const ExchangeEndPoints = {
  GET_EXCHANGES_API: `/latest`,
  GET_CONVERT_EXCHANGE: ({ from, to, amount }: Query) => `/convert?from=${from}&to=${to}&amount=${amount}`,
  GET_EXCHANGE_BY_DATE: (startDate: string, endDate: string) =>
    `/timeseries?start_date=${startDate}&end_date=${endDate}`
};
export default ExchangeEndPoints;
