import { ApiConfig } from './config';
import EndPoint from '../helpers/endpoint';

export const apiGetUserFromToken = (token) => {
  return ApiConfig(EndPoint.GET_USER_FROM_TOKEN, {
    payload: {
      token,
    },
  });
};

export const apiLogin = (payload) => {
  return ApiConfig(EndPoint.LOGIN, { payload });
};
