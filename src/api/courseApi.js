import ENDPONTAPI from '../helpers/endpoint';
import { ApiConfig } from './config';

export const apiLoadCourses = async (payload) => {
  return ApiConfig(ENDPONTAPI.GET_COURSES_BY_STATUS, {
    params: {
      status: payload?.status,
    },
  });
};

export const apiLoadCourseById = async (payload) => {
  return ApiConfig(ENDPONTAPI.GET_COURSES_BY_ID, {
    params: {
      id: payload?.id,
    },
  });
};

export const apiLoadCoursesByIdCategory = async (payload) => {
  return ApiConfig(ENDPONTAPI.GET_COURSES_BY_ID_CATEGORY, {
    params: {
      idCategory: payload?.idCategory,
      status: payload?.status,
    },
  });
};

export const apiLoadByIdTagAndCategory = async (payload) => {
  return ApiConfig(ENDPONTAPI.GET_COURSES_BY_ID_TAG_AND_CATEGORY, {
    params: {
      idCategory: payload?.idCategory,
      idTag: payload?.idTag,
      status: payload?.status,
    },
  });
};

export const apiUpdateCourse = async (payload) => {
  return ApiConfig(ENDPONTAPI.UPDATE_COURSE, {
    payload,
  });
};
