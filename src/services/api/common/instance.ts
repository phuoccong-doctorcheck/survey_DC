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
      $config.headers['App-Id'] = "29466071-c098-4540-9e62-deb51f2980a7";
      $config.headers['App-Key'] = "Eo0F84c3aznGv9Nx2v7Y1n2g3edy82nIwzbRlDC92899";
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
