import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

// ===============================
// GET ALL COURSES
// ===============================
export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const responsePromise = axiosInstance.get("/courses");  // ✔ SAME

    toast.promise(responsePromise, {
      loading: "course data...",
      success: "course loaded successfully",
      error: "failed to get the courses",
    });

    const response = await responsePromise; // ✔ FIXED
    return response.data.courses;           // ✔ SAME
  } catch (error) {
    toast.error("Something went wrong!");
  }
});

// ===============================
// CREATE NEW COURSE
// ===============================
export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      const responsePromise = axiosInstance.post("/courses", formData); // ✔ SAME

      toast.promise(responsePromise, {
        loading: "Creating new course",
        success: "Course created",
        error: "Failed to create course",
      });

      const response = await responsePromise; // ✔ FIXED
      return response.data;                   // ✔ SAME

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// ===============================
// SLICE
// ===============================
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];  // ✔ SAME
      }
    });
  },
});

export default courseSlice.reducer;
