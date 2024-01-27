import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiLoadByIdTagAndCategory,
  apiLoadCourseById,
  apiLoadCourses,
  apiLoadCoursesByIdCategory,
  apiUpdateCourse,
} from '../../api/courseApi';
export const requestLoadCourses = createAsyncThunk(
  'course/loadCourses',
  async (props) => {
    const res = await apiLoadCourses(props);
    return res.data;
  }
);

export const requestLoadCourseById = createAsyncThunk(
  'course/requestLoadCourseById',
  async (props) => {
    const res = await apiLoadCourseById(props);
    return res.data;
  }
);

export const requestLoadCoursesByIdCategory = createAsyncThunk(
  'course/loadCoursesByIdCategory',
  async (props) => {
    const res = await apiLoadCoursesByIdCategory(props);
    return res.data;
  }
);

export const requestLoadByIdTagAndCategory = createAsyncThunk(
  'course/loadByIdTagAndCategory',
  async (props) => {
    const res = await apiLoadByIdTagAndCategory(props);
    return res.data;
  }
);

export const requestUpdateCourse = createAsyncThunk(
  'course/updateCourse',
  async (props) => {
    const res = await apiUpdateCourse(props);
    return res.data;
  }
);
