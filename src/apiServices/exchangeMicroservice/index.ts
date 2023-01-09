import { AxiosError } from "axios";
import axiosService from "../axiosService";

export const baseURL = process.env.NEXT_PUBLIC_EXCHANGE_MICROSERVICE_BASE_URL;
const ExchangeMicroService = axiosService({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

ExchangeMicroService.interceptors.request.use(request => {
  // we can intercept before returning the request like checking access token or sth else
  return request;
});

ExchangeMicroService.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default ExchangeMicroService;
