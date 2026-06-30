// services/availabilityService.js

import axiosInstance from "../api/axiosInstance";

export const getProviderAvailability = (providerId) => {
  return axiosInstance.get(
    `/availability/provider/${providerId}`
  );
};