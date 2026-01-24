import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true", 
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {}
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
});

export default authSlice.reducer;
