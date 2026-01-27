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

//logout
//logout
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("user/logout");

    toast.promise(res, {
      loading: "Wait! logout in progress...",
      success: (data) => data?.data?.message,
      error: "failed to logout"
    });

    // 👉 बस यह लाइन जोड़नी है
    return (await res).data;

  } catch (error) {
    toast.error(error?.response?.message);
    throw error;
  }
});



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(login.fulfilled,(state,action)=>{
      localStorage.setItem("data",JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn",true);
      localStorage.setItem("role",action?.payload?.user);
      state.isLoggedIn=true;
      state.data=action?.payload?.user;
      state.role=action?.payload?.user;
    })
    .addCase(logout.fulfilled,(state)=>{
      localStorage.clear();
      state.data={};
      state.isLoggedIn=false;
      state.role="";
    })
  }
});

export default authSlice.reducer;
