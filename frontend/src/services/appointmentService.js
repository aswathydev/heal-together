// services/appointmentService.js

import axiosInstance from "../api/axiosInstance";

export const createAppointment = (appointmentData) => {
  return axiosInstance.post(
    "/appointments",
    appointmentData
  );
};

export const getUserAppointments = () => {
  return axiosInstance.get(
    "/appointments/my-appointments"
  );
};

export const getProviderAppointments = () => {
  return axiosInstance.get(
    "/appointments/provider"
  );
};

export const getAppointmentById = (appointmentId) => {
  return axiosInstance.get(
    `/appointments/${appointmentId}`
  );
};

export const cancelAppointment = (appointmentId) => {
  return axiosInstance.put(
    `/appointments/${appointmentId}/cancel`
  );
};