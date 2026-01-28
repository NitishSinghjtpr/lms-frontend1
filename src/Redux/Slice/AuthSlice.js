import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {},
};

// =========================================
// CREATE ACCOUNT
// =========================================
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const resPromise = axiosInstance.post("/user/register", data);

    toast.promise(resPromise, {
      loading: "Creating your account...",
      success: (data) => data?.data?.message,
      error: "Failed to create account",
    });

    return (await resPromise).data;

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

// =========================================
// LOGIN
// =========================================
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const resPromise = axiosInstance.post("/user/login", data);

    toast.promise(resPromise, {
      loading: "Please wait for login...",
      success: (data) => data?.data?.message,
      error: "Failed to Login",
    });

    return (await resPromise).data;

  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

// =========================================
// LOGOUT
// =========================================
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    // ✔ FIXED missing slash
    const resPromise = axiosInstance.get("/user/logout");

    toast.promise(resPromise, {
      loading: "Wait! logout in progress...",
      success: (data) => data?.data?.message,
      error: "Failed to logout",
    });

    return (await resPromise).data;

  } catch (error) {
    toast.error(error?.response?.message);
    throw error;
  }
});

// =========================================
// SLICE
// =========================================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // LOGIN SUCCESS
      .addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("role", action?.payload?.user?.role?.toLowerCase());
      state.role = action?.payload?.user?.role?.toLowerCase();



        // 🔥 FIXED — Always save lowercase role
        const userRole = action?.payload?.user?.role?.toLowerCase();
        localStorage.setItem("role", userRole);

        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = userRole;
      })

      // LOGOUT SUCCESS
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      });
  },
});

export default authSlice.reducer;
