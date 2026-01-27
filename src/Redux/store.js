import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slice/AuthSlice.js';
import courseSliceReducer from './Slice/CourseSlice.jsx'
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course:courseSliceReducer
  },
  devTools: true
});

export default store;
