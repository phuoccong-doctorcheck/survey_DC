/* eslint-disable import/order */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from "moment";

/* eslint-disable import/prefer-default-export */

import axiosInstance from "../common/instance";

// lấy data để đổ vào select box trang sau khi khám : Đã khám xong, tầm soát, chưa liên lạc được,...
export const getProvinces = async () => {
  const response = await axiosInstance.get("/dm/provinces/VN");
  return response.data;
};
export const getDistricts = async (data:any) => {
  const response = await axiosInstance.get(`/dm/districts/${data}`);
  return response.data;
};
export const getWards = async (data:any) => {
  const response = await axiosInstance.get(`/dm/wards/${data}`);
  return response.data;
};

