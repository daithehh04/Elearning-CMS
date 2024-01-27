import ENDPONTAPI from '../helpers/endpoint';
import { ApiConfig } from './config';

export const apiLoadTags = async (payload) => {
  return ApiConfig(ENDPONTAPI.GET_TAGS_BY_STATUS, {
    params: {
      status: payload?.status,
    },
  });
};

export const apiLoadTagsByIdCategory = async (payload) => {
  return ApiConfig(ENDPONTAPI.GET_TAGS_BY_ID_CATEGORY, {
    params: {
      idCategory: payload?.idCategory,
      status: payload?.status,
    },
  });
};

export const apiUpdateTag = async (payload) => {
  return ApiConfig(ENDPONTAPI.UPDATE_TAG, {
    payload,
  });
};
