/* eslint-disable import/order */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from "moment";

/* eslint-disable import/prefer-default-export */

import axiosInstance from "../common/instance";

export const listPatientsOld = async () => {
  const response = await axiosInstance.get("/patient/list-all");
  return response.data;
};

export const getInfoOfPatient = async (data:any) => {
  const response = await axiosInstance.post("/master/servicepoint-load",data);
  return response.data;
};
export const getServicesOfPackageAPI = async (data:any) => {
  const response = await axiosInstance.get(`/dm/services-by-package/${data}`);
  return response.data;
};
