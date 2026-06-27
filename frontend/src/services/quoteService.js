import axiosInstance from "../api/axiosInstance";

// Generate AI quote
export const generateQuote = async (prompt) => {
  return await axiosInstance.post("/quotes/generate", {
    prompt,
  });
};

// Get all quotes
export const getQuotes = async () => {
  return await axiosInstance.get("/quotes");
};

// Get single quote
export const getQuote = async (id) => {
  return await axiosInstance.get(`/quotes/${id}`);
};

// Delete quote
export const deleteQuote = async (id) => {
  return await axiosInstance.delete(`/quotes/${id}`);
};