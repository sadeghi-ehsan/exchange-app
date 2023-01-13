import { Query } from "@/pages/converter/types";

const ExchangeEndPoints = {
  GET_EXCHANGES_API: `/latest`,
  GET_CONVERT_EXCHANGE: ({ from, to, amount }: Query) => `/convert?from=${from}&to=${to}&amount=${amount}`,
  GET_EXCHANGE_BY_DATE: ({ start_date, end_date, base }: any) =>
    `/timeseries?start_date=${start_date}&end_date=${end_date}&base=${base}`
};
export default ExchangeEndPoints;
