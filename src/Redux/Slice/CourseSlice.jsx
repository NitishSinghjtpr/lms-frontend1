import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  courseData: []
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courses");   // FIXED ✔

    toast.promise(response, {
      loading: "course data...",
      success: "course loaded successfully",
      error: "failed to get the courses"
    });

    return (await response).data.courses; // FIXED ✔

  } catch (error) {
    toast.error("Something went wrong!");
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];  // FIXED ✔
      }
    });
  }
});

export default courseSlice.reducer;
