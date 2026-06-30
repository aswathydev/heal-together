// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../api/axiosInstance"; // Adjust path to your axios instance

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (formData, thunkAPI) => {
//     try {
//       const { data } = await axiosInstance.post("/auth/register", formData);
      
//       // Save token immediately on success
//       localStorage.setItem("token", data.token);
      
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Registration failed. Please try again."
//       );
//     }
//   }
// );


import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance"; // Adjust path to your axios instance

// Register User Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", formData);
      
      // Save token immediately on success
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  }
);

// Login User Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", credentials);
      
      // Save token immediately on success
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  }
);



// export const registerProvider = createAsyncThunk(
//   "auth/registerProvider",
//   async (formData, thunkAPI) => {
//     try {
//       const { data } = await axiosInstance.post("/auth/provider/register", formData);
      
//       // Save token immediately on success
//       localStorage.setItem("token", data.token);
      
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Registration failed. Please try again."
//       );
//     }
//   }
// );


export const registerProvider = createAsyncThunk(
  'auth/registerProvider',
  async (providerData, { rejectWithValue }) => {
    try {
      // Since there's a profile image, providerData should be a FormData object
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axiosInstance.post("/auth/provider/register", providerData, config);
      
      // Save token to localStorage upon successful registration
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }


      return response.data; // Contains { success: true, token, provider }
    } catch (error) {
      // Return custom error message from backend or fallback to generic message
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);



// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

export const loginAdminThunk = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Hits your exact controller endpoint
      const response = await axiosInstance.post("/auth/admin/login", { email, password });
      
      // Save credentials instantly to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Admin login failed");
    }
  }
);