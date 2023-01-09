const ExchangeEndPoints = {
  GET_EXCHANGES_API: `/latest`,
  GET_CONVERT_EXCHANGE: (from: string, to: string) => `/convert?from=${from}&to=${to}`,
  GET_EXCHANGE_BY_DATE: (startDate: string, endDate: string) =>
    `/timeseries?start_date=${startDate}&end_date=${endDate}`
};
export default ExchangeEndPoints;
