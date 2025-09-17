/* eslint-disable import/order */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from "moment";


import axiosInstance from "../common/instance";

// lấy data để đổ vào select box trang sau khi khám : Đã khám xong, tầm soát, chưa liên lạc được,...
export const getAppointment = async (data:any) => {
  const response = await axiosInstance.post("/client/get-client-profile", data);
  return response.data;
};
export const saveProfile = async (data:any) => {
  const response = await axiosInstance.post("/client/save-client-profile", data);
  return response.data;
};
export const getProvincesAPI = async (data:any) => {
  const response = await axiosInstance.get("/client/provinces/VN");
  return response.data;
};
export const getDistrictsAPI = async (data:any) => {
  const response = await axiosInstance.get(`/client/wards/${data}`);
  return response.data;
};
export const getWardsAPI = async (data:any) => {
  const response = await axiosInstance.get(`/client/wards/${data}`);
  return response.data;
};

export const getProvincesAPIOld = async (data:any) => {
  const response = await axiosInstance.get("/client/province_old/VN");
  return response.data;
};
export const getDistrictsAPIOld = async (data:any) => {
  const response = await axiosInstance.get(`/client/district_old/${data}`);
  return response.data;
};
export const getWardsAPIOld = async (data:any) => {
  const response = await axiosInstance.get(`/client/ward_old/${data}`);
  return response.data;
};
export const getSurvey = async (data: any) => {
 
  const response = await axiosInstance.post("/client/get-surveys", data);
  console.log(response)
  return response.data;
};
export const SaveSurvey = async (data: any) => {
 
  const response = await axiosInstance.post("/client/save-survey",data);
  return response.data;
};

//  API lấy kết quả 
export const getMasterResult = async (data:any) => {
  const response = await axiosInstance.post("/client/get-client-categories", data);
  return response.data;
};
//  API lấy chi tiết 1 kết quả
export const getDetailResult = async (data:any) => {
  const response = await axiosInstance.post("/client/get-result-details", data);
  return response.data;
};