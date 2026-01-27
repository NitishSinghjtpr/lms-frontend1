import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../Helper/axiosInstance'

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true", 
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {}
};

//create account
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const resPromise = axiosInstance.post("/user/register", data);

    toast.promise(resPromise, {
      loading: "Creating your account...",
      success: (data) => data?.data?.message,
      error: "Failed to create account",
    });

    // const res = await resPromise;
    // return res.data;
    return (await resPromise).data;

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

//login account
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("/user/login", data);

    toast.promise(res, {
      loading: "Creating your account...",
      success: (data) => data?.data?.message,
      error: "Failed to Login",
    });

    // const res = await resPromise;
    // return res.data;
    return (await res).data;

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
});

export default authSlice.reducer;
