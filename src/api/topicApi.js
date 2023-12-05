import ENDPONTAPI from '../helpers/endpoint';
import { ApiConfig } from './config';

export const apiLoadTopics = async (payload) => {
  return ApiConfig(ENDPONTAPI.GET_TOPICS_BY_STATUS, {
    params: {
      status: payload?.status,
    },
  });
};

export const apiLoadTopicById = async (payload) => {
  return ApiConfig(ENDPONTAPI.GET_TOPIC_BY_ID, {
    params: {
      id: payload?.id,
    },
  });
};

export const apiUpdateTopic = async (payload) => {
  return ApiConfig(ENDPONTAPI.UPDATE_TOPIC, {
    payload,
  });
};

export const apiLoadTopicsByCourse = async (params) => {
  return ApiConfig(ENDPONTAPI.GET_TOPIC_BY_COURSE, { params });
};

export const apiOrderTopic = async (payload) => {
  return ApiConfig(ENDPONTAPI.ORDER_TOPIC, {
    payload,
  });
};
