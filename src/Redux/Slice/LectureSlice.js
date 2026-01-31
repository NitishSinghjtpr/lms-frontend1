import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";  // FIX
import axiosInstance from "../../Helper/axiosInstance";            // FIX
import toast from "react-hot-toast";                               // FIX

const initialState = {
  lectures: []      // FIX: spelling correct — lectures
};

// ================================
// Get Course Lectures
// ================================
export const getCourseLectures = createAsyncThunk(
  "/course/lecture/get",
  async (cid) => {
    try {
      const response = await axiosInstance.get(`/courses/${cid}`); // FIX: await added

      toast.promise(response, {
        loading: "Fetching course lecture",
        success: "Lecture fetched successfully",
        error: "Failed to load the lectures",
      });

      return (await response).data;

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// ================================
// Add Course Lecture
// ================================
export const addCourseLectures = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);

      // FIX: Wrong GET request → changed to POST and added course ID
      const response = axiosInstance.post(
        `/courses/${data.courseId}`,
        formData
      );

      toast.promise(response, {
        loading: "Adding course lecture",
        success: "Lecture added successfully",
        error: "Failed to add the lectures",
      });

      return (await response).data;

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// ================================
// Delete Course Lecture
// ================================
export const deleteCourseLectures = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );

      toast.promise(response, {
        loading: "Deleting course lecture",
        success: "Lecture deleted successfully",
        error: "Failed to delete the lectures",
      });

      return (await response).data;

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;
