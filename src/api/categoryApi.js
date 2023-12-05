import ENDPONTAPI from '../helpers/endpoint';
import { ApiConfig } from './config';

export const apiLoadCategorys = async (payload) => {
  return ApiConfig(ENDPONTAPI.GET_CATEGORYS_BY_STATUS, {
    params: {
      status: payload?.status,
    },
  });
};

export const apiUpdateCategory = async (payload) => {
  return ApiConfig(ENDPONTAPI.UPDATE_CATEGORY, {
    payload,
  });
};

export const apiOrderCategory = async (payload) => {
  return ApiConfig(ENDPONTAPI.ORDER_CATEGORY, {
    payload,
  });
};
