import { createSlice } from '@reduxjs/toolkit';
import {
  requestLoadByIdTagAndCategory,
  requestLoadCourseById,
  requestLoadCourses,
  requestLoadCoursesByIdCategory,
  requestUpdateCourse,
} from '../middlewares/courseMiddleware';

// Define the initial state using that type
const initialState = {
  courses: [],
  loading: false,
  error: '',
  courseInfo: null,
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourseInfo: (state, action) => {
      state.courseInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    const actionList = [
      requestLoadCourses,
      requestUpdateCourse,
      requestLoadCoursesByIdCategory,
      requestLoadByIdTagAndCategory,
      requestLoadCourseById,
    ];
    actionList.forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      });
    });
    actionList.forEach((action) => {
      builder.addCase(action.rejected, (state) => {
        state.loading = false;
      });
    });

    // load
    builder.addCase(requestLoadCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload.data;
    });

    // load bby id
    builder.addCase(requestLoadCourseById.fulfilled, (state, action) => {
      state.loading = false;
      state.courseInfo = action.payload.data;
    });

    // load by id category
    builder.addCase(
      requestLoadCoursesByIdCategory.fulfilled,
      (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
      }
    );

    // load by id category
    builder.addCase(
      requestLoadByIdTagAndCategory.fulfilled,
      (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
      }
    );

    // update
    builder.addCase(requestUpdateCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.courseInfo = action.payload.data;
    });
  },
});

export const { setCourseInfo } = courseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const courseState = (state) => state.course;

export default courseSlice.reducer;
