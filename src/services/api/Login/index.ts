/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */

/* eslint-disable import/no-cycle */

/* eslint-disable import/prefer-default-export */

import {} from "./types";

import axiosInstance from "../common/instance";

// login với tài khoản và mật khẩu
export const loginWithAccount = async (data: any) => {
  const { phone_number } = data;
  const response = await axiosInstance.post("verify-by-phone", {
    phone_number: phone_number,
    is_send_otp: false,
  });
  return response.data;
};
export const verifyByAuthcode = async (data: any) => {
  const { authcode } = data;
  const response = await axiosInstance.post("verify-by-authcode", {
    authcode: authcode,
  });
  return response.data;
};


export const loginWithLink = async (data: any) => {
  const response = await axiosInstance.get(
    `/account/sso?username=${data?.username}&auth=${data?.token}`
  );
  return response.data;
};
export const changePassword = async (passwords: any) => {
  const response = await axiosInstance.post("/account/change-password", {
    new_password: passwords,
  });
  return response.data;
};
