import reducer from "./AuthSlice"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    courseData:[]
}

export const getAllCourses=createAsyncThunk('/course/get',async()=>{
    try {
        const response=axioxInstance.get('/course');
        toast.promise(response,{
            loading:"course data...",
            success:"course loaded successfully",
            error:"faild to get the courses"
        })
        return (await response).data.courses;
    } catch (error) {
        
    }
})

const courseSlice=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})

export default courseSlice.reducer;