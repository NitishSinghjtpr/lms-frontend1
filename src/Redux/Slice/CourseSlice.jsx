
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from 'react-hot-toast';
// import axiosInstance from '../../Helper/axiosInstance';
// import { createSlice } from '@reduxjs/toolkit';
// const initialState={
//     kay:"",
//     subscription_id:"",
//     isPaymentVarified:false,
//     allPayments:{},
//     finalMonths:{},
//     monthlySalesRecord:[]
// }

// export const getRazorpayId=createAsyncThunk("/razorpay/getId",async()=>{
//     try {
//         const response=await axiosInstance.get("/payments/razorpay-key");
//         return response.data;
//     } catch (error) {
//         toast.error("Faild to load data");
//     }
// })

// export const purchaseCourseBundle=createAsyncThunk("/purchaseCourse",async()=>{
//     try {
//         const response=await axiosInstance.post("/payments/subscribe");
//         return response.data;
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// })

// export const verifyUserPayment=createAsyncThunk("/payments/verify",async(data)=>{
//     try {
//         const response=await axiosInstance.post("/payments/verify",{
//             razorpay_payment_id: data.razorpay_payment_id,
//             razorpay_subscription_id:data.razorpay_subscription_id,
//             razorpay_signature:data.razorpay_signature
//         });
//         return response.data;
//     } catch (error) {
//         toast.success(action?.payload?.message);

//     }
// })

// export const getPaymentRecord=createAsyncThunk("/payments/record",async(data)=>{
//     try {
//         const response = axiosInstance.get("/payments?count=100");
//         toast.promise(response,{
//             loading:"Getting the payments record",
//             success:(data)=>{
//                 return data?.data?.message
//             },
//             error:"Failed to get payment records"
//         })
//         return (await response).data;
//     } catch (error) {
//         toast.error("Operation failed");
//     }
// })

// export const cancleCourseBundle=createAsyncThunk("/payments/cancle",async(data)=>{
//     try {
//         const response=await axiosInstance.post("/payments/unsubscribe");
//         toast.promise(response,{
//             loading:"Unsubscribimg the bundle",
//             success:(data)=>{
//                 return data?.data?.message
//             },
//             error:"Failed to unsubcribe"
//         })
//         return (await response).data;
//     } catch (error) {
//         toast.error("Operation failed");
//     }
// })

// export const razorpaySlice=createSlice({
//     name:"razorpay",
//     initialState,
//     reducer:{},
//     extraReducers:(builder)=>{
//         builder
//         .addCase(getRazorpayId.fulfilled,(state,action)=>{
//             state.kay=action?.payload?.key;
//         })
//         .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
//             state.subscription_id=action?.payload?.subscription_id;
//         })
//         .addCase(verifyUserPayment.fulfilled,(state,action)=>{
//             toast.success(active?.payload?.message)
//         })
//         .addCase(getPaymentRecord.fulfilled,(state,action)=>{
//             state.allPayments=action?.payload?.allPayments;
//             state.finalMonths=action?.payload?.finalMonths;
//             state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
//        })


//     }
// })


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    courseData: [],
    loading: false,
    error: null,
};

// ===========================
// Get All Courses
// ===========================
export const getAllCourses = createAsyncThunk(
    "/course/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/courses");
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to load courses");
            return rejectWithValue(error?.response?.data);
        }
    }
);

// ===========================
// Create New Course
// ===========================
export const createNewCourse = createAsyncThunk(
    "/course/create",
    async (data, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("category", data.category);
            formData.append("description", data.description);
            formData.append("createdBy", data.createdBy);
            formData.append("thumbnail", data.thumbnail);

            const response = axiosInstance.post("/courses", formData);

            toast.promise(response, {
                loading: "Creating new course...",
                success: (data) => data?.data?.message,
                error: "Failed to create course",
            });

            return (await response).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data);
        }
    }
);

// ===========================
// Slice
// ===========================
const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // GET ALL COURSES
            .addCase(getAllCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courseData = action?.payload?.courses || [];
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            })

            // CREATE COURSE
            .addCase(createNewCourse.fulfilled, (state, action) => {
                state.courseData.push(action?.payload?.course);
            });
    },
});

export default courseSlice.reducer;

