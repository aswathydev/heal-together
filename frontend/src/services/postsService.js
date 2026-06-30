
import axiosInstance from "../api/axiosInstance";

export const getAllProviders = () => {
  return axiosInstance.get("/provider");
};