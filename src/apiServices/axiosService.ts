import axios from "axios";

export default function axiosService(conf: any) {
  const axiosInstance = axios.create(conf);

  return axiosInstance;
}
