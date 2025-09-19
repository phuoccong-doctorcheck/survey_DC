/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://services.doctorcheck.online/api",
});
const axiosInstance1 = axios.create({
  baseURL: "https://stagin-dev.doctorcheck.online/api",
});

axiosInstance.interceptors.request.use(
  ($config) => {
    if ($config.headers) {
      $config.headers['App-Id'] = "514498269537899";
      $config.headers['App-Key'] = "9Qqwgqx9yVKy5QVaV7yW";
    }
    return $config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = "/";
          return Promise.reject(
            (error.response.data as { content: any }).content
          );
        case 422:
          return Promise.reject(
            (error.response.data as { content: any }).content
          );
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
