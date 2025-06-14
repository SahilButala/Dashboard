import type { LoginFormData, SignUpData } from "@/config/types";
import axiosInstance from "./axious";

export const SignUpService = async (formdata :SignUpData) => {
  const { data } = await axiosInstance.post("/user/auth/register", formdata);
  return data;
};

export const SigninService = async (formdata: LoginFormData) => {
  const { data } = await axiosInstance.post("/user/auth/login", formdata , {
    withCredentials : true
  });
  return data;
};
export const CreateProductService = async ({ formdata } : any ) => {
  const { data } = await axiosInstance.post("/products/", formdata);
  return data;
};
export const deleteProductService = async ({ id } : any) => {
  const { data } = await axiosInstance.delete(`/products/${id}`);
  return data;
};
export const updateProductService = async ({ id  , formdata} : any) => {
  const { data } = await axiosInstance.put(`/products/${id}` , formdata);
  return data;
};
export const getAllProducts = async () => {
  const { data } = await axiosInstance.get(`/products/all`);
  return data;
};
