import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slice/AuthSlice.js';
import courseSliceReducer from './Slice/CourseSlice.jsx'
import razorpaySliceReducer from './Slice/RazorpaySlice.js'
import lectureSliceReducer from './Slice/LectureSlice.js'


const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course:courseSliceReducer,
    razorpay:razorpaySliceReducer,
    lecture:lectureSliceReducer
  },
  devTools: true
});

export default store;