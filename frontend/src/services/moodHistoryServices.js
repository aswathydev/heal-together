import axiosInstance from "../api/axiosInstance";

export const addMood =
  data =>
    axiosInstance.post(
      "/moods",
      data
    );

export const getHistory =
  () =>
    axiosInstance.get(
      "/moods/history"
    );

export const getWeekly =
  () =>
    axiosInstance.get(
      "/moods/weekly"
    );

export const getMonthly =
  () =>
    axiosInstance.get(
      "/moods/monthly"
    );

export const getStreak =
  () =>
    axiosInstance.get(
      "/moods/streak"
    );

export const getAlert =
  () =>
    axiosInstance.get(
      "/moods/alert"
    );

export const getAI =
  () =>
    axiosInstance.get(
      "/moods/analysis"
    );